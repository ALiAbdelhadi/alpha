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

  gsap.defaults({
    ease: "power3.out",
    overwrite: "auto", 
  })
}

export { gsap, ScrollTrigger }

