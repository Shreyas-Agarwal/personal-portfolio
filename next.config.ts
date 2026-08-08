import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createMDX = require("@next/mdx") as (opts?: unknown) => (cfg: NextConfig) => NextConfig;

const nextConfig: NextConfig = {
  // Allow .md and .mdx files to act as Next.js pages / imports
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  async redirects() {
    return [
      // Legacy journal URLs -> new Architecture of Information Systems publication
      {
        source: "/journal/data-1-oltp-vs-olap",
        destination: "/works/publications/architecture-of-information-systems/data/oltp-vs-olap",
        permanent: true,
      },
      {
        source: "/journal/data-2-canonical-business-model",
        destination:
          "/works/publications/architecture-of-information-systems/data/canonical-business-model",
        permanent: true,
      },
      {
        source: "/journal/data-3-generic-relationship-cost",
        destination:
          "/works/publications/architecture-of-information-systems/data/generic-relationship-cost",
        permanent: true,
      },
      {
        source: "/journal/data-4-history-as-feature",
        destination:
          "/works/publications/architecture-of-information-systems/data/history-as-feature",
        permanent: true,
      },
      {
        source: "/journal/data-5-cost-of-moving-data",
        destination:
          "/works/publications/architecture-of-information-systems/data/cost-of-moving-data",
        permanent: true,
      },
      {
        source: "/journal/data-6-random-uuids",
        destination: "/works/publications/architecture-of-information-systems/data/random-uuids",
        permanent: true,
      },
      {
        source: "/journal/infra-1-application-is-not-system",
        destination:
          "/works/publications/architecture-of-information-systems/infrastructure/application-is-not-system",
        permanent: true,
      },
      {
        source: "/journal/infra-2-dependency-bleed",
        destination:
          "/works/publications/architecture-of-information-systems/infrastructure/dependency-bleed",
        permanent: true,
      },
      {
        source: "/journal/infra-3-modern-memory-leak",
        destination:
          "/works/publications/architecture-of-information-systems/infrastructure/modern-memory-leak",
        permanent: true,
      },
      {
        source: "/journal/infra-4-session-state-has-a-cost",
        destination:
          "/works/publications/architecture-of-information-systems/infrastructure/session-state-has-a-cost",
        permanent: true,
      },
      {
        source: "/journal/infra-5-the-four-tuple",
        destination:
          "/works/publications/architecture-of-information-systems/infrastructure/the-four-tuple",
        permanent: true,
      },
      {
        source: "/journal/infra-6-the-reverse-proxy",
        destination:
          "/works/publications/architecture-of-information-systems/infrastructure/the-reverse-proxy",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
