interface ToolsMarqueeProps {
  tools: string[];
}

export function ToolsMarquee({ tools }: ToolsMarqueeProps) {
  const items = [...tools, ...tools];

  return (
    <section className="border-y border-line py-6" aria-label="Tools">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {items.map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="font-mono text-sm uppercase tracking-wider text-muted"
            >
              {tool}
              <span className="mx-4 text-line">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
