"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      // 降级路径：非安全上下文（如局域网 IP 访问）或权限拒绝时 Clipboard API 不可用
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        setStatus(document.execCommand("copy") ? "copied" : "error");
      } catch {
        setStatus("error");
      } finally {
        textarea.remove();
      }
    }
    window.setTimeout(() => setStatus("idle"), 1600);
  }

  return (
    <button className="button button-secondary" type="button" onClick={copy} aria-live="polite">
      {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {status === "copied" ? "已复制" : status === "error" ? "复制失败，请重试" : label}
    </button>
  );
}
