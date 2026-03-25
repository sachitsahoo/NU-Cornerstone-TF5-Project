import { useEffect, useState } from "react";

/**
 * Window scroll position for parallax. Returns 0 when reduced motion is preferred.
 */
export function useScrollParallax(): number {
  const [y, setY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMq = () => setReduceMotion(mq.matches);
    applyMq();
    mq.addEventListener("change", applyMq);

    let raf = 0;
    const tick = () => {
      raf = 0;
      setY(window.scrollY || window.pageYOffset);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", applyMq);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return reduceMotion ? 0 : y;
}
