import { useCallback, useEffect, useRef, useState } from "react";

type Dhikr = {
  id: number;
  name: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  target: number;
};

const DHIKR_LIST: Dhikr[] = [
  {
    id: 0,
    name: "Subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subḥānallāh",
    meaning: "Glory be to Allah",
    target: 33,
  },
  {
    id: 1,
    name: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Al-ḥamdu lillāh",
    meaning: "All praise is due to Allah",
    target: 33,
  },
  {
    id: 2,
    name: "Allahu Akbar",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allāhu Akbar",
    meaning: "Allah is the Greatest",
    target: 34,
  },
  {
    id: 3,
    name: "La ilaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: "Lā ilāha illallāh",
    meaning: "There is no god but Allah",
    target: 100,
  },
  {
    id: 4,
    name: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullāh",
    meaning: "I seek forgiveness from Allah",
    target: 100,
  },
];

// Separate Dhikr Text Card Component (Arabic + Transliteration + Meaning)
type DhikrTextCardProps = {
  dhikr: Dhikr;
};

function DhikrTextCard({ dhikr }: { dhikr: Dhikr }) {
  return (
    <div className="mb-6 w-full">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl">
        {/* Decorative corner accents */}
        <div className="absolute left-0 top-0 h-12 w-12">
          <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-amber-500/30" />
        </div>
        <div className="absolute right-0 top-0 h-12 w-12">
          <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-amber-500/30" />
        </div>
        <div className="absolute bottom-0 left-0 h-12 w-12">
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-amber-500/30" />
        </div>
        <div className="absolute bottom-0 right-0 h-12 w-12">
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-amber-500/30" />
        </div>

        <div className="relative flex flex-col items-center gap-2 text-center">
          <p
            className="text-4xl leading-relaxed text-amber-50"
            dir="rtl"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {dhikr.arabic}
          </p>
          <p className="font-serif text-base italic text-amber-100/80">
            {dhikr.transliteration}
          </p>
          <p className="font-serif text-xs uppercase tracking-[0.2em] text-white/50">
            {dhikr.meaning}
          </p>
        </div>
      </div>
    </div>
  );
}

// Separate Dhikr Card Component
type DhikrCardProps = {
  dhikr: Dhikr;
  currentCount: number;
  isComplete: boolean;
  circumference: number;
  strokeDashoffset: number;
  completionBump: number;
  ripples: Array<{ id: number; x: number; y: number }>;
  isPressed: boolean;
  tapButtonRef: React.RefObject<HTMLButtonElement | null>;
  onTap: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  onReset: () => void;
};

function DhikrCard({
  dhikr,
  currentCount,
  isComplete,
  circumference: _circumference,
  strokeDashoffset: _strokeDashoffset,
  completionBump,
  ripples,
  isPressed: _isPressed,
  tapButtonRef,
  onTap,
  onReset,
}: DhikrCardProps) {
  const [localIsPressed, setLocalIsPressed] = useState(false);
  return (
    <div className="relative flex w-full max-w-[380px] flex-col items-center my-5">
      {/* Arabic + Transliteration + Meaning - Now as a separate card */}
      <DhikrTextCard dhikr={dhikr} />

      {/* SUPER ROUNDED Count Display - MASSIVE Visual Impact with Labels Below */}
      <div className="relative mb-[50px] flex flex-col items-center top-8">
        {/* Main rounded-full container - Extra large and bold */}
        <div
          className="relative flex items-center justify-center gap-[14px] rounded-full border px-[34px] py-[24px]"
          style={{
            background: isComplete
              ? "radial-gradient(130% 130% at 25% 22%, rgba(251, 191, 36, 0.22) 0%, rgba(180,83,9,0.11) 55%, transparent 100%)"
              : "radial-gradient(150% 150% at 20% 18%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 65%, transparent 100%)",
            borderColor: isComplete
              ? "rgba(253,224,71,0.45)"
              : "rgba(255,255,255,0.18)",
            boxShadow: isComplete
              ? "inset 0 0 0 1px rgba(253,230,138,0.35), 0 16px 50px rgba(251,191,36,0.28), 0 0 0 5px rgba(253,230,138,0.08)"
              : "inset 0 1px 2px rgba(255,255,255,0.08), 0 14px 45px rgba(0,0,0,0.38), inset 0 -1px 3px rgba(0,0,0,0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* GIGANTIC Count Number */}
          <div className="relative flex flex-col items-center">
            <span
              className={
                "relative text-[96px] font-[100] tabular-nums tracking-[-0.05em] leading-[0.75] select-none transition-all " +
                (isComplete
                  ? "bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(253,230,138,0.95)]"
                  : "bg-gradient-to-b from-white via-[#fafafa] to-white/90 bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(0,0,0,0.52)]")
              }
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontVariantNumeric: "tabular-nums",
                textShadow: isComplete
                  ? "0 0 50px rgba(253,230,138,0.75), 0 0 80px rgba(251,191,36,0.4)"
                  : "0 8px 35px rgba(0,0,0,0.6)",
              }}
            >
              {currentCount}
              {/* inner radiant layer */}
              <span
                className="pointer-events-none absolute inset-0 select-none opacity-[0.65]"
                style={{
                  background:
                    "linear-gradient(175deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 35%, transparent 70%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mixBlendMode: "screen",
                }}
              >
                {currentCount}
              </span>
            </span>

            {/* COUNT LABEL - More prominent and colorful */}
            <div className="mt-[6px] flex flex-col items-center gap-[4px]">
              <div
                className="rounded-full border border-sky-400/25 bg-gradient-to-r from-sky-500/15 via-sky-400/20 to-sky-500/15 px-[10px] py-[1px] text-[8px] font-[600] uppercase tracking-[0.48em]"
                style={{
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.48em",
                  boxShadow:
                    "0 4px 16px rgba(56,189,248,0.25), inset 0 1px 1px rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  className="bg-gradient-to-r from-sky-200 via-sky-100 to-sky-200 bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  COUNT
                </span>
              </div>
              {/* decorative underline */}
              <div
                className="h-[2.5px] w-[42px] rounded-full bg-gradient-to-r from-sky-400/0 via-sky-300/90 to-sky-400/0"
                style={{ boxShadow: "0 0 10px rgba(56,189,248,0.5)" }}
              />
            </div>
          </div>

          {/* Sleek Golden Divider */}
          <div className="relative mx-[4px] flex h-[68px] w-[2px] items-center justify-center">
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(253,230,138,0.55) 15%, rgba(253,230,138,0.85) 50%, rgba(253,230,138,0.55) 85%, transparent 100%)",
                boxShadow:
                  "0 0 18px rgba(253,230,138,0.45), inset 0 0 4px rgba(255,255,255,0.2)",
              }}
            />
            {/* tiny sparkle dots */}
            <span
              className="pointer-events-none absolute -top-1 h-[3px] w-[3px] rounded-full bg-amber-200/80"
              style={{ boxShadow: "0 0 8px rgba(253,230,138,0.8)" }}
            />
            <span
              className="pointer-events-none absolute -bottom-1 h-[2.5px] w-[2.5px] rounded-full bg-amber-300/70"
              style={{ boxShadow: "0 0 6px rgba(253,230,138,0.7)" }}
            />
          </div>

          {/* MASSIVE TARGET Number - Amber Power Statement */}
          <div className="relative flex flex-col items-center">
            <span
              className="relative text-[52px] font-[400] tracking-[0.06em] leading-[0.85] tabular-nums select-none"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                background:
                  "linear-gradient(165deg, #fffbeb 0%, #fef3c7 25%, #fde68a 60%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 4px 18px rgba(251,191,36,0.55)) drop-shadow(0 0 35px rgba(253,230,138,0.35))",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {dhikr.target.toString().padStart(2, "0")}
              {/* luminous inner glow */}
              <span
                className="pointer-events-none absolute inset-0 select-none opacity-50 mix-blend-screen"
                style={{
                  background:
                    "linear-gradient(185deg, rgba(255,255,255,0.7) 0%, transparent 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {dhikr.target.toString().padStart(2, "0")}
              </span>
            </span>

            {/* TARGET LABEL MOVED BELOW - Rich amber styling */}
            <div className="mt-[7px] flex flex-col items-center gap-[5px]">
              <div
                className="rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-600/20 via-amber-500/25 to-amber-600/20 px-[10px] py-[3px] text-[8px] font-[700] uppercase tracking-[0.45em]"
                style={{
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.45em",
                  boxShadow:
                    "0 5px 20px rgba(245,158,11,0.35), inset 0 1px 2px rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TARGET
                </span>
              </div>
              {/* bold amber underline */}
              <div
                className="h-[3px] w-[48px] rounded-full bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0"
                style={{
                  boxShadow:
                    "0 0 14px rgba(251,191,36,0.7), 0 2px 8px rgba(245,158,11,0.4)",
                }}
              />
            </div>
          </div>

          {/* Enhanced completion effects */}
          {isComplete && (
            <>
              <span
                className="pointer-events-none absolute -right-3 -top-3 h-5 w-5 animate-pulse rounded-full bg-amber-300 blur-[2px]"
                style={{
                  boxShadow:
                    "0 0 28px rgba(253,230,138,1), 0 0 50px rgba(251,191,36,0.8)",
                }}
              />
              <span
                className="pointer-events-none absolute -bottom-3 -left-3 h-4 w-4 animate-pulse rounded-full bg-amber-200 blur-[1.5px]"
                style={{
                  animationDelay: "180ms",
                  boxShadow: "0 0 22px rgba(253,230,138,1)",
                }}
              />
              {/* expanded halo */}
              <span
                className="pointer-events-none absolute inset-[-8px] rounded-full"
                style={{
                  border: "1.5px solid rgba(253,230,138,0.32)",
                  boxShadow:
                    "inset 0 0 35px rgba(253,230,138,0.2), 0 0 40px rgba(251,191,36,0.28)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            </>
          )}
        </div>

        {/* STYLISH 0% COMPLETE - Islamic geometric elegance */}
        <div
          className="pointer-events-none relative z-20 mt-[22px] flex items-center justify-center gap-[0px] whitespace-nowrap rounded-2xl border border-amber-900/30 bg-gradient-to-br from-[#0f172a] via-[#0f1f3a] to-[#0e1a30] top-4 mb-4 px-[22px] py-[12px] backdrop-blur-[16px]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            boxShadow:
              "inset 0 1px 0 rgba(253,230,138,0.08), 0 10px 32px rgba(15,23,42,0.55), 0 0 0 1px rgba(251,191,36,0.12)",
            borderImage:
              "linear-gradient(145deg, rgba(251,146,60,0.35) 0%, rgba(180,83,9,0.22) 50%, rgba(251,146,60,0.35) 100%) 1",
          }}
        >
          {/* Percentage with calligraphic flourish */}
          <div className="relative flex items-baseline pl-5">
            <span
              className="relative text-[32px] font-[500] tabular-nums tracking-[-0.03em]"
              style={{
                background:
                  "linear-gradient(170deg, #fef3c7 0%, #fde68a 40%, #fcd34d 85%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 3px 12px rgba(251,191,36,0.45))",
                fontVariantNumeric: "tabular-nums",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {Math.round((currentCount / dhikr.target) * 100)}
              {/* Subtle radiance layer */}
              <span
                className="pointer-events-none absolute inset-0 select-none opacity-40 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(80% 60% at 45% 35%, rgba(255,255,255,0.55) 0%, transparent 70%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {Math.round((currentCount / dhikr.target) * 100)}
              </span>
            </span>
            <span
              className="relative -ml-[2px] text-[18px] font-[400] tracking-[0.15em]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(253,230,138,0.92)",
                textShadow: "0 2px 8px rgba(251,191,36,0.5)",
              }}
            >
              %{/* Decorative percentage accent dot */}
              <span
                className="pointer-events-none absolute -right-[4px] -top-[2px] h-[2.5px] w-[2.5px] rounded-full bg-amber-200/90"
                style={{ boxShadow: "0 0 6px rgba(253,230,138,0.85)" }}
              />
            </span>
          </div>

          {/* Ornate geometric divider - Islamic star pattern element */}
          <div className="relative mx-[3px] flex h-[45px] w-[1.8px] items-center justify-center">
            <svg viewBox="0 0 12 45" className="h-full w-full" fill="none">
              <defs>
                <linearGradient
                  id="dividerGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(251,146,60,0.0)" />
                  <stop offset="25%" stopColor="rgba(251,146,60,0.65)" />
                  <stop offset="50%" stopColor="rgba(253,230,138,0.9)" />
                  <stop offset="75%" stopColor="rgba(251,146,60,0.65)" />
                  <stop offset="100%" stopColor="rgba(251,146,60,0.0)" />
                </linearGradient>
              </defs>
              {/* Islamic geometric diamond - subtle and elegant */}
              <path
                d="M6 8 L9 15 L6 22 L3 15 Z"
                stroke="url(#dividerGrad)"
                strokeWidth="1.2"
                fill="rgba(251,146,60,0.08)"
              />
              <path
                d="M6 23 L9 30 L6 37 L3 30 Z"
                stroke="url(#dividerGrad)"
                strokeWidth="1.2"
                fill="rgba(251,146,60,0.08)"
              />
              <circle cx="6" cy="22.5" r="1.8" fill="rgba(253,230,138,0.35)" />
            </svg>
          </div>

          {/* COMPLETE word with elevated Islamic typography */}
          <div className="relative flex flex-col items-center">
            <span
              className="text-[13px] font-[600] uppercase tracking-[0.52em] mt-3"
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                background:
                  "linear-gradient(160deg, #fef3c7 0%, #fde68a 35%, #fcd34d 75%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.52em",
                filter: "drop-shadow(0 2px 9px rgba(251,191,36,0.48))",
                textShadow: "0 0 0 1px rgba(180,83,9,0.25) inset",
              }}
            >
              COMPLETE
              {/* Calligraphic underline flourish */}
              <svg
                className="pointer-events-none absolute -bottom-[10px] left-1/2 h-[8px] w-[88%] -translate-x-1/2"
                viewBox="0 0 90 8"
                fill="none"
              >
                <path
                  d="M4 4 C25 9, 65 9, 86 4"
                  stroke="url(#completeFlourish)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <defs>
                  <linearGradient
                    id="completeFlourish"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(251,146,60,0.0)" />
                    <stop offset="30%" stopColor="rgba(253,230,138,0.95)" />
                    <stop offset="70%" stopColor="rgba(251,146,60,0.85)" />
                    <stop offset="100%" stopColor="rgba(251,146,60,0.0)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            {/* Subtext in Arabic calligraphy style */}
            <span
              className="mt-[1px] text-[7px] uppercase tracking-[0.6em] opacity-70"
              style={{
                fontFamily: "'Amiri', Georgia, serif",
                color: "rgba(253,230,138,0.82)",
                letterSpacing: "0.6em",
              }}
            >
              تَمَّ
            </span>
          </div>

          {/* Progress indicator dots - Islamic geometric progression */}
          <div className="absolute -bottom-[11px] left-1/2 flex -translate-x-1/2 gap-[5px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-[3.5px] w-[3.5px] rounded-full transition-all duration-300"
                style={{
                  background:
                    (currentCount / dhikr.target) * 100 > (i + 1) * 33
                      ? "radial-gradient(circle, rgba(253,230,138,0.95) 0%, rgba(251,191,36,0.75) 100%)"
                      : "rgba(255,255,255,0.18)",
                  boxShadow:
                    (currentCount / dhikr.target) * 100 > (i + 1) * 33
                      ? "0 0 8px rgba(253,230,138,0.75)"
                      : "none",
                  transform:
                    (currentCount / dhikr.target) * 100 > (i + 1) * 33
                      ? "scale(1.2)"
                      : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Subtle crescent motif at bottom - Islamic symbol */}
          <div
            className="pointer-events-none absolute -bottom-[6px] left-1/2 h-[8px] w-[28px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(253,230,138,0.18) 0%, transparent 65%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transform: "translateX(-50%) scaleY(0.6)",
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div
          key={completionBump}
          className="mb-[6px] animate-[bounceIn_0.55s_cubic-bezier(.2,1.6,.3,1)_both] rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-[12px] tracking-[0.16em] text-amber-50 backdrop-blur-xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          MASHALLAH! COMPLETED!
        </div>
      )}

      {/* Tap Button Container - Premium Islamic ornamentation */}
      <div className="relative mt-[12px] flex h-[300px] w-[300px] items-center justify-center">
        {/* Premium Tap Button with sprinkler effect */}
        <button
          ref={tapButtonRef}
          onClick={onTap}
          disabled={isComplete}
          aria-label="Tap to count dhikr"
          className="relative h-[230px] w-[230px] select-none overflow-hidden rounded-full transition-transform active:scale-95 disabled:cursor-not-allowed"
          style={{
            background: isComplete
              ? "radial-gradient(circle at 30% 30%, #1e3a5f, #0a1a2f)"
              : "radial-gradient(circle at 30% 30%, #2a4a7a, #0f2a4a)",
            boxShadow: isComplete
              ? "0 10px 25px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)"
              : "0 15px 35px rgba(0,0,0,0.6), inset 0 2px 8px rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,215,0,0.2)",
          }}
        >
          {/* Animated gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/20" />

          {/* Islamic geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,215,0,0.15) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(255,215,0,0.15) 1px, transparent 1px)
        `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Sprinkler Ripple Effects - ENHANCED */}
          {ripples.map((r) => (
            <span
              key={r.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: r.x - 100,
                top: r.y - 100,
                width: 200,
                height: 200,
                background: `
            radial-gradient(circle at 30% 30%, 
              rgba(255, 223, 0, 0.9) 0%, 
              rgba(255, 200, 0, 0.6) 20%, 
              rgba(255, 170, 0, 0.3) 40%, 
              transparent 70%
            )
          `,
                boxShadow:
                  "0 0 50px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.5)",
                animation:
                  "sprinklerRipple 600ms cubic-bezier(0.1, 0.8, 0.3, 1.2) forwards",
                transformOrigin: "center",
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Additional sparkle effects on tap */}
          {ripples.slice(-3).map((r) => (
            <span
              key={`sparkle-${r.id}`}
              className="pointer-events-none absolute"
              style={{
                left: r.x - 15,
                top: r.y - 15,
                width: 30,
                height: 30,
                background: `
            radial-gradient(circle at 50% 50%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 230, 100, 0.8) 30%,
              transparent 70%
            )
          `,
                animation: "sparkle 500ms ease-out forwards",
                transformOrigin: "center",
                filter: "blur(0.5px)",
              }}
            />
          ))}

          {/* Content - Always visible with proper contrast */}
          {!isComplete ? (
            <div className="relative z-10 flex h-full flex-col items-center justify-center">
              {/* Main TAP text */}
              <span
                className="text-[42px] font-black uppercase tracking-[0.25em] drop-shadow-2xl"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "#fffbeb",
                  textShadow: `
              0 2px 10px rgba(0,0,0,0.5),
              0 0 20px rgba(255,215,0,0.5),
              2px 2px 0 rgba(0,0,0,0.3)
            `,
                }}
              >
                TAP
              </span>

              {/* Arabic script */}
              <span
                className="text-[16px] font-medium tracking-[0.3em]"
                style={{
                  fontFamily: "'Amiri', Georgia, serif",
                  color: "#fcd34d",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                ذِكْر
              </span>

              {/* Subtext */}
              <span
                className="absolute bottom-8 text-[9px] uppercase tracking-[0.4em]"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "#ffffffb3",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                to count
              </span>

              {/* Decorative dots */}
              <div className="absolute left-1/2 top-6 flex -translate-x-1/2 gap-1">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-amber-300/60"
                    style={{ boxShadow: "0 0 8px rgba(255,215,0,0.6)" }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Completion State */
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1">
              <span
                className="text-[18px] font-bold uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  color: "#fef3c7",
                  textShadow:
                    "0 2px 12px rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.4)",
                }}
              >
                مُكْتَمِل
              </span>
              <span
                className="text-[14px] font-semibold uppercase tracking-[0.25em]"
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#fde68a",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                COMPLETE
              </span>
              <div className="mt-2 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-amber-400"
                    style={{
                      animation: `pulseDot 1.5s ${i * 0.2}s infinite`,
                      boxShadow: "0 0 10px rgba(255,215,0,0.8)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Outer ring decoration */}
          <div
            className="absolute -inset-2 rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,215,0,0.2), transparent 70%)",
              filter: "blur(5px)",
            }}
          />

          {/* Inner border */}
          <div className="absolute inset-[3px] rounded-full border border-amber-500/20" />
        </button>
      </div>

      {/* Reset Button Card - Fancy styled container */}
      <div
        className="mt-[20px] flex w-[110%] items-center justify-between rounded-[1.2rem] border border-amber-200/15 bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-white/[0.03] px-[10px] py-[12px] backdrop-blur-xl"
        style={{
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Fancy Reset Button */}
        <button
          onClick={onReset}
          className="group relative overflow-hidden rounded-full border border-amber-300/30 bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-amber-500/15 px-[16px] py-[10px] text-[11px] font-[600] uppercase tracking-[0.26em] text-amber-100/90 transition-all duration-[200ms] hover:scale-[1.03] hover:border-amber-300/50 hover:from-amber-500/25 hover:via-amber-400/15 hover:to-amber-500/25 hover:text-amber-50 hover:shadow-[0_0_24px_rgba(251,191,36,0.35),inset_0_0_0_1px_rgba(253,230,138,0.2)] active:scale-[0.97]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {/* Subtle shimmer effect on hover */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[300ms] group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.15) 45%, transparent 55%)",
              transform: "translateX(-100%)",
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
          />
          <span className="relative z-10 flex items-center gap-[6px]">
            <svg
              className="h-[11px] w-[11px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </span>
        </button>

        {/* Colored hint text */}
        <div
          className="text-[10px] font-[500] uppercase tracking-[0.32em]"
          style={{
            background:
              "linear-gradient(90deg, rgba(56,189,248,0.75) 0%, rgba(253,230,138,0.85) 50%, rgba(251,146,60,0.75) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.3))",
          }}
        >
          <span className="text-white">PRESS</span> SPACE / ENTER{" "}
          <span className="text-white">TO COUNT</span>
        </div>
      </div>
    </div>
  );
}

export default function Tasbih() {
  const [currentDhikrId, setCurrentDhikrId] = useState(0);
  const [counts, setCounts] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem("tasbih-counts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return DHIKR_LIST.reduce((acc, d) => ({ ...acc, [d.id]: 0 }), {});
  });
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [completionBump, setCompletionBump] = useState(0);
  const rippleIdRef = useRef(0);
  const tapButtonRef = useRef<HTMLButtonElement>(null);

  const currentDhikr = DHIKR_LIST[currentDhikrId];
  const currentCount = counts[currentDhikrId] ?? 0;
  const isComplete = currentCount >= currentDhikr.target;
  const progress = Math.min(currentCount / currentDhikr.target, 1);
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - progress * circumference;

  const totalCount = Object.values(counts).reduce((sum, c) => sum + c, 0);

  useEffect(() => {
    localStorage.setItem("tasbih-counts", JSON.stringify(counts));
  }, [counts]);

  const incrementCount = useCallback(() => {
    if (isComplete) return;
    setCounts((prev) => ({
      ...prev,
      [currentDhikrId]: Math.min(
        (prev[currentDhikrId] ?? 0) + 1,
        currentDhikr.target,
      ),
    }));
    if (currentCount + 1 >= currentDhikr.target) {
      setCompletionBump((b) => b + 1);
      queueMicrotask(() => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([30, 20, 30]);
        }
      });
    }
  }, [currentDhikrId, currentCount, currentDhikr.target, isComplete]);

  const handleTap = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>,
    ) => {
      if (isComplete) return;

      const rect = tapButtonRef.current?.getBoundingClientRect();
      if (rect) {
        let clientX: number, clientY: number;
        if ("touches" in e) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const id = ++rippleIdRef.current;
        setRipples((r) => [...r, { id, x, y }]);
        setTimeout(() => {
          setRipples((r) => r.filter((rip) => rip.id !== id));
        }, 600);
      }

      incrementCount();
    },
    [incrementCount, isComplete],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsPressed(true);
        incrementCount();
        tapButtonRef.current?.focus();
      }
    },
    [incrementCount],
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      setIsPressed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleReset = useCallback(() => {
    setCounts((prev) => ({ ...prev, [currentDhikrId]: 0 }));
    setCompletionBump(0);
  }, [currentDhikrId]);

  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 8 + Math.random() * 82,
    size: 1 + Math.random() * 2.5, // Increased max size
    delay: Math.random() * 4, // More variation in delay
    duration: 1.5 + Math.random() * 3, // More variation in duration
    glowIntensity: 0.3 + Math.random() * 0.7, // Random glow intensity
    twinkleType: Math.floor(Math.random() * 3), // Different twinkle patterns
  }));

  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden antialiased"
      style={{
        background:
          "radial-gradient(1200px 900px at 70% 20%, #1a2d4a 0%, #0f1b2d 55%, #0d2235 100%)",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Twinkling Stars - Enhanced with multiple layers for realistic twinkling */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            {/* Main star core */}
            <span
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: 0.6,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.glowIntensity})`,
                animation:
                  star.twinkleType === 0
                    ? `softTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
                    : star.twinkleType === 1
                      ? `pulseTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
                      : `sparkleTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />

            {/* Outer glow layer for larger stars (randomly add to some stars) */}
            {star.size > 1.8 && (
              <span
                className="absolute rounded-full"
                style={{
                  width: `${star.size * 2.5}px`,
                  height: `${star.size * 2.5}px`,
                  left: `-${star.size * 0.75}px`,
                  top: `-${star.size * 0.75}px`,
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
                  animation: `glowPulse ${star.duration * 1.5}s ease-in-out ${star.delay}s infinite`,
                  opacity: 0.3,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ENHANCED REALISTIC MOON - bigger, more texture, subtle whitish glow */}
      <div
        className="pointer-events-none absolute right-64 top-32 z-10"
        aria-hidden="true"
      >
        {/* Soft outer white glow aura */}
        <div
          className="absolute -inset-[8px] rounded-full opacity-[0.45] blur-[6px]"
          style={{
            background:
              "radial-gradient(circle at 48% 42%, rgba(255, 255, 255, 0.28) 0%, rgba(253, 240, 210, 0.18) 35%, transparent 72%)",
          }}
        />
        {/* Secondary glow layer for more depth */}
        <div
          className="absolute -inset-[4px] rounded-full opacity-[0.38] blur-[3px]"
          style={{
            background:
              "radial-gradient(circle at 45% 40%, rgba(253, 230, 138, 0.32) 0%, rgba(251, 191, 36, 0.22) 48%, transparent 78%)",
          }}
        />
        {/* Main moon body - SIGNIFICANTLY BIGGER at 82px */}
        <div
          className="relative h-[110px] w-[110px] rounded-full animate-float"
          style={{
            background:
              // Rich realistic lunar surface with varied tones
              "radial-gradient(circle at 38% 35%, #fef9e7 0%, #fef3c7 28%, #fde68a 52%, #fcd34d 75%, #eab308 92%, #ca8a04 100%)",
            // Enhanced 3D depth with multiple shadow layers
            boxShadow: `
              inset -10px -8px 20px rgba(146, 64, 14, 0.46), 
              inset 5px 4px 12px rgba(254, 243, 199, 0.32), 
              0 0 38px rgba(251, 191, 36, 0.42),
              0 0 0 1px rgba(254, 243, 199, 0.18) inset
            `,
          }}
        >
          {/* PRIMARY DENT/CRATER - more pronounced and realistic */}
          <div
            className="absolute bottom-[20%] right-[24%] h-[26px] w-[26px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, rgba(180, 83, 9, 0.38) 0%, rgba(146, 64, 14, 0.28) 62%, transparent 85%)",
              boxShadow:
                "inset 4px 3px 8px rgba(120, 53, 15, 0.44), 0 0 0 1px rgba(160, 70, 20, 0.22) inset",
              transform: "rotate(-18deg) scale(1.05)",
              filter: "blur(0.3px)",
            }}
          />
          {/* Secondary smaller crater for texture */}
          <div
            className="absolute left-[35%] top-[28%] h-[14px] w-[14px] rounded-full opacity-[0.65]"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(160, 70, 20, 0.32) 0%, rgba(120, 50, 15, 0.22) 58%, transparent 82%)",
              boxShadow: "inset 2px 1.5px 4px rgba(100, 40, 10, 0.35)",
            }}
          />
          {/* Tertiary tiny crater marks */}
          <div
            className="absolute right-[38%] top-[22%] h-[6px] w-[6px] rounded-full bg-amber-900/28"
            style={{ boxShadow: "inset 1px 1px 2px rgba(90, 35, 8, 0.32)" }}
          />
          <div className="absolute bottom-[30%] left-[25%] h-[5px] w-[5px] rounded-full bg-amber-800/24" />
          <div className="absolute left-[20%] top-[55%] h-[4px] w-[4px] rounded-full bg-amber-900/22" />
          {/* Enhanced surface texture - subtle marbling effect */}
          <div
            className="pointer-events-none absolute inset-[3px] rounded-full opacity-[0.38]"
            style={{
              background:
                "radial-gradient(ellipse 45% 38% at 42% 40%, rgba(254, 249, 222, 0.28) 0%, transparent 65%), " +
                "radial-gradient(ellipse 32% 28% at 68% 62%, rgba(254, 243, 199, 0.22) 0%, transparent 58%)",
              mixBlendMode: "soft-light",
              filter: "blur(0.8px)",
            }}
          />
          {/* Subtle highlight rim for 3D pop */}
          <div
            className="pointer-events-none absolute inset-[1.5px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 44% 40%, rgba(255, 254, 248, 0.32) 0%, transparent 55%)",
              mixBlendMode: "screen",
              opacity: 0.85,
            }}
          />
          {/* Tiny surface sparkles for realistic lunar texture */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = ((i * 45 + 12) * Math.PI) / 180;
            const radius = 28 + Math.random() * 8;
            const x = 41 + radius * Math.cos(angle);
            const y = 41 + radius * Math.sin(angle);
            return (
              <span
                key={i}
                className="absolute h-[1.2px] w-[1.2px] rounded-full bg-amber-50/70"
                style={{
                  left: x,
                  top: y,
                  boxShadow: "0 0 3px rgba(254, 243, 199, 0.85)",
                  opacity: 0.4 + Math.random() * 0.3,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 mt-6 flex w-full max-w-[420px] items-center justify-center px-5">
        <div className="flex items-baseline gap-2">
          <span
            className="text-[28px] font-[600] tracking-[0.02em] text-white"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
          >
            Ramadan Kareem
          </span>
          <span className="text-xl font-light text-amber-200/90">✦</span>
        </div>
      </header>

      {/* Dhikr Selector (pill buttons) */}
      <section className="relative z-10 mt-4 flex w-full max-w-[420px] flex-wrap justify-center gap-2 px-4">
        {DHIKR_LIST.map((d) => (
          <button
            key={d.id}
            onClick={() => setCurrentDhikrId(d.id)}
            className={
              "rounded-full border px-[14px] py-[8px] text-[12.5px] tracking-[0.06em] transition-all " +
              (currentDhikrId === d.id
                ? "border-amber-300/40 bg-amber-300/15 text-amber-50 shadow-[inset_0_0_0_1px_rgba(253,230,138,0.25)] backdrop-blur-xl"
                : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06] backdrop-blur-lg")
            }
            style={{ fontFamily: "Georgia, serif" }}
          >
            {d.name}
          </button>
        ))}
      </section>

      {/* Main Card with Glassmorphism - Now using separate DhikrCard component */}
      <main className="relative z-10 flex w-full grow items-center justify-center px-5 py-6">
        <DhikrCard
          dhikr={currentDhikr}
          currentCount={currentCount}
          isComplete={isComplete}
          circumference={circumference}
          strokeDashoffset={strokeDashoffset}
          completionBump={completionBump}
          ripples={ripples}
          isPressed={isPressed}
          tapButtonRef={tapButtonRef}
          onTap={handleTap}
          onReset={handleReset}
        />
      </main>

      {/* Footer Arabic */}
      <footer className="relative z-10 mb-6 select-none text-center">
        <p
          className="text-[22px] tracking-[0.06em] text-amber-100/85"
          style={{ fontFamily: "'Amiri', Georgia, serif", fontWeight: 400 }}
        >
          رَمَضَان مُبَارَك
        </p>
        {/* Tiny credit line */}
        <div className="mt-2 text-[10px] font-light tracking-[0.2em] text-white/30">
          made with love by — Rahima Akter❤️
        </div>
      </footer>

      {/* Keyframes for animations */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Playfair+Display:wght@800;900&display=swap');
        
        /* Enhanced star twinkling animations */
        @keyframes softTwinkle {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(0.9);
            box-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
          }
          25% { 
            opacity: 0.9; 
            transform: scale(1.2);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.3);
            box-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 215, 0, 0.5);
          }
          75% { 
            opacity: 0.7; 
            transform: scale(1.1);
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          }
        }
        
        @keyframes pulseTwinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8);
            box-shadow: 0 0 2px rgba(255, 255, 255, 0.2);
          }
          30% { 
            opacity: 0.8; 
            transform: scale(1.3);
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
          }
          60% { 
            opacity: 1; 
            transform: scale(1.5);
            box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 215, 0, 0.4);
          }
          80% { 
            opacity: 0.5; 
            transform: scale(1);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
        }
        
        @keyframes sparkleTwinkle {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
          }
          20% { 
            opacity: 1; 
            transform: scale(1.4) rotate(5deg);
            box-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 25px rgba(255, 215, 0, 0.5);
          }
          40% { 
            opacity: 0.8; 
            transform: scale(1.1) rotate(-3deg);
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
          }
          60% { 
            opacity: 1; 
            transform: scale(1.6) rotate(8deg);
            box-shadow: 0 0 18px rgba(255, 255, 255, 1), 0 0 35px rgba(255, 215, 0, 0.6);
          }
          80% { 
            opacity: 0.6; 
            transform: scale(1.2) rotate(-2deg);
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(0.8);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.2);
          }
        }
        
        /* Keep all your existing animations */
        @keyframes ripple {
          0% { opacity: .8; transform: scale(.25); }
          100% { opacity: 0; transform: scale(1.6); }
        }
        @keyframes bounceIn {
          0% { transform: scale(.86); opacity: .0; }
          60% { transform: scale(1.06); opacity: 1; }
          80% { transform: scale(.985); }
          100% { transform: scale(1); }
        }
        @keyframes tasbihRipple {
          0% { opacity: 0.9; transform: scale(0.18); }
          45% { opacity: 0.65; transform: scale(0.72); }
          100% { opacity: 0; transform: scale(1.45); }
        }
        @keyframes sprinklerRipple {
          0% { opacity: 0.95; transform: scale(0.15); }
          30% { opacity: 0.75; transform: scale(0.55); }
          70% { opacity: 0.4; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.35); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes sprinklerRipple {
            0% {
              opacity: 1;
              transform: scale(0.1);
              filter: blur(0px);
            }
            30% {
              opacity: 0.9;
              transform: scale(0.6);
              filter: blur(2px);
            }
            60% {
              opacity: 0.5;
              transform: scale(1.1);
              filter: blur(4px);
            }
            100% {
              opacity: 0;
              transform: scale(1.8);
              filter: blur(8px);
            }
          }

          @keyframes sparkle {
            0% {
              opacity: 1;
              transform: scale(0.2) rotate(0deg);
              filter: blur(0px);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.2) rotate(180deg);
              filter: blur(1px);
            }
            100% {
              opacity: 0;
              transform: scale(2) rotate(360deg);
              filter: blur(3px);
            }
          }

          @keyframes pulseDot {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.3);
            }
          }  

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
      `}
      </style>
    </div>
  );
}
