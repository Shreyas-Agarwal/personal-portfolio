import { redirect } from "next/navigation";

// Notes section has been consolidated into Journal.
// All entries are now available at /journal
export default function NotesIndexPage() {
  redirect("/journal");
}
