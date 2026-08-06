/**
 * Publication — top-level orchestrator
 *
 * The single entry point for rendering a publication. Composes all
 * sub-components into the three-column layout. Accepts either:
 *
 *   <Publication source="/content/projects/case-studies/desktop-connector" slugPath={[]} />
 *
 * or for when the manifest is already loaded:
 *
 *   <Publication document={resolvedDoc} />
 *
 * This is a Server Component. All data loading happens here.
 */

import { loadPublicationDocument } from "@/lib/publication/loader";
import { toPlainText } from "@/lib/publication/plain-text";
import type { PublicationDocument } from "@/lib/publication/types";
import { PublicationContent } from "./PublicationContent/PublicationContent";
import { PublicationFooter } from "./PublicationFooter/PublicationFooter";
import { PublicationHeader } from "./PublicationHeader/PublicationHeader";
import { PublicationMetadata } from "./PublicationMetadata/PublicationMetadata";
import { PublicationShell } from "./PublicationShell/PublicationShell";
import { PublicationSidebar } from "./PublicationSidebar/PublicationSidebar";
import { PublicationTOC } from "./PublicationTOC/PublicationTOC";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface PublicationFromSource {
  /** Filesystem path to the publication root directory. */
  source: string;
  /** Remaining URL segments after the publication base path. */
  slugPath?: string[];
  document?: never;
  basePath?: string;
  children?: React.ReactNode;
}

interface PublicationFromDocument {
  /** Pre-loaded, resolved publication document. */
  document: PublicationDocument;
  source?: never;
  slugPath?: never;
  basePath?: string;
  children?: React.ReactNode;
}

type PublicationProps = PublicationFromSource | PublicationFromDocument;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export async function Publication(props: PublicationProps) {
  let doc: PublicationDocument;

  if (props.document) {
    doc = props.document;
  } else {
    doc = await loadPublicationDocument(props.source, props.slugPath ?? []);
  }

  const { manifest, current, source, toc, prev, next } = doc;

  // The base path for all section links. Defaults to /publication/<id>
  const basePath = props.basePath ?? `/publication/${manifest.id}`;
  const currentPath = current.href ? `${basePath}/${current.href}` : basePath;
  const plainText = toPlainText(source);
  const pdfTargetId = `publication-pdf-source-${manifest.id}`;

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
          <div id={pdfTargetId}>
            <PublicationHeader
              manifest={manifest}
              current={current}
              basePath={basePath}
              dryReadHref={`${currentPath}?view=text`}
              plainText={plainText}
              pdfTargetId={pdfTargetId}
            />

            <PublicationContent>{props.children}</PublicationContent>
          </div>

          <PublicationFooter prev={prev} next={next} basePath={basePath} />
        </>
      }
      rightRail={
        <>
          <PublicationMetadata manifest={manifest} />
          <div className="mt-8 border-t border-[#2C2E32] pt-6">
            <PublicationTOC headings={toc} />
          </div>
        </>
      }
    />
  );
}
