export interface Article {
  title: string;
  tags: string[];
  readingTime: string;
  excerpt: string;
}

export const articles: Article[] = [
  {
    title: "Why most automation systems fail at scale",
    tags: ["Systems", "Data"],
    readingTime: "9 min",
    excerpt:
      "Most automation breaks not at the logic layer but at the seams between systems that disagree about what time it is.",
  },
  {
    title: "Event-driven vs scheduled workflows: real tradeoffs",
    tags: ["Systems"],
    readingTime: "7 min",
    excerpt:
      "Events feel modern, schedules feel old. The honest answer is that operational reliability often lives in the boring one.",
  },
  {
    title: "Designing under API constraints (APS case)",
    tags: ["Systems", "AEC", "Integration"],
    readingTime: "8 min",
    excerpt:
      "When the upstream API can return inconsistent state under load, the architecture has to make that inconsistency observable instead of hidden.",
  },
  {
    title: "Why AEC tech struggles with adoption",
    tags: ["AEC", "Product"],
    readingTime: "6 min",
    excerpt:
      "AEC software fails adoption when it optimises for the procurement buyer instead of the person who has to open it on a Tuesday morning.",
  },
  {
    title: "State-driven systems: thinking in invariants",
    tags: ["Systems"],
    readingTime: "10 min",
    excerpt:
      "Triggers describe what just happened. States describe what is true now. The second is what operators actually need.",
  },
];
