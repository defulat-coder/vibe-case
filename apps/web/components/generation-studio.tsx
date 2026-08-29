"use client";

import { useObject } from "@ai-sdk/react";
import { uiGenerationResultSchema, type GenerateUIInput } from "@vibe-case/ai/schemas";
import type { UICase } from "@vibe-case/cases";
import { ImagePlus, LoaderCircle, RotateCcw, Square } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AvatarTile } from "./avatar-tile";

function secureSrcDoc(html: string) {
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`;
  const withoutBase = html.replace(/<base\b[^>]*>/gi, "").replace(/<meta\b[^>]*http-equiv=["']?refresh["']?[^>]*>/gi, "");
  return /<head\b[^>]*>/i.test(withoutBase)
    ? withoutBase.replace(/<head\b[^>]*>/i, (head) => `${head}${csp}`)
    : `<!doctype html><html><head>${csp}</head><body>${withoutBase}</body></html>`;
}

export function GenerationStudio({ item, caseIndex }: { item: UICase; caseIndex: number }) {
  const [prompt, setPrompt] = useState(item.prompt.zhCN);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [referenceImage, setReferenceImage] = useState<string>();
  const [generationId, setGenerationId] = useState<string>();
  const [complete, setComplete] = useState(false);

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
    if (file.size > 5_000_000) return alert("参考图片不能超过 5MB");
    const reader = new FileReader();
    reader.onload = () => setReferenceImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <section className="generation-studio" aria-label="生成效果">
      <div className="generation-panel">
        <div className="generation-heading">
          <div><h2>生成你的版本</h2><p>调整 Prompt，AI SDK 会返回一份自包含 HTML。</p></div>
          {object && <button className="icon-button" type="button" onClick={() => { clear(); setComplete(false); }} aria-label="清除结果"><RotateCcw size={17} /></button>}
        </div>

        <label className="prompt-editor">
          <span>中文 Prompt</span>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={8} />
        </label>

        <div className="variable-grid">
          {item.variables.map((variable) => (
            <label key={variable.key}><span>{variable.label}</span><input value={variables[variable.key] ?? ""} placeholder={variable.placeholder} onChange={(event) => setVariables((current) => ({ ...current, [variable.key]: event.target.value }))} /></label>
          ))}
        </div>

        <div className="generation-actions">
          <label className="button button-secondary file-button">
            <ImagePlus size={17} aria-hidden="true" />
            {referenceImage ? "已选择参考图" : "添加参考图"}
            <input type="file" accept="image/*" onChange={(event) => pickImage(event.target.files?.[0])} />
          </label>
          {isLoading ? (
            <button className="button" type="button" onClick={stop}><Square size={15} />停止生成</button>
          ) : (
            <button className="button" type="button" onClick={generate} disabled={prompt.trim().length < 20}>生成效果</button>
          )}
        </div>
        {error && <p className="error-message" role="alert">生成失败：{error.message}。请检查配置后重试。</p>}
      </div>

      <div className="preview-panel">
        <div className="preview-toolbar">
          <span>{isLoading ? "正在生成" : preview ? "生成完成" : "HTML Preview"}</span>
          {generationId && complete && <Link href={`/generations/${generationId}`}>打开记录</Link>}
        </div>
        {isLoading ? (
          <div className="preview-loading"><LoaderCircle className="spin" size={28} /><strong>AI 正在组织界面结构</strong><p>结果会在 Schema 校验完成后显示。</p></div>
        ) : preview ? (
          <iframe title={`${item.title.zhCN} 生成效果`} sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={preview} />
        ) : (
          <div className="preview-empty"><AvatarTile index={caseIndex} className="preview-avatar" /><strong>让这个角色替你守着预览位</strong><p>生成完成后，安全 HTML 会在这里出现。</p></div>
        )}
      </div>
    </section>
  );
}
