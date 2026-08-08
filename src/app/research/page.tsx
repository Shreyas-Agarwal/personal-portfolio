import { redirect } from "next/navigation";

// Research section has been consolidated into the Publications library.
export default function ResearchIndexPage() {
  redirect("/works/publications");
}
