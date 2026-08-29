"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { UICase } from "@vibe-case/cases";
import { CaseCard } from "./case-card";

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
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    const cluster = clusters.find((item) => item.id === category);
    return items.filter((item) => {
      if (category !== "All" && item.category !== category && !cluster?.categories.includes(item.category as never)) return false;
      if (!normalized) return true;
      return [item.title.zhCN, item.title.sourceEN, item.summary.zhCN, item.summary.sourceEN, ...item.tags]
        .join(" ")
        .toLocaleLowerCase("zh-CN")
        .includes(normalized);
    });
  }, [category, items, query]);
  const visible = filtered.slice(0, visibleCount);

  function chooseCategory(value: string) {
    setCategory(value);
    setVisibleCount(pageSize);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(pageSize);
  }

  return (
    <section className="catalog-shell" aria-label="UI 案例目录">
      <div className="catalog-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索案例</span>
          <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="搜索中文、English 或专有名词" />
          {query && (
            <button type="button" onClick={() => updateQuery("")} aria-label="清除搜索">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </label>
        <p aria-live="polite">找到 {filtered.length} 个案例</p>
      </div>

      <div className="category-controls">
        <div className="category-strip" aria-label="案例一级分类">
          <button className={category === "All" ? "active" : ""} type="button" onClick={() => chooseCategory("All")}>
            全部 <span>{items.length}</span>
          </button>
          {clusters.map((item) => (
            <button className={category === item.id ? "active" : ""} type="button" key={item.id} onClick={() => chooseCategory(item.id)}>
              {item.label} <span>{items.filter((candidate) => item.categories.includes(candidate.category as never)).length}</span>
            </button>
          ))}
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
          <div className="case-grid result-grid" key={`${category}:${query}:${visibleCount}`}>
            {visible.map((item) => <CaseCard key={item.id} item={item} />)}
          </div>
          {visible.length < filtered.length && <button className="button button-secondary catalog-more" type="button" onClick={() => setVisibleCount((count) => count + pageSize)}>显示更多 <span>{visible.length} / {filtered.length}</span></button>}
        </>
      ) : (
        <div className="empty-state">
          <h2>没有匹配的案例</h2>
          <p>换一个中文词、英文术语，或者清除当前分类。</p>
          <button className="button" type="button" onClick={() => { updateQuery(""); chooseCategory("All"); }}>清除筛选</button>
        </div>
      )}
    </section>
  );
}
