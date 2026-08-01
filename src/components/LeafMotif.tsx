import React from "react";

interface LeafMotifProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function LeafMotif({
  className = "w-5 h-5 inline-block text-[#0B3C2D]",
  size = 20,
  color = "currentColor",
}: LeafMotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21C12 21 17.5 16.5 17.5 10.5C17.5 6.36 14.14 3 10 3C5.86 3 2.5 6.36 2.5 10.5C2.5 16.5 8 21 8 21"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 21V10"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 14L14 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
