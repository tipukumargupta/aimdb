"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Orbit } from "@/components/motion/Orbit";
import { cn } from "@/lib/cn";
import founder from "@/public/images/founder.png";

// The orbit is drawn twice and split along its major axis: the far arc renders behind the
// founder and the near arc in front, so the ring wraps around them. Each half is drawn once,
// so the stroke keeps one even brightness. The mask angle is 180° + ORBIT_TILT; keep them in step.
const ORBIT_TILT = -14;
const orbitClass =
  "pointer-events-none absolute left-1/2 top-[56%] w-[230%] max-w-none -translate-x-1/2 -translate-y-1/2";
const orbitBack = "[mask-image:linear-gradient(166deg,black_50%,transparent_50%)]";
const orbitFront = "[mask-image:linear-gradient(166deg,transparent_50%,black_50%)]";

/**
 * The founder cut-out standing in a breathing copper glow, with the logo's orbit around them.
 * From lg up it fills the height of its grid area at full length; below that it is an
 * upper-body crop that fades out, so the face stays large on phones.
 */
export function HeroVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-none", className)}>
      <div className="relative mx-auto aspect-[443/760] w-full lg:absolute lg:top-0 lg:left-1/2 lg:aspect-[443/1268] lg:h-full lg:w-auto lg:-translate-x-1/2">
        <motion.div
          aria-hidden
          className="bg-glow-copper absolute left-1/2 top-[34%] aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2"
          animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <Orbit tilt={ORBIT_TILT} className={cn(orbitClass, orbitBack)} />

        {/* Floor light and contact shadow, so the founder stands on the floor rather than floating. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 hidden h-[7%] w-[190%] -translate-x-1/2 translate-y-1/2 bg-[radial-gradient(closest-side,rgb(200_120_63/0.38),transparent)] lg:block"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 hidden h-[2.5%] w-[115%] -translate-x-1/2 translate-y-[40%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.75),transparent)] lg:block"
        />

        {/* The fade mask is inset outwards (and padded back) so it doesn't clip the rim glow. */}
        <div className="absolute -inset-x-10 -top-10 bottom-0 px-10 pt-10 [mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:inset-0 lg:p-0 lg:[mask-image:none]">
          <div className="relative size-full">
            <Image
              src={founder}
              alt="Founder of AIDMBD International Ltd"
              fill
              fetchPriority="high"
              sizes="(min-width: 1024px) 18rem, (min-width: 640px) 19rem, 17rem"
              className="object-cover object-top [filter:drop-shadow(0_0_1px_rgb(243_185_138/0.55))_drop-shadow(0_0_28px_rgb(200_120_63/0.35))]"
            />
          </div>
        </div>

        <Orbit tilt={ORBIT_TILT} className={cn(orbitClass, orbitFront)} />
      </div>
    </div>
  );
}
