import { redirect } from "next/navigation";

// Research section has been consolidated into Journal.
// All entries are now available at /journal
export default function ResearchIndexPage() {
  redirect("/journal");
}
