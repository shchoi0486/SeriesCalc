import React from 'react';

interface ProsePageProps {
  title: string;
  children: React.ReactNode;
}

export default function ProsePage({ title, children }: ProsePageProps) {
  return (
    <div className="bg-background min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-8">{title}</h1>
        <div className="space-y-8 text-base leading-relaxed text-foreground">{children}</div>
      </div>
    </div>
  );
}

export function ProseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}
