import React from "react";

interface WaveDividerProps {
  fillColor?: string;
  className?: string;
  flip?: boolean;
  type?: "wave" | "curve-dip" | "asymmetric" | "gentle-arc";
}

export default function WaveDivider({
  fillColor = "#F8F4EE",
  className = "w-full overflow-hidden leading-none",
  flip = false,
  type = "wave",
}: WaveDividerProps) {
  return (
    <div className={`${className} ${flip ? "rotate-180" : ""}`}>
      {type === "wave" && (
        <svg
          className="relative block w-full h-10 sm:h-14 md:h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
            fill={fillColor}
          ></path>
        </svg>
      )}

      {type === "curve-dip" && (
        <svg
          className="relative block w-full h-10 sm:h-14 md:h-18"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
            fill={fillColor}
          ></path>
        </svg>
      )}

      {type === "asymmetric" && (
        <svg
          className="relative block w-full h-12 sm:h-16 md:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C300,120 800,-20 1200,60 L1200,120 L0,120 Z"
            fill={fillColor}
          ></path>
        </svg>
      )}

      {type === "gentle-arc" && (
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C400,0 800,120 1200,60 L1200,120 L0,120 Z"
            fill={fillColor}
          ></path>
        </svg>
      )}
    </div>
  );
}
