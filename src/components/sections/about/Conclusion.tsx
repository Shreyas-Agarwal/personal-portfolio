export function ConclusionSection() {
  return (
    <section className="relative bg-[#E7E1D7] px-6 py-40 md:py-64 md:px-12 flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-20">
          <span className="block font-mono text-[10px] tracking-[0.22em] text-black/28 text-center md:text-left">
            WORKING_THEORY
          </span>
        </div>

        <div className="space-y-12 md:space-y-16">
          <p className="text-3xl font-serif font-light leading-[1.5] tracking-tight text-black/85 md:text-4xl md:leading-[1.4]">
            Over time, the focus shifted away from individual disciplines and toward the patterns beneath them.
          </p>

          <div className="space-y-10 max-w-2xl">
            <p className="text-lg font-light leading-[1.8] text-black/60 md:text-xl md:leading-[1.8]">
              Software, organizations, cities, biology, philosophy, and infrastructure all appear profoundly different on the surface. Yet they repeatedly raise variations of the same underlying questions.
            </p>

            <p className="text-lg font-light leading-[1.8] text-black/60 md:text-xl md:leading-[1.8]">
              Questions about information flow. About coordination under uncertainty. About the emergence of complexity, the constraints of structure, and the breaking points of scale.
            </p>

            <p className="text-lg font-light leading-[1.8] text-black/60 md:text-xl md:leading-[1.8]">
              I haven't found definitive answers to these questions, and I am increasingly doubtful that such answers exist.
            </p>

            <p className="text-lg font-light leading-[1.8] text-black/60 md:text-xl md:leading-[1.8]">
              But the territory is becoming more familiar. The search has become clearer. And everything I build, write, or study now is just another attempt to trace those patterns a little further.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
