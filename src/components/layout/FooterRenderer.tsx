"use client";

import { usePathname } from "next/navigation";
import { DefaultFooter } from "./DefaultFooter";
import { HomeFooter } from "./HomeFooter";

export function FooterRenderer() {
  const pathname = usePathname();
  return pathname === "/" ? <HomeFooter /> : <DefaultFooter />;
}
