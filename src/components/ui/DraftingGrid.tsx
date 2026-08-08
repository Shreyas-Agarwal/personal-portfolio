/**
 * The 34px drafting lattice that sits under the whole desk surface — felt
 * more than seen. Structural, not a container; never itself a visual focus.
 */
export function DraftingGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #E6E1D6 1px, transparent 1px), linear-gradient(to bottom, #E6E1D6 1px, transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    />
  );
}
