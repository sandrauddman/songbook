'use client';

interface FontSizeControlsProps {
  fontSizeIndex: number;
  canDecrease: boolean;
  canIncrease: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function FontSizeControls({
  fontSizeIndex,
  canDecrease,
  canIncrease,
  onDecrease,
  onIncrease,
}: FontSizeControlsProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-[var(--line)] bg-[var(--surface)]/95 p-1 shadow-lg shadow-black/10 backdrop-blur">
      <button
        type="button"
        onClick={onDecrease}
        disabled={!canDecrease}
        aria-label="Minska textstorlek"
        className="rounded-lg px-3 py-2 text-sm font-bold text-[var(--ink)] transition hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-35"
      >
        A-
      </button>
      <div className="flex gap-1 px-1" aria-label={`Textstorlek ${fontSizeIndex + 1} av 4`}>
        {[0, 1, 2, 3].map((step) => (
          <span
            key={step}
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${step === fontSizeIndex ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'}`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onIncrease}
        disabled={!canIncrease}
        aria-label="Öka textstorlek"
        className="rounded-lg px-3 py-2 text-sm font-bold text-[var(--ink)] transition hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-35"
      >
        A+
      </button>
    </div>
  );
}