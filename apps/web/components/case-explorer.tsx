"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { UICase } from "@vibe-case/cases";
import { CaseCard } from "./case-card";
import { caseMatchesQuery } from "./catalog-search";
import { useCatalogUrlState } from "./catalog-url-state";

type Category = { id: string; label: string; count: number };
const pageSize = 18;
const clusters = [
  { id: "entry", label: "进入与转化", categories: ["Auth Forms", "Onboarding", "Contact"] },
  { id: "marketing", label: "营销与增长", categories: ["Pricing", "Hero Sections", "CTA Banners", "Testimonials"] },
  { id: "structure", label: "产品结构", categories: ["Features / Bento", "Nav Bars", "Footer", "FAQ"] },
  { id: "content", label: "内容与数据", categories: ["Stats Bars", "Dashboards", "Blog / Content"] },
  { id: "system", label: "系统与状态", categories: ["Bonus"] },
] as const;

export function CaseExplorer({ items, categories }: { items: UICase[]; categories: readonly Category[] }) {
  const validCategories = useMemo(() => ["All", ...clusters.map((item) => item.id), ...categories.map((item) => item.id)], [categories]);
  const { query, category, setQuery, setCategory, reset, navigationVersion } = useCatalogUrlState(validCategories);
  const [visibleState, setVisibleState] = useState({ count: pageSize, version: 0, appendFrom: pageSize, focusAppend: false });
  const firstAppendedRef = useRef<HTMLAnchorElement>(null);
  const visibleCount = visibleState.version === navigationVersion ? visibleState.count : pageSize;

  const filtered = useMemo(() => {
    const cluster = clusters.find((item) => item.id === category);
    return items.filter((item) => {
      if (category !== "All" && item.category !== category && !cluster?.categories.includes(item.category as never)) return false;
      return caseMatchesQuery(item, query);
    });
  }, [category, items, query]);
  const visible = filtered.slice(0, visibleCount);
  const leafCategory = categories.find((item) => item.id === category);
  const leafCluster = leafCategory ? clusters.find((item) => item.categories.includes(leafCategory.id as never)) : undefined;

  function chooseCategory(value: string) {
    setCategory(value);
    setVisibleState({ count: pageSize, version: navigationVersion, appendFrom: pageSize, focusAppend: false });
  }

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleState({ count: pageSize, version: navigationVersion, appendFrom: pageSize, focusAppend: false });
  }

  useEffect(() => {
    if (!visibleState.focusAppend || visibleState.version !== navigationVersion || visibleState.appendFrom >= visibleCount) return;
    firstAppendedRef.current?.focus();
  }, [navigationVersion, visibleCount, visibleState]);

  return (
    <section className="catalog-shell" aria-label="UI 案例目录">
      <div className="catalog-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索案例</span>
          <input type="search" inputMode="search" enterKeyHint="search" autoComplete="off" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="搜索中文、English 或专有名词" />
          {query && (
            <button type="button" onClick={() => updateQuery("")} aria-label="清除搜索">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </label>
        <p aria-live="polite">找到 {filtered.length} 个案例{visible.length < filtered.length ? `，已显示 ${visible.length} 个` : ""}</p>
      </div>

      <div className="category-controls">
        <div className="category-strip" aria-label="案例一级分类">
          <button className={category === "All" ? "active" : ""} aria-pressed={category === "All"} type="button" onClick={() => chooseCategory("All")}>
            全部 <span>{items.length}</span>
          </button>
          {clusters.map((item) => (
            <button className={`${category === item.id ? "active" : ""}${leafCluster?.id === item.id ? " has-leaf" : ""}`} aria-pressed={category === item.id} type="button" key={item.id} onClick={() => chooseCategory(item.id)}>
              {item.label} <span>{items.filter((candidate) => item.categories.includes(candidate.category as never)).length}</span>
            </button>
          ))}
          {leafCategory && (
            <button className="active leaf-active" type="button" aria-label={`清除分类筛选：${leafCategory.label}`} onClick={() => chooseCategory("All")}>
              {leafCategory.label} <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
        <label className="category-select">
          <span className="sr-only">选择具体分类</span>
          <select value={categories.some((item) => item.id === category) ? category : ""} onChange={(event) => event.target.value && chooseCategory(event.target.value)}>
            <option value="">更多分类</option>
            {categories.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.count}</option>)}
          </select>
        </label>
      </div>

      {filtered.length ? (
        <>
          <div className="case-grid result-grid" key={`${category}:${query}`}>
            {visible.map((item, index) => {
              const isAppending = visibleState.version === navigationVersion && visibleState.focusAppend;
              return <CaseCard key={item.id} item={item} entering={index >= visibleState.appendFrom && visibleState.version === navigationVersion} linkRef={isAppending && index === visibleState.appendFrom ? firstAppendedRef : undefined} />;
            })}
          </div>
          {visible.length < filtered.length && <button className="button button-secondary catalog-more" type="button" onClick={(event: MouseEvent<HTMLButtonElement>) => setVisibleState({ count: visibleCount + pageSize, version: navigationVersion, appendFrom: visibleCount, focusAppend: event.detail === 0 })}>显示更多 <span>{visible.length} / {filtered.length}</span></button>}
        </>
      ) : (
        <div className="empty-state">
          <h2>没有匹配的案例</h2>
          <p>换一个中文词、英文术语，或者清除当前分类。</p>
          <button className="button" type="button" onClick={() => { reset(); setVisibleState({ count: pageSize, version: navigationVersion, appendFrom: pageSize, focusAppend: false }); }}>清除筛选</button>
        </div>
      )}
    </section>
  );
}
