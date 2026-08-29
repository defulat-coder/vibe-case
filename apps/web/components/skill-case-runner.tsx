"use client";

import type { SkillCase } from "@vibe-case/skills";
import type { SkillCaseResult } from "@vibe-case/ai";
import { Check, Copy, ImageIcon, LoaderCircle, Play, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SkillCaseRunner({ item }: { item: SkillCase }) {
  const [prompt, setPrompt] = useState(item.prompt);
  const [result, setResult] = useState<SkillCaseResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function run() {
    setLoading(true);
    setError("");
    setResult(undefined);
    try {
      const response = await fetch("/api/skills/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ caseId: item.id, prompt }),
      });
      const value = await response.json();
      if (!response.ok) throw new Error(value.error || "运行案例失败");
      setResult(value);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "运行案例失败");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setError("");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("复制失败，请重新点击或手动选择 Prompt。");
    }
  }

  return (
    <article className="skill-case">
      <div className="skill-case-heading">
        <div><h3>{item.title}</h3><p>{item.summary}</p></div>
        <span>{item.executionMode === "image" ? "GPT Image 2" : item.executionMode}</span>
      </div>
      <dl className="skill-case-brief">
        <div><dt>示例输入</dt><dd>{item.input}</dd></div>
        <div><dt>预期输出</dt><dd>{item.output}</dd></div>
      </dl>
      <label className="skill-prompt-editor">
        <span>案例 Prompt</span>
        <textarea rows={7} value={prompt} onChange={(event) => setPrompt(event.target.value)} />
      </label>
      <div className="skill-case-actions">
        <button className="button button-secondary" type="button" onClick={copy} aria-live="polite">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "已复制" : "复制 Prompt"}</button>
        <button className="button" type="button" onClick={run} disabled={loading || prompt.trim().length < 20}>
          {loading ? <LoaderCircle className="spin" size={17} /> : item.executionMode === "image" ? <ImageIcon size={17} /> : <Play size={17} />}
          {loading ? "正在运行" : "运行案例"}
        </button>
      </div>
      {error && <p className="error-message" role="alert">{error}</p>}
      {result && (
        <div className="skill-case-result" aria-live="polite">
          <div><strong>运行结果</strong><button type="button" onClick={() => setResult(undefined)} aria-label="清除运行结果"><RotateCcw size={16} /></button></div>
          {result.kind === "image" ? (
            <Image src={result.image} alt={`${item.title} 生成结果`} width={1024} height={1024} unoptimized />
          ) : <pre>{result.text}</pre>}
        </div>
      )}
    </article>
  );
}
