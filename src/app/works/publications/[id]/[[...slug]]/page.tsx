/**
 * Publication route under /projects/publications/[id]/[[...slug]]
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { FadingScrollContainer } from "@/components/publication/FadingScrollContainer";
import {
  PubA,
  PubBlockquote,
  PubCode,
  PubEm,
  PubH1,
  PubH2,
  PubH3,
  PubH4,
  PubHr,
  PubLi,
  PubOl,
  PubParagraph,
  PubPre,
  PubStrong,
  PubTable,
  PubTbody,
  PubTd,
  PubTh,
  PubThead,
  PubTr,
  PubUl,
} from "@/components/publication/PublicationContent/mdx-primitives";
import {
  PublicationContent,
  publicationComponents,
} from "@/components/publication/PublicationContent/PublicationContent";
import { PublicationDryRead } from "@/components/publication/PublicationDryRead";
import { PublicationFooter } from "@/components/publication/PublicationFooter/PublicationFooter";
import { PublicationHeader } from "@/components/publication/PublicationHeader/PublicationHeader";
import { PublicationMetadata } from "@/components/publication/PublicationMetadata/PublicationMetadata";
import { PublicationShell } from "@/components/publication/PublicationShell/PublicationShell";
import { PublicationSidebar } from "@/components/publication/PublicationSidebar/PublicationSidebar";
import { PublicationTOC } from "@/components/publication/PublicationTOC/PublicationTOC";
import { Comments } from "@/components/shared/Comments";
import { loadPublicationDocument, resolvePublicationSource } from "@/lib/publication/loader";
import { blocksToPlainText, parsePublicationPlainText } from "@/lib/publication/plain-text";

interface PageProps {
  params: Promise<{ id: string; slug?: string[] }>;
  searchParams: Promise<{ view?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, slug = [] } = await params;
  try {
    const source = resolvePublicationSource(id);
    const doc = await loadPublicationDocument(source, slug);
    const isIndex = slug.length === 0;
    return {
      title: isIndex ? doc.manifest.title : `${doc.current.title} — ${doc.manifest.title}`,
      description: doc.manifest.abstract ?? doc.manifest.subtitle,
    };
  } catch (err) {
    console.error("METADATA LOAD ERROR:", err);
    return { title: "Not Found" };
  }
}

const MDX_COMPONENTS = {
  h1: PubH1,
  h2: PubH2,
  h3: PubH3,
  h4: PubH4,
  p: PubParagraph,
  blockquote: PubBlockquote,
  pre: PubPre,
  code: PubCode,
  ul: PubUl,
  ol: PubOl,
  li: PubLi,
  hr: PubHr,
  strong: PubStrong,
  em: PubEm,
  a: PubA,
  table: PubTable,
  thead: PubThead,
  tbody: PubTbody,
  tr: PubTr,
  th: PubTh,
  td: PubTd,
  ...publicationComponents,
} as const;

export default async function ProjectPublicationPage({ params, searchParams }: PageProps) {
  const { id, slug = [] } = await params;
  const { view } = await searchParams;

  let doc: Awaited<ReturnType<typeof loadPublicationDocument>>;
  const source = resolvePublicationSource(id);
  const basePath = `/works/publications/${id}`;

  try {
    doc = await loadPublicationDocument(source, slug);
  } catch (err) {
    console.error("PAGE LOAD ERROR:", err);
    notFound();
  }

  const { manifest, current, source: mdxSource, toc, prev, next } = doc;
  const currentPath = current.href ? `${basePath}/${current.href}` : basePath;
  const blocks = parsePublicationPlainText(mdxSource);
  const plainText = blocksToPlainText(blocks);

  if (view === "text") {
    return (
      <PublicationDryRead
        manifest={manifest}
        current={current}
        basePath={basePath}
        currentPath={currentPath}
        blocks={blocks}
        plainText={plainText}
      />
    );
  }

  const { content } = await compileMDX({
    source: mdxSource,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeKatex],
      },
    },
    components: MDX_COMPONENTS,
  });

  return (
    <PublicationShell
      sidebar={
        <PublicationSidebar
          manifest={manifest}
          activeHref={current.href ?? ""}
          basePath={basePath}
        />
      }
      document={
        <>
          <div id="publication-pdf-source">
            <PublicationHeader
              manifest={manifest}
              current={current}
              basePath={basePath}
              dryReadHref={`${currentPath}?view=text`}
              plainText={plainText}
              pdfTargetId="publication-pdf-source"
            />

            <PublicationContent>{content}</PublicationContent>
          </div>

          <div className="print:hidden">
            <PublicationFooter prev={prev} next={next} basePath={basePath} />

            <Comments
              term={`publications/${id}${slug.length ? `/${slug.join("/")}` : ""}`}
              className="mt-16 border-t border-[#2C2E32] pt-10"
            />
          </div>
        </>
      }
      rightRail={
        <div className="sticky top-24 max-h-[calc(100vh-7rem)]">
          <FadingScrollContainer className="max-h-[calc(100vh-7rem)] pb-6" fadeHeight={26}>
            <PublicationMetadata manifest={manifest} />
            <div className="mt-8 border-t border-[#2C2E32] pt-6">
              <PublicationTOC headings={toc} />
            </div>
          </FadingScrollContainer>
        </div>
      }
    />
  );
}
