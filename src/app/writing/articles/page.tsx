import type { Metadata } from "next";
import { ArticlesIndex } from "@/components/publications/ArticlesIndex";
import { getAllArticles } from "@/lib/publication/loader";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Every individual article and chapter from every publication series, listed and searchable on its own.",
  openGraph: {
    title: "Articles | Shreyas Agarwal",
    description:
      "Every individual article and chapter from every publication series, listed and searchable on its own.",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return <ArticlesIndex articles={articles} />;
}
