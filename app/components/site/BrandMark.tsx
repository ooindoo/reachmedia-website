// Reach Media mark: lime sheet with a folded corner (email / page).
// Single source for header, footer and icon files (public/favicon.svg mirrors it).
export const MARK_BODY =
  "M28 6H66L94 34V72A22 22 0 0 1 72 94H28A22 22 0 0 1 6 72V28A22 22 0 0 1 28 6Z";
export const MARK_FOLD = "M66 6V26A8 8 0 0 0 74 34H94Z";

export default function BrandMark({ size = 18, outline = false }: { size?: number; outline?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d={MARK_BODY}
        fill="#E8FF47"
        {...(outline && { stroke: "rgb(11 12 14 / 0.3)", strokeWidth: 4, strokeLinejoin: "round" as const })}
      />
      <path d={MARK_FOLD} fill="#B9CC2E" />
    </svg>
  );
}
