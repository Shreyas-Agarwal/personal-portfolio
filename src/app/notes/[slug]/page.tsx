import { redirect } from "next/navigation";

// Notes entries have been consolidated into Journal.
// Redirect individual slugs to their new canonical URLs at /journal/[slug]
export async function generateStaticParams() {
  // Return empty — no static pages to pre-render for /notes/[slug]
  return [];
}

export default async function NotesSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/journal/${slug}`);
}
