 /**
  * Module: useScaleToFit
  * Target: React 18, CRA (react-scripts 5)
  * Purpose:
  *   Provides a reusable React hook to apply a non-distorting, DPR-aware scale transform
  *   to a fixed-dimension design container (e.g., Figma frame). The hook:
  *     - Computes transform scale based on viewport vs. design width/height
  *     - Snaps scale factor to device pixel ratio to reduce blur
  *     - Applies vendor-prefixed transforms and centers horizontally
  *     - Cleans up all listeners/observers on unmount
  *
  * Security: No user input, no secrets. Only DOM reads/writes to known containerRef.
  */

import { useEffect, useRef, useCallback } from "react";

/**
 * Debounce utility to limit high-frequency events like resize.
 * Uses trailing call behavior to apply the last intent.
 */
function debounce(fn, wait = 50) {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

/**
 * Align scale to device pixels to keep crispness on transforms.
 */
function snapScaleToDPR(scale) {
  try {
    const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
    if (!Number.isFinite(scale) || scale <= 0) return 1;
    // Snap to increments of 1/dpr
    const snapped = Math.round(scale * dpr) / dpr;
    return Math.min(Math.max(snapped, 0), 1);
  } catch {
    return Math.min(Math.max(scale, 0), 1);
  }
}

// PUBLIC_INTERFACE
export function useScaleToFit(
  containerRef,
  {
    designWidth,
    designHeight,
    dprSnap = true,
    centerHorizontally = true,
    observeDocument = true,
  } = {}
) {
  /**
   * Apply the transform based on current viewport.
   * Exposed via ref for optional manual triggers by consumer.
   */
  const applyScale = useCallback(() => {
    try {
      const container = containerRef?.current;
      if (!container) return;

      const vw = window.innerWidth || document.documentElement.clientWidth || designWidth;
      const vh = window.innerHeight || document.documentElement.clientHeight || designHeight;

      let s = Math.min(vw / designWidth, vh / designHeight, 1);
      if (dprSnap) s = snapScaleToDPR(s);

      // Fix container to design size for predictable transform
      container.style.width = `${designWidth}px`;
      container.style.height = `${designHeight}px`;

      // Apply transforms with vendor prefixes for broader support
      const transformValue = `translateZ(0) scale(${s})`;
      container.style.transform = transformValue;
      container.style.webkitTransform = transformValue;
      container.style.msTransform = `scale(${s})`;

      if (centerHorizontally) {
        const marginX = Math.max((vw - designWidth * s) / 2, 0);
        container.style.marginLeft = `${marginX}px`;
        container.style.marginRight = `${marginX}px`;
      }
    } catch {
      // Silently ignore to avoid console noise; sizing will retry on next event
    }
  }, [centerHorizontally, containerRef, designHeight, designWidth, dprSnap]);

  // Keep a stable debounced version for event handlers
  const debouncedApplyRef = useRef(null);
  if (!debouncedApplyRef.current) {
    debouncedApplyRef.current = debounce(applyScale, 50);
  }

  useEffect(() => {
    const handler = debouncedApplyRef.current;
    // Initial
    applyScale();

    // Listen to resize/orientation
    window.addEventListener("resize", handler, { passive: true });
    window.addEventListener("orientationchange", handler, { passive: true });

    // Observe document element for layout changes as an extra safety
    let ro = null;
    if (observeDocument && typeof ResizeObserver !== "undefined") {
      try {
        ro = new ResizeObserver(handler);
        ro.observe(document.documentElement);
      } catch {
        // noop
      }
    }

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
      if (ro && ro.disconnect) {
        try { ro.disconnect(); } catch { /* noop */ }
      }
    };
  }, [applyScale, observeDocument]);

  return { applyScale };
}
