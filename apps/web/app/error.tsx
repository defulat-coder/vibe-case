"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="status-page">
      <p className="status-code">出错了</p>
      <h1>页面加载失败</h1>
      <p className="status-desc">发生了意外错误，可以重试，或返回首页。</p>
      <div className="status-actions">
        <button className="button" type="button" onClick={reset}>
          重试
        </button>
        <Link className="button button-secondary" href="/">
          返回首页
        </Link>
      </div>
    </main>
  );
}
