import { useEffect, useState } from "react";

const KEY = "11f:paper-mode";

export function usePaperMode() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY) === "1";
      setOn(v);
      document.documentElement.classList.toggle("paper-grid", v);
    } catch {}
  }, []);

  const toggle = () => {
    setOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(KEY, next ? "1" : "0");
        document.documentElement.classList.toggle("paper-grid", next);
      } catch {}
      return next;
    });
  };

  return { on, toggle };
}
