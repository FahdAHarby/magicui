import type { SVGProps } from "react";

/**
 * A tooth mark — lucide has no tooth glyph, so the brand keeps its own.
 */
export function ToothIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <title>Tooth</title>
      <path d="M12 5.6C10.7 4.3 9.2 3.6 7.7 3.6 5 3.6 3.2 5.7 3.2 8.6c0 2.1.6 3.5 1.1 5.3.4 1.4.5 3 .8 4.5.3 1.4.9 2.1 1.7 2.1 1 0 1.6-.8 1.9-2.3.3-1.5.5-3.4.9-4.4.2-.6.7-1 1.5-1s1.3.4 1.5 1c.4 1 .6 2.9.9 4.4.3 1.5.9 2.3 1.9 2.3.8 0 1.4-.7 1.7-2.1.3-1.5.4-3.1.8-4.5.5-1.8 1.1-3.2 1.1-5.3 0-2.9-1.8-5-4.5-5-1.5 0-3 .7-4.3 2Z" />
    </svg>
  );
}
