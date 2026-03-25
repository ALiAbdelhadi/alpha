import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  })

  gsap.config({
    nullTargetWarn: false,
    force3D: true,
  })

  // Matches MOTION.ease.smooth - keep in sync with lib/motion/config.ts
  gsap.defaults({
    ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    overwrite: "auto",
  })
}

export { gsap, ScrollTrigger }

