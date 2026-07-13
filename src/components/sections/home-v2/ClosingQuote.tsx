import { serif } from "@/lib/fonts";

/** The closing prose moment — on paper, ink-dark text, centered like a pull-quote. */
export function ClosingQuote() {
  return (
    <p className={`${serif.className} text-center text-2xl italic leading-relaxed text-[#1B1D1F]/85 md:text-3xl`}>
      "Not every story compiles into a system — but the ones that do are usually the ones worth
      debugging at 2 a.m."
    </p>
  );
}
