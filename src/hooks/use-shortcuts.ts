import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

/**
 * Atajos globales:
 *  /  → enfoca el buscador (input[data-search])
 *  r  → abre recomendador (dispara CustomEvent "11f:open-recomendador")
 *  g luego m → /materiales
 *  g luego h → /
 *  g luego s → /sobre-el-11f
 *  ?  → muestra/oculta panel atajos (CustomEvent "11f:toggle-shortcuts-help")
 */
export function useGlobalShortcuts() {
  const navigate = useNavigate();
  useEffect(() => {
    let gPending = false;
    let gTimer: ReturnType<typeof setTimeout> | null = null;

    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "/") {
        const el = document.querySelector<HTMLInputElement>("input[data-search]");
        if (el) { e.preventDefault(); el.focus(); }
        return;
      }
      if (e.key === "r") {
        window.dispatchEvent(new CustomEvent("11f:open-recomendador"));
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("11f:toggle-shortcuts-help"));
        return;
      }
      if (e.key === "g") {
        gPending = true;
        if (gTimer) clearTimeout(gTimer);
        gTimer = setTimeout(() => { gPending = false; }, 800);
        return;
      }
      if (gPending) {
        gPending = false;
        if (gTimer) clearTimeout(gTimer);
        if (e.key === "m") navigate({ to: "/materiales", search: { q: "" } });
        else if (e.key === "h") navigate({ to: "/" });
        else if (e.key === "s") navigate({ to: "/sobre-el-11f" });
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
}
