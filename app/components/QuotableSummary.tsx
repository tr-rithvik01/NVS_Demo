interface QuotableSummaryProps {
  text: string;
  className?: string;
}

export function QuotableSummary({ text, className = "" }: QuotableSummaryProps) {
  const items = text
    .split("\n")
    .map((item) => item.replace(/^[\-\*]\s*/, "").trim())
    .filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className={`bg-primary/5 py-6 border-y border-primary/10 mb-12 ${className}`.trim()}
      aria-label="Quick Summary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70 mb-3">
          TL;DR
        </p>
        <ul className="space-y-3 text-base text-primary-dark font-medium leading-relaxed">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
