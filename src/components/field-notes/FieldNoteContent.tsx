import type { ReactNode } from "react";

export function FieldNoteContent({ children }: { children: ReactNode }) {
  return <div className="max-w-none">{children}</div>;
}
