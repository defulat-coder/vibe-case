"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 目录筛选状态同步到 URL：刷新、前进/返回与分享链接都能还原搜索词与分类

// 由筛选状态生成查询串；空搜索词与 All 分类不占参数
export function buildCatalogQuery(query: string, category: string): string {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);
  if (category !== "All") params.set("category", category);
  return params.toString();
}

export function parseCatalogQuery(search: string) {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  return { query: params.get("q") ?? "", category: params.get("category") ?? "All" };
}

export function useCatalogUrlState() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = parseCatalogQuery(searchParams.toString());
  const [query, setQueryValue] = useState(initial.query);
  const [category, setCategoryValue] = useState(initial.category);
  const [navigationVersion, setNavigationVersion] = useState(0);

  useEffect(() => {
    function syncFromUrl() {
      const next = parseCatalogQuery(window.location.search);
      setQueryValue(next.query);
      setCategoryValue(next.category);
      setNavigationVersion((version) => version + 1);
    }
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [pathname]);

  function syncUrl(nextQuery: string, nextCategory: string, mode: "push" | "replace" = "replace") {
    const qs = buildCatalogQuery(nextQuery, nextCategory);
    // 搜索使用 replace 避免每次输入制造历史噪声；分类使用 push 让浏览器后退可以回到上一组结果。
    window.history[`${mode}State`](null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  function setQuery(value: string) {
    setQueryValue(value);
    syncUrl(value, category);
  }

  function setCategory(value: string) {
    setCategoryValue(value);
    if (value !== category) syncUrl(query, value, "push");
  }

  // 一次性清空筛选：避免分开 setQuery/setCategory 时闭包里的旧值把已清除的搜索词写回 URL
  function reset() {
    setQueryValue("");
    setCategoryValue("All");
    syncUrl("", "All", "replace");
  }

  return { query, category, setQuery, setCategory, reset, navigationVersion };
}
