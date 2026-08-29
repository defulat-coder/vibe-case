"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// 目录筛选状态同步到 URL：刷新、前进/返回与分享链接都能还原搜索词与分类
export function useCatalogUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQueryValue] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategoryValue] = useState(() => searchParams.get("category") ?? "All");

  function syncUrl(nextQuery: string, nextCategory: string) {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory !== "All") params.set("category", nextCategory);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
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
