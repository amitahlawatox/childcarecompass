/**
 * HeroIllustration — a soft, editorial-style illustration for the homepage hero.
 *
 * Design rationale:
 * - Hand-drawn feel: gentle wobble in lines, soft fills, no rigid geometry
 * - Brand-coherent: uses sage/warmth/sky tones from the design system
 * - Subtly evokes childhood (stacking blocks, a small sun, a paper boat) without
 *   being cartoony or childish — looks at home in an editorial publication
 * - Floats gently for life, but slow enough not to distract from reading
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Soft cream backdrop circle */}
      <circle
        cx="200"
        cy="210"
        r="170"
        fill="#FBE9D9"
        opacity="0.45"
      />

      {/* Sage circle behind */}
      <circle
        cx="270"
        cy="140"
        r="55"
        fill="#EEF3EC"
      />

      {/* Soft sun rays — a small warm dot top right */}
      <g className="animate-gentle-float" style={{ transformOrigin: "320px 80px" }}>
        <circle cx="320" cy="80" r="22" fill="#E8A87C" opacity="0.85" />
        <circle cx="320" cy="80" r="14" fill="#FBE9D9" opacity="0.8" />
      </g>

      {/* Stacking blocks — the centrepiece, drawn with slight imperfection */}
      {/* Bottom block — wider, dark sage */}
      <g>
        <path
          d="M 100 290 Q 100 285 105 285 L 250 285 Q 255 285 255 290 L 255 330 Q 255 335 250 335 L 105 335 Q 100 335 100 330 Z"
          fill="#6B8E72"
        />
        <path
          d="M 100 290 Q 100 285 105 285 L 250 285 Q 255 285 255 290 L 255 330 Q 255 335 250 335 L 105 335 Q 100 335 100 330 Z"
          stroke="#1F2A22"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        />
        {/* Subtle texture line */}
        <line x1="115" y1="310" x2="240" y2="310" stroke="#1F2A22" strokeWidth="0.5" opacity="0.15" />
      </g>

      {/* Middle block — peach */}
      <g>
        <path
          d="M 130 240 Q 130 235 135 235 L 225 235 Q 230 235 230 240 L 230 282 Q 230 287 225 287 L 135 287 Q 130 287 130 282 Z"
          fill="#E8A87C"
        />
        <path
          d="M 130 240 Q 130 235 135 235 L 225 235 Q 230 235 230 240 L 230 282 Q 230 287 225 287 L 135 287 Q 130 287 130 282 Z"
          stroke="#1F2A22"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
        {/* Little circle detail like a wooden toy nail/marker */}
        <circle cx="180" cy="260" r="4" fill="#FBF7F1" stroke="#1F2A22" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Top block — soft sky blue, slightly tilted as if balanced */}
      <g transform="rotate(-4 180 215)">
        <path
          d="M 150 195 Q 150 190 155 190 L 210 190 Q 215 190 215 195 L 215 232 Q 215 237 210 237 L 155 237 Q 150 237 150 232 Z"
          fill="#A9C5D4"
        />
        <path
          d="M 150 195 Q 150 190 155 190 L 210 190 Q 215 190 215 195 L 215 232 Q 215 237 210 237 L 155 237 Q 150 237 150 232 Z"
          stroke="#1F2A22"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
        {/* Letter-ish detail */}
        <path
          d="M 175 215 Q 180 207 185 215 M 190 207 L 190 222 M 198 207 L 198 222"
          stroke="#1F2A22"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* Small heart floating top */}
      <g className="animate-gentle-float" style={{ transformOrigin: "180px 155px", animationDelay: "1s" }}>
        <path
          d="M 178 158 C 178 152, 170 150, 170 156 C 170 160, 178 168, 178 168 C 178 168, 186 160, 186 156 C 186 150, 178 152, 178 158 Z"
          fill="#E8A87C"
          opacity="0.85"
        />
      </g>

      {/* Tiny paper boat floating, bottom right */}
      <g className="animate-gentle-float" style={{ transformOrigin: "300px 290px", animationDelay: "2s" }}>
        <path
          d="M 280 295 L 320 295 L 310 310 L 290 310 Z"
          fill="#FBF7F1"
          stroke="#1F2A22"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M 300 295 L 300 278 L 318 295 Z"
          fill="#A9C5D4"
          stroke="#1F2A22"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </g>

      {/* Small organic leaf detail near base */}
      <path
        d="M 90 340 Q 80 330 70 335 Q 75 345 90 340"
        fill="#6B8E72"
        opacity="0.4"
      />
      <path
        d="M 80 340 L 85 338"
        stroke="#4A6B51"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Few decorative dots like confetti */}
      <circle cx="80" cy="200" r="2.5" fill="#E8A87C" opacity="0.6" />
      <circle cx="60" cy="240" r="2" fill="#6B8E72" opacity="0.5" />
      <circle cx="340" cy="220" r="2.5" fill="#A9C5D4" opacity="0.6" />
      <circle cx="345" cy="260" r="1.8" fill="#E8A87C" opacity="0.5" />
      <circle cx="95" cy="270" r="1.5" fill="#A9C5D4" opacity="0.5" />
    </svg>
  );
}
