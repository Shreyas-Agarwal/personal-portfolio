import { redirect } from "next/navigation";

// Research entries have been consolidated into the Publications library.
// Redirect individual slugs to their new canonical URLs at /works/publications/[id].
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
  redirect(`/works/publications/${slug}`);
}
