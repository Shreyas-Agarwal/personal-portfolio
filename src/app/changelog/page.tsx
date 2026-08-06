import type { Metadata } from "next";
import { ChangelogList } from "@/components/changelog/ChangelogList";
import { changelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Revision Log",
  description: "The complete revision history of this site — what changed, and why.",
  openGraph: {
    title: "Revision Log | Shreyas Agarwal",
    description: "The complete revision history of this site — what changed, and why.",
  },
};

export default function ChangelogPage() {
  return <ChangelogList entries={changelog} />;
}
