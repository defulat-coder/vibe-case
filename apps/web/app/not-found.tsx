import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <p className="status-code">404</p>
      <h1>页面不存在</h1>
      <p className="status-desc">链接可能已失效，或者页面已被移动。</p>
      <div className="status-actions">
        <Link className="button" href="/">
          返回首页
        </Link>
        <Link className="button button-secondary" href="/collections/ui">
          浏览 UI 案例
        </Link>
      </div>
    </main>
  );
}
