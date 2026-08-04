"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface HeaderContextType {
  activeTitle: string | null;
  setActiveTitle: (title: string | null) => void;
}

const HeaderContext = createContext<HeaderContextType>({
  activeTitle: null,
  setActiveTitle: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);

  return (
    <HeaderContext.Provider value={{ activeTitle, setActiveTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderTitle(title?: string) {
  const context = useContext(HeaderContext);

  useEffect(() => {
    if (title) {
      context.setActiveTitle(title);
      return () => {
        context.setActiveTitle(null);
      };
    }
  }, [title, context.setActiveTitle]);

  return context;
}
