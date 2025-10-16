interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-card">
      {title && (
        <div className="bg-secondary px-6 py-3 border-b border-border">
          <p className="text-sm font-semibold text-secondary-foreground">{title}</p>
        </div>
      )}
      <pre className="bg-[hsl(var(--code-bg))] text-[hsl(var(--code-text))] p-6 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
