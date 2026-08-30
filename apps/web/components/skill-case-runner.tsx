"use client";

import { skillCaseResultSchema, type SkillCaseResult } from "@vibe-case/ai";
import type { SkillCase } from "@vibe-case/skills";
import { Check, Copy, ImageIcon, LoaderCircle, Play, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { copyText } from "./copy-to-clipboard";

const executionModeLabels = {
  image: "GPT Image 2",
  prompt: "Prompt 提炼",
  structured: "结构化输出",
  "timeline-plan": "时间线方案",
} as const;

export function SkillCaseRunner({ item }: { item: SkillCase }) {
  const [prompt, setPrompt] = useState(item.prompt);
  const [result, setResult] = useState<SkillCaseResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const promptLength = prompt.trim().length;
  const promptHelpId = `skill-prompt-help-${item.id}`;

  async function run() {
    const hasPreviousResult = Boolean(result);
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/skills/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ caseId: item.id, prompt }),
      });
      let value: unknown;
      try {
        value = await response.json();
      } catch {
        throw new Error(response.ok ? `运行失败：服务返回了无法识别的结果。${hasPreviousResult ? "上一次结果仍保留。" : ""}Prompt 仍已保留，请重试。` : `运行失败：服务暂时不可用。${hasPreviousResult ? "上一次结果仍保留。" : ""}Prompt 仍已保留，请稍后重试。`);
      }
      if (!response.ok) {
        const message = typeof value === "object" && value !== null && "error" in value && typeof value.error === "string" ? value.error : "服务暂时不可用，请稍后重试";
        throw new Error(`运行失败：${message}。${hasPreviousResult ? "上一次结果仍保留。" : ""}Prompt 仍已保留，请重试。`);
      }
      try {
        setResult(skillCaseResultSchema.parse(value));
      } catch {
        throw new Error(`运行失败：服务返回了无效结果。${hasPreviousResult ? "上一次结果仍保留。" : ""}Prompt 仍已保留，请重试。`);
      }
    } catch (reason) {
      setError(reason instanceof TypeError && /fetch|network|load failed/i.test(reason.message) ? `运行失败：网络连接异常。${hasPreviousResult ? "上一次结果仍保留。" : ""}Prompt 仍已保留，请检查网络后重试。` : reason instanceof Error ? reason.message : `运行案例失败。${hasPreviousResult ? "上一次结果仍保留。" : ""}Prompt 仍已保留，请重试。`);
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!(await copyText(prompt))) {
      setCopied(false);
      setError("复制失败，请重新点击或手动选择 Prompt。");
      return;
    }
    setError("");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <article className="skill-case" aria-busy={loading}>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{loading ? "正在运行案例，请稍候。" : result ? "案例运行完成，结果已显示。" : ""}</div>
      <div className="skill-case-heading">
        <div><h3>{item.title}</h3><p>{item.summary}</p></div>
        <span>{executionModeLabels[item.executionMode]}</span>
      </div>
      <label className="skill-prompt-editor">
        <span>Prompt</span>
        <textarea rows={7} maxLength={8_000} value={prompt} onChange={(event) => setPrompt(event.target.value)} aria-describedby={promptHelpId} />
        <p className="field-help" id={promptHelpId}>{promptLength < 20 ? `至少输入 20 个字符后可运行（还差 ${20 - promptLength} 个字符）。` : `Prompt 已满足最小长度，可以运行（${promptLength} / 8000）。`}</p>
      </label>
      <div className="skill-case-actions">
        <button className="button button-secondary" type="button" onClick={copy} aria-live="polite">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "已复制" : "复制 Prompt"}</button>
        <button className="button" type="button" onClick={run} disabled={loading || promptLength < 20}>
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
