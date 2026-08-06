import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { FieldNoteContent } from "@/components/field-notes/FieldNoteContent";
import { FieldNoteFooter } from "@/components/field-notes/FieldNoteFooter";
import { FieldNoteHeader } from "@/components/field-notes/FieldNoteHeader";
import { Comments } from "@/components/shared/Comments";
import {
  NoteA,
  NoteBlockquote,
  NoteCode,
  NoteEm,
  NoteH1,
  NoteH2,
  NoteH3,
  NoteHr,
  NoteLi,
  NoteOl,
  NoteParagraph,
  NotePre,
  NoteStrong,
  NoteUl,
} from "@/components/field-notes/mdx-primitives";
import { getAllFieldNotes, getFieldNote } from "@/lib/field-notes/loader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const note = getFieldNote(slug);
    return {
      title: note.title,
      description: note.excerpt,
    };
  } catch {
    return { title: "Not Found" };
  }
}

const MDX_COMPONENTS = {
  h1: NoteH1,
  h2: NoteH2,
  h3: NoteH3,
  p: NoteParagraph,
  blockquote: NoteBlockquote,
  pre: NotePre,
  code: NoteCode,
  ul: NoteUl,
  ol: NoteOl,
  li: NoteLi,
  hr: NoteHr,
  strong: NoteStrong,
  em: NoteEm,
  a: NoteA,
} as const;

export default async function FieldNotePage({ params }: PageProps) {
  const { slug } = await params;

  let note: ReturnType<typeof getFieldNote>;
  try {
    note = getFieldNote(slug);
  } catch {
    notFound();
  }

  const notes = getAllFieldNotes();
  const currentIndex = notes.findIndex((n) => n.slug === note.slug);
  // notes are sorted newest-first: prev = older, next = newer
  const prev = currentIndex >= 0 ? notes[currentIndex + 1] : undefined;
  const next = currentIndex > 0 ? notes[currentIndex - 1] : undefined;

  const { content } = await compileMDX({
    source: note.source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
    components: MDX_COMPONENTS,
  });

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <FieldNoteHeader note={note} />
        <FieldNoteContent>{content}</FieldNoteContent>
        <FieldNoteFooter prev={prev} next={next} />
        <Comments term={`field-notes/${note.slug}`} className="mt-16 border-t border-[#33373B] pt-10" />
      </div>
    </main>
  );
}
