"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
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
    <html lang="zh-CN">
      <body>
        <main className="status-page">
          <p className="status-code">出错了</p>
          <h1>页面加载失败</h1>
          <p className="status-desc">发生了意外错误，请重试。</p>
          <div className="status-actions">
            <button className="button" type="button" onClick={reset}>
              重试
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
