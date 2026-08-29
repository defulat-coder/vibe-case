export function CaseDiagram({ id, category, label }: { id: string; category: string; label: string }) {
  const variant = id.match(/(\d+)/)?.[1] ?? "1";
  return (
    <div
      className="case-diagram"
      data-kind={category}
      data-variant={variant}
      role="img"
      aria-label={`${label} 的结构示意图`}
    >
      <div className="diagram-bar" />
      <div className="diagram-field diagram-field-a" />
      <div className="diagram-field diagram-field-b" />
      <div className="diagram-field diagram-field-c" />
      <div className="diagram-field diagram-field-d" />
      <div className="diagram-field diagram-field-e" />
      <div className="diagram-accent" />
    </div>
  );
}
