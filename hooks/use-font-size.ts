import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'songbook-font-size';
const FONT_SIZES = [1.25, 1.5, 1.875, 2.25] as const;
const listeners = new Set<() => void>();

function getStoredFontSize(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const storedValue = Number.parseInt(window.localStorage.getItem(STORAGE_KEY) ?? '', 10);
  return Number.isInteger(storedValue) ? Math.min(Math.max(storedValue, 0), FONT_SIZES.length - 1) : 0;
}

export function useFontSize() {
  const fontSizeIndex = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getStoredFontSize,
    () => 0,
  );

  const updateFontSize = (nextIndex: number) => {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), FONT_SIZES.length - 1);
    window.localStorage.setItem(STORAGE_KEY, String(clampedIndex));
    listeners.forEach((listener) => listener());
  };

  return {
    fontSize: FONT_SIZES[fontSizeIndex],
    fontSizeIndex,
    canDecrease: fontSizeIndex > 0,
    canIncrease: fontSizeIndex < FONT_SIZES.length - 1,
    decrease: () => updateFontSize(fontSizeIndex - 1),
    increase: () => updateFontSize(fontSizeIndex + 1),
  };
}