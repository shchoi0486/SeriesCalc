const FaqItem = ({ q, a }: { q: string; a: string }) => (
  <div className="border-b border-border pb-4 last:border-b-0 last:pb-0">
    <p className="font-semibold text-foreground flex items-start gap-2">
      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">Q</span>
      {q}
    </p>
    <p className="mt-2 pl-7 leading-relaxed">{a}</p>
  </div>
);

export default FaqItem;
