interface Props {
  label: string;
  title: string;
}

export function SectionHeader({ label, title }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px w-8 bg-border" />
        {label}
      </div>
      <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
