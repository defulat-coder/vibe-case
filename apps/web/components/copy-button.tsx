"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyText } from "./copy-to-clipboard";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    setStatus((await copyText(value)) ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 1600);
  }

  return (
    <button className="button button-secondary" type="button" onClick={copy} aria-live="polite">
      {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {status === "copied" ? "已复制" : status === "error" ? "复制失败，请重试" : label}
    </button>
  );
}
