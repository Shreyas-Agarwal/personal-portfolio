import type { Metadata } from "next";
import { About } from "@/components/sections/home/About";
import { Hero } from "@/components/sections/home/Hero";
import { Principles } from "@/components/sections/home/Principles";
import { Simulations } from "@/components/sections/home/Simulations";
import { Systems } from "@/components/sections/home/Systems";
import { Thinking } from "@/components/sections/home/Thinking";

export const metadata: Metadata = {
  title: "Engineer — Systems that survive reality",
  description:
    "Product and Data Engineer building decision engines, automation pipelines, and platforms that keep operating under real-world constraints.",
  openGraph: {
    title: "Engineer — Systems that survive reality",
    description:
      "Decision engines, data pipelines, AEC platforms. Case studies, simulations, and research.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Systems />
      <Simulations />
      <Thinking />
      <Principles />
      <About />
    </>
  );
}
