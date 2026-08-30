"use client";

import { useObject } from "@ai-sdk/react";
import { uiGenerationResultSchema, type GenerateUIInput } from "@vibe-case/ai/schemas";
import type { UICase } from "@vibe-case/cases";
import { ImagePlus, LoaderCircle, RotateCcw, Square, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { readGenerationDraft, writeGenerationDraft } from "./generation-draft";
import { HashFocusTarget } from "./hash-focus-target";
import { secureSrcDoc } from "./secure-src-doc";

export function GenerationStudio({ item }: { item: UICase }) {
  const [prompt, setPrompt] = useState(item.prompt.zhCN);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [referenceImage, setReferenceImage] = useState<string>();
  const [completedGenerationId, setCompletedGenerationId] = useState<string>();
  const [completedHtml, setCompletedHtml] = useState<string>();
  const [imageError, setImageError] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  const [draftStorageAvailable, setDraftStorageAvailable] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);
  const generationIdRef = useRef<string | undefined>(undefined);
  const draftKey = `vibe-case:generation-draft:v1:${item.id}`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const result = readGenerationDraft(() => window.sessionStorage, draftKey);
      if (result.draft) {
        setPrompt(result.draft.prompt);
        setVariables(result.draft.variables);
      }
      setDraftStorageAvailable(result.available);
      setDraftReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [draftKey]);

  useEffect(() => {
    if (!draftReady || !draftStorageAvailable) return;
    if (!writeGenerationDraft(() => window.sessionStorage, draftKey, { version: 1, prompt, variables })) {
      const frame = window.requestAnimationFrame(() => setDraftStorageAvailable(false));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [draftKey, draftReady, draftStorageAvailable, prompt, variables]);

  const { submit, isLoading, error, stop, clear } = useObject({
    api: "/api/generate",
    schema: uiGenerationResultSchema,
    onFinish: ({ object }) => {
      if (typeof object?.html === "string") {
        setCompletedHtml(object.html);
        setCompletedGenerationId(generationIdRef.current);
      }
    },
  });

  const preview = completedHtml ? secureSrcDoc(completedHtml) : undefined;
  const promptModified = prompt !== item.prompt.zhCN;
  const networkError = error ? /failed to fetch|networkerror|load failed/i.test(error.message) : false;
  const serviceError = error ? error.message.trim().startsWith("{") : false;
  const malformedResponse = error ? /json|parse|stream|unexpected token|not-json/i.test(error.message) : false;
  const generationErrorCopy = error ? (networkError
    ? `生成失败：网络连接异常。${completedHtml ? "上一次结果仍保留。" : ""}Prompt 和变量仍已保留，请检查网络后重试。`
    : serviceError
      ? `生成失败：生成服务暂时不可用。${completedHtml ? "上一次结果仍保留。" : ""}Prompt 和变量仍已保留，请重试；若持续失败，请检查 AI 配置。`
      : malformedResponse
      ? `生成失败：服务返回了无法识别的结果。${completedHtml ? "上一次结果仍保留。" : ""}Prompt 和变量仍已保留，请重试。`
      : `生成失败：生成服务暂时不可用。${completedHtml ? "上一次结果仍保留。" : ""}Prompt 和变量仍已保留，请重试；若持续失败，请检查 AI 配置。`) : "";

  function generate() {
    const id = crypto.randomUUID();
    generationIdRef.current = id;
    submit({
      generationId: id,
      caseId: item.id,
      title: item.title.zhCN,
      summary: item.summary.zhCN,
      prompt,
      variables,
      referenceImage,
    } satisfies GenerateUIInput);
  }

  async function pickImage(file?: File) {
    if (!file) return;
    if (file.size > 5_000_000) {
      setImageError("参考图片超过 5MB，请压缩后重新选择。");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    setImageError("");
    const reader = new FileReader();
    reader.onload = () => setReferenceImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setReferenceImage(undefined);
    setImageError("");
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <HashFocusTarget className="generation-studio" id="generation-studio" aria-label="生成效果" aria-busy={isLoading}>
      <div className="generation-panel">
        <div className="generation-heading">
          <h2>生成页面</h2>
          {completedHtml && <button className="icon-button" type="button" onClick={() => { clear(); setCompletedHtml(undefined); setCompletedGenerationId(undefined); }} aria-label="清除结果"><RotateCcw size={17} /></button>}
        </div>

        <label className="prompt-editor">
          <span>中文 Prompt</span>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={8} maxLength={8_000} aria-describedby="prompt-requirement prompt-counter" />
        </label>
        <div className="prompt-meta">
          <p className="field-help" id="prompt-requirement">{draftStorageAvailable ? "至少输入 20 个字符，最多 8000 个字符；Prompt 与变量会自动保存到当前浏览器 Session，刷新后仍可恢复。" : "最多 8000 个字符；当前浏览器禁止会话存储，离开页面前请先复制 Prompt。"}</p>
          {promptModified && <button className="prompt-restore" type="button" onClick={() => setPrompt(item.prompt.zhCN)}><RotateCcw size={13} aria-hidden="true" />恢复原始 Prompt</button>}
          <span className={prompt.length > 7_500 ? "prompt-counter prompt-counter-warn" : "prompt-counter"} id="prompt-counter">{prompt.length} / 8000</span>
        </div>

        <div className="variable-grid">
          {item.variables.map((variable) => (
            <label key={variable.key}><span>{variable.label}</span><input maxLength={500} value={variables[variable.key] ?? ""} placeholder={variable.placeholder} onChange={(event) => setVariables((current) => ({ ...current, [variable.key]: event.target.value }))} /></label>
          ))}
        </div>

        <div className="generation-actions">
          <div className="reference-actions">
            <label className="button button-secondary file-button">
              <ImagePlus size={17} aria-hidden="true" />
              {referenceImage ? "已选择参考图" : "添加参考图"}
              <input ref={fileInput} type="file" accept="image/*" onChange={(event) => pickImage(event.target.files?.[0])} />
            </label>
            {referenceImage && <button className="reference-remove" type="button" onClick={removeImage}><X size={15} />移除</button>}
          </div>
          {isLoading ? (
            <button className="button" type="button" onClick={stop}><Square size={15} />停止生成</button>
          ) : (
            <button className="button" type="button" onClick={generate} disabled={prompt.trim().length < 20}>生成效果</button>
          )}
        </div>
        <p className="generation-reassurance">生成通常需要几十秒；参考图不会保存。</p>
        {imageError && <p className="error-message" role="alert">{imageError}</p>}
        {error && (
          <div className="error-message" role="alert">
            <p>{generationErrorCopy}</p>
            <button className="error-retry" type="button" onClick={generate} disabled={prompt.trim().length < 20}>重试</button>
          </div>
        )}
      </div>

      <div className="preview-panel">
        <div className="preview-toolbar">
          <span role="status">{isLoading ? "正在生成" : preview ? "生成完成" : "预览"}</span>
          {completedGenerationId && <Link className="preview-open" href={`/generations/${completedGenerationId}`}>打开记录</Link>}
        </div>
        {isLoading ? (
          <div className="preview-loading"><LoaderCircle className="spin" size={28} /><strong>正在生成页面</strong></div>
        ) : preview ? (
          <iframe title={`${item.title.zhCN} 生成效果`} sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={preview} />
        ) : (
          <div className="preview-empty"><strong>生成结果会显示在这里</strong></div>
        )}
      </div>
    </HashFocusTarget>
  );
}
