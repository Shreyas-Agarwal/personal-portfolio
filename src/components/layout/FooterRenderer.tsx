"use client";

import { usePathname } from "next/navigation";
import { HomeFooter } from "./HomeFooter";
import { DefaultFooter } from "./DefaultFooter";

export function FooterRenderer() {
    const pathname = usePathname();
    return pathname === "/" ? <HomeFooter /> : <DefaultFooter />;
}
