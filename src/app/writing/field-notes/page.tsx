import type { Metadata } from "next";
import { FieldNotesJournal } from "@/components/field-notes/FieldNotesJournal";
import { getAllFieldNotes } from "@/lib/field-notes/loader";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Short, unfinished observations from engineering, product, and systems work.",
  openGraph: {
    title: "Field Notes | Shreyas Agarwal",
    description: "Short, unfinished observations from engineering, product, and systems work.",
  },
};

export default function FieldNotesPage() {
  const notes = getAllFieldNotes();
  return <FieldNotesJournal notes={notes} />;
}
