"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

// 目录筛选状态同步到 URL：刷新、前进/返回与分享链接都能还原搜索词与分类

// 由筛选状态生成查询串；空搜索词与 All 分类不占参数
export function buildCatalogQuery(query: string, category: string): string {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);
  if (category !== "All") params.set("category", category);
  return params.toString();
}

export function useCatalogUrlState() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQueryValue] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategoryValue] = useState(() => searchParams.get("category") ?? "All");

  function syncUrl(nextQuery: string, nextCategory: string) {
    const qs = buildCatalogQuery(nextQuery, nextCategory);
    // 筛选是纯客户端行为：用原生 replaceState 同步地址栏，
    // 避免 router.replace 在每次按键时触发服务端 RSC 往返
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  function setQuery(value: string) {
    setQueryValue(value);
    syncUrl(value, category);
  }

  function setCategory(value: string) {
    setCategoryValue(value);
    syncUrl(query, value);
  }

  return { query, category, setQuery, setCategory };
}
