"use client";

import GiscusComments from "@giscus/react";
import { plexMono } from "@/lib/fonts";

interface CommentsProps {
  term: string;
  className?: string;
}

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function Comments({ term, className }: CommentsProps) {
  if (!GISCUS_REPO || !GISCUS_REPO_ID || !GISCUS_CATEGORY || !GISCUS_CATEGORY_ID) {
    return null;
  }

  return (
    <div className={className}>
      <span
        className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#8A8F99] mb-4`}
      >
        Discussion
      </span>
      <GiscusComments
        repo={GISCUS_REPO as `${string}/${string}`}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="specific"
        term={term}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="transparent_dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
