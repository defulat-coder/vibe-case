"use client";

import type { ParsedSkill, SkillCategory } from "@vibe-case/skills";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SkillCard } from "./skill-card";
import { useCatalogUrlState } from "./catalog-url-state";

type Category = { id: SkillCategory; label: string; count: number };
const pageSize = 12;
const clusters = [
  { id: "image-visual", label: "图片与视觉", categories: ["image", "visual"] },
  { id: "interface", label: "界面与体验", categories: ["ui", "ux"] },
  { id: "product", label: "产品方法", categories: ["product"] },
  { id: "motion-video", label: "动效与视频", categories: ["motion", "video"] },
] as const;

export function SkillExplorer({ items, categories }: { items: ParsedSkill[]; categories: Category[] }) {
  const { query, category, setQuery, setCategory, reset } = useCatalogUrlState();
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    const cluster = clusters.find((item) => item.id === category);
    return items.filter((item) => {
      if (category !== "All" && item.category !== category && !cluster?.categories.includes(item.category as never)) return false;
      if (!normalized) return true;
      return [item.title.zhCN, item.title.sourceEN, item.summary.zhCN, item.summary.sourceEN, item.categoryLabel, ...item.title.aliases, ...item.whenToUse]
        .join(" ").toLocaleLowerCase("zh-CN").includes(normalized);
    });
  }, [category, items, query]);
  const visible = filtered.slice(0, visibleCount);
  const leafCategory = categories.find((item) => item.id === category);

  function chooseCategory(value: string) {
    setCategory(value);
    setVisibleCount(pageSize);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(pageSize);
  }

  return (
    <section className="catalog-shell skill-catalog" aria-label="Skills 案例目录">
      <div className="catalog-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索 Skills</span>
          <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="搜索 Skill、用途或专有名词" />
          {query && <button type="button" onClick={() => updateQuery("")} aria-label="清除搜索"><X size={16} /></button>}
        </label>
        <p aria-live="polite">找到 {filtered.length} 个 Skills</p>
      </div>
      <div className="category-controls">
        <div className="category-strip" aria-label="Skill 一级分类">
          <button className={category === "All" ? "active" : ""} aria-pressed={category === "All"} type="button" onClick={() => chooseCategory("All")}>全部 <span>{items.length}</span></button>
          {clusters.map((item) => (
            <button className={category === item.id ? "active" : ""} aria-pressed={category === item.id} type="button" key={item.id} onClick={() => chooseCategory(item.id)}>{item.label} <span>{items.filter((candidate) => item.categories.includes(candidate.category as never)).length}</span></button>
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
          <div className="skill-grid result-grid" key={`${category}:${query}:${visibleCount}`}>{visible.map((item) => <SkillCard key={item.id} item={item} />)}</div>
          {visible.length < filtered.length && <button className="button button-secondary catalog-more" type="button" onClick={() => setVisibleCount((count) => count + pageSize)}>显示更多 <span>{visible.length} / {filtered.length}</span></button>}
        </>
      ) : (
        <div className="empty-state"><h2>没有匹配的 Skills</h2><p>换一个中文词、英文术语，或者清除当前分类。</p><button className="button" type="button" onClick={() => { reset(); setVisibleCount(pageSize); }}>清除筛选</button></div>
      )}
    </section>
  );
}
