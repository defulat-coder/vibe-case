"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { UICase } from "@vibe-case/cases";
import { CaseCard } from "./case-card";

type Category = { id: string; label: string; count: number };

export function CaseExplorer({ items, categories }: { items: UICase[]; categories: readonly Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    return items.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (!normalized) return true;
      return [item.title.zhCN, item.title.sourceEN, item.summary.zhCN, item.summary.sourceEN, ...item.tags]
        .join(" ")
        .toLocaleLowerCase("zh-CN")
        .includes(normalized);
    });
  }, [category, items, query]);

  return (
    <section className="catalog-shell" aria-label="UI 案例目录">
      <div className="catalog-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索案例</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索中文、English 或专有名词" />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="清除搜索">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </label>
        <p aria-live="polite">找到 {filtered.length} 个案例</p>
      </div>

      <div className="category-strip" aria-label="案例分类">
        <button className={category === "All" ? "active" : ""} type="button" onClick={() => setCategory("All")}>
          全部 <span>92</span>
        </button>
        {categories.map((item) => (
          <button className={category === item.id ? "active" : ""} type="button" key={item.id} onClick={() => setCategory(item.id)}>
            {item.label} <span>{item.count}</span>
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="case-grid">
          {filtered.map((item) => <CaseCard key={item.id} item={item} index={items.indexOf(item)} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>没有匹配的案例</h2>
          <p>换一个中文词、英文术语，或者清除当前分类。</p>
          <button className="button" type="button" onClick={() => { setQuery(""); setCategory("All"); }}>清除筛选</button>
        </div>
      )}
    </section>
  );
}
