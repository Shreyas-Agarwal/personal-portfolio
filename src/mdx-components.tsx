/**
 * Global MDX component overrides.
 *
 * This file is required by Next.js App Router when using @next/mdx.
 * It maps every standard HTML element produced by MDX into a design
 * primitive from the publication framework.
 *
 * All markdown → publication component mappings live here so the MDX
 * compiler never emits naked HTML elements inside a publication.
 */
import type { MDXComponents } from "mdx/types";
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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ...components,
  };
}
