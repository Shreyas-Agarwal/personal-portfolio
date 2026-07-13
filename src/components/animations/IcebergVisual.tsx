"use client"

export function IcebergVisual() {
  return (
    <svg viewBox="0 0 160 40" className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none">
      <line x1="5" y1="15" x2="155" y2="15" stroke="#E6E1D6" strokeOpacity="0.2" />
      <polygon points="80,2 65,15 95,15" fill="none" stroke="#E6E1D6" strokeWidth={1} />
      <text x="80" y="11" textAnchor="middle" fontSize={6} fontFamily="monospace" fill="#DE4B31">Metadata</text>
      <polygon points="80,38 55,15 105,15" fill="none" stroke="#E6E1D6" strokeWidth={1} strokeDasharray="2 2" strokeOpacity={0.5} />
      <text x="80" y="27" textAnchor="middle" fontSize={6} fontFamily="monospace" fill="#E6E1D6" fillOpacity={0.5}>Parquet Files</text>
    </svg>
  );
}
