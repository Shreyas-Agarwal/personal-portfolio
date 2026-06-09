import { redirect } from "next/navigation";

// Research entries have been consolidated into Journal.
// Redirect individual slugs to their new canonical URLs at /journal/[slug]
export async function generateStaticParams() {
  // Return empty — no static pages to pre-render for /research/[slug]
  return [];
}

export default async function ResearchSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/journal/${slug}`);
}
