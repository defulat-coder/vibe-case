"use client";

import type { ParsedSkill, SkillCategory } from "@vibe-case/skills";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SkillCard } from "./skill-card";

type Category = { id: SkillCategory; label: string; count: number };

export function SkillExplorer({ items, categories }: { items: ParsedSkill[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SkillCategory | "All">("All");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    return items.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (!normalized) return true;
      return [item.title.zhCN, item.title.sourceEN, item.summary.zhCN, item.summary.sourceEN, ...item.title.aliases, ...item.whenToUse]
        .join(" ").toLocaleLowerCase("zh-CN").includes(normalized);
    });
  }, [category, items, query]);

  return (
    <section className="catalog-shell skill-catalog" aria-label="Skills 案例目录">
      <div className="catalog-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">搜索 Skills</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 Skill、用途或专有名词" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="清除搜索"><X size={16} /></button>}
        </label>
        <p aria-live="polite">找到 {filtered.length} 个 Skills</p>
      </div>
      <div className="category-strip" aria-label="Skill 分类">
        <button className={category === "All" ? "active" : ""} type="button" onClick={() => setCategory("All")}>全部 <span>{items.length}</span></button>
        {categories.map((item) => (
          <button className={category === item.id ? "active" : ""} type="button" key={item.id} onClick={() => setCategory(item.id)}>{item.label} <span>{item.count}</span></button>
        ))}
      </div>
      {filtered.length ? (
        <div className="skill-grid">{filtered.map((item, index) => <SkillCard key={item.id} item={item} index={index} />)}</div>
      ) : (
        <div className="empty-state"><h2>没有匹配的 Skills</h2><p>换一个中文词、英文术语，或者清除当前分类。</p><button className="button" type="button" onClick={() => { setQuery(""); setCategory("All"); }}>清除筛选</button></div>
      )}
    </section>
  );
}
