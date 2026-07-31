type BrandLogoProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function BrandLogo({ compact = false, inverted = false }: BrandLogoProps) {
  return (
    <span className="flex items-center gap-3">
      <svg
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 38 24 8l15 30" stroke="#B69A63" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 28h18" stroke="#B69A63" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M12 40c7-5 17-5 24 0" stroke="#B69A63" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="8" r="2.8" fill="#B69A63" />
      </svg>
      {!compact && (
        <span className="leading-none">
          <span className={`serif block text-xl font-semibold tracking-[0.08em] ${inverted ? "text-white" : ""}`}>AURÉA</span>
          <span className={`mt-1 block text-[0.58rem] font-semibold tracking-[0.34em] ${inverted ? "text-slate-300" : "opacity-70"}`}>
            ADVOCACIA
          </span>
        </span>
      )}
    </span>
  );
}
