"use client";

import { useObject } from "@ai-sdk/react";
import { uiGenerationResultSchema, type GenerateUIInput } from "@vibe-case/ai/schemas";
import type { UICase } from "@vibe-case/cases";
import { ImagePlus, LoaderCircle, RotateCcw, Square, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { readGenerationDraft, writeGenerationDraft } from "./generation-draft";

function secureSrcDoc(html: string) {
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`;
  const withoutBase = html.replace(/<base\b[^>]*>/gi, "").replace(/<meta\b[^>]*http-equiv=["']?refresh["']?[^>]*>/gi, "");
  return /<head\b[^>]*>/i.test(withoutBase)
    ? withoutBase.replace(/<head\b[^>]*>/i, (head) => `${head}${csp}`)
    : `<!doctype html><html><head>${csp}</head><body>${withoutBase}</body></html>`;
}

export function GenerationStudio({ item }: { item: UICase }) {
  const [prompt, setPrompt] = useState(item.prompt.zhCN);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [referenceImage, setReferenceImage] = useState<string>();
  const [generationId, setGenerationId] = useState<string>();
  const [complete, setComplete] = useState(false);
  const [imageError, setImageError] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  const [draftStorageAvailable, setDraftStorageAvailable] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);
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

  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: "/api/generate",
    schema: uiGenerationResultSchema,
    onFinish: ({ object }) => setComplete(Boolean(object)),
  });

  const preview = object?.html && complete ? secureSrcDoc(object.html) : undefined;

  function generate() {
    const id = crypto.randomUUID();
    setGenerationId(id);
    setComplete(false);
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
    <section className="generation-studio" id="generation-studio" aria-label="生成效果">
      <div className="generation-panel">
        <div className="generation-heading">
          <h2>生成页面</h2>
          {object && <button className="icon-button" type="button" onClick={() => { clear(); setComplete(false); }} aria-label="清除结果"><RotateCcw size={17} /></button>}
        </div>

        <label className="prompt-editor">
          <span>中文 Prompt</span>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={8} maxLength={8_000} aria-describedby="prompt-requirement" />
        </label>
        <p className="field-help" id="prompt-requirement">{draftStorageAvailable ? "至少输入 20 个字符；Prompt 与变量会自动保存到当前浏览器 Session，刷新后仍可恢复。" : "当前浏览器禁止会话存储；离开页面前请先复制 Prompt。"}</p>

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
        {error && <p className="error-message" role="alert">生成失败：{error.message}。Prompt 和变量仍已保留，请重试；若持续失败，请稍后再试或检查 AI 配置。</p>}
      </div>

      <div className="preview-panel">
        <div className="preview-toolbar">
          <span>{isLoading ? "正在生成" : preview ? "生成完成" : "预览"}</span>
          {generationId && complete && <Link href={`/generations/${generationId}`}>打开记录</Link>}
        </div>
        {isLoading ? (
          <div className="preview-loading"><LoaderCircle className="spin" size={28} /><strong>正在生成页面</strong></div>
        ) : preview ? (
          <iframe title={`${item.title.zhCN} 生成效果`} sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={preview} />
        ) : (
          <div className="preview-empty"><strong>生成结果会显示在这里</strong></div>
        )}
      </div>
    </section>
  );
}
