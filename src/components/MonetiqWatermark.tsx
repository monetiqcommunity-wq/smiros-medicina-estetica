export function MonetiqWatermark() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none select-none overflow-hidden flex items-center justify-center"
    >
      <div className="-rotate-28 flex flex-col items-center justify-center text-center">
        <span className="font-sans font-semibold uppercase tracking-[0.22em] text-[#6E665E] opacity-15 text-[16vw] sm:text-[13vw] lg:text-[11vw] leading-none whitespace-nowrap">
          MONETIQ
        </span>
        <span className="mt-2 sm:mt-3 font-sans font-medium tracking-[0.12em] uppercase text-[#6E665E] opacity-25 text-[10px] sm:text-xs whitespace-nowrap">
          Anteprima dimostrativa non ufficiale · MONETIQ
        </span>
      </div>
    </div>
  );
}
