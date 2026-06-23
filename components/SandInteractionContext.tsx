"use client";

import { createContext, useContext, useRef, useCallback, type ReactNode } from "react";

interface InteractionZone {
  id: string;
  rect: DOMRect;
  isHovered: boolean;
}

interface SandInteractionAPI {
  zonesRef: React.RefObject<Map<string, InteractionZone>>;
  register: (id: string, rect: DOMRect) => void;
  unregister: (id: string) => void;
  setHovered: (id: string, hovered: boolean) => void;
}

const SandInteractionContext = createContext<SandInteractionAPI | null>(null);

export function SandInteractionProvider({ children }: { children: ReactNode }) {
  const zonesRef = useRef<Map<string, InteractionZone>>(new Map());

  const register = useCallback((id: string, rect: DOMRect) => {
    zonesRef.current!.set(id, { id, rect, isHovered: false });
  }, []);

  const unregister = useCallback((id: string) => {
    zonesRef.current!.delete(id);
  }, []);

  const setHovered = useCallback((id: string, hovered: boolean) => {
    const zone = zonesRef.current!.get(id);
    if (zone) zone.isHovered = hovered;
  }, []);

  return (
    <SandInteractionContext value={{ zonesRef, register, unregister, setHovered }}>
      {children}
    </SandInteractionContext>
  );
}

export function useSandInteraction() {
  const ctx = useContext(SandInteractionContext);
  if (!ctx) throw new Error("useSandInteraction must be used within SandInteractionProvider");
  return ctx;
}
