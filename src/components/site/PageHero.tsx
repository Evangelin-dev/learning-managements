export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-14">
        {eyebrow && <p className="font-script text-2xl text-primary">{eyebrow}</p>}
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Prose({ sections }: { sections: { h: string; p: string }[] }) {
  return (
    <div className="container-page max-w-3xl space-y-8 py-12">
      {sections.map((s) => (
        <section key={s.h}>
          <h2 className="text-xl font-semibold">{s.h}</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
        </section>
      ))}
      <p className="text-xs text-muted-foreground">Last updated: 1 November 2026</p>
    </div>
  );
}
