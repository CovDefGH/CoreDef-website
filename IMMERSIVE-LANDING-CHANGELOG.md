# Immersive Landing Page - Changelog

This document summarizes all the features, design upgrades, and performance optimizations implemented in the `feature-immersive-landing` branch.

## 1. Design & Typography System
- **Global Typography Upgrade:** Switched the primary typeface to Google's **Outfit** font for a much more premium, modern, and tech-forward aesthetic.
- **Symmetric Industries Section:** Completely re-designed the Industries section header to be perfectly centered and symmetrical, establishing strong visual balance and hierarchy.
- **Interactive Enhancements:** Made the individual Industry cards fully clickable links that route the user to `/industries`, improving UX and navigability.
- **Button Styling:** Refined call-to-action buttons with modern spacing and premium ghost/outline variants.

## 2. Immersive Hero Implementation (Apple-Style)
- **ScrollTrigger Architecture:** Transformed the static hero section into a dynamic, scroll-driven sequence using GSAP's `ScrollTrigger`.
- **Canvas Video Scrubbing:** Replaced the standard HTML5 `<video>` element with a high-performance `<canvas>` image sequence scrubber. This allows the video to be scrubbed backward and forward frame-by-frame perfectly in sync with the user's scroll position.
- **Lake House Assets:** Extracted 40 maximum-quality (1080p) JPEG frames directly from the `watts-bar-hero.mp4` video (the Lake House sequence).
- **Parallax Zoom & Fade:** As the user scrolls down, the hero text slowly fades out while the canvas smoothly zooms in (scale `1.13x`). 
- **Extended Timeline:** Tuned the ScrollTrigger timeline (`end: "bottom top"`) so the scrub and zoom animations continue fluidly until the hero section is entirely covered by the next chapter.

## 3. Extreme Performance Micro-Optimizations
- **Lenis Momentum Scrolling:** Installed `@studio-freight/lenis` and wrapped the entire application in a smooth scroll provider. This introduces luxurious, Awwwards-style momentum physics to the whole page, entirely eliminating the rigid "chunkiness" of standard mouse wheels.
- **Zero-Latency GSAP Sync:** By pairing Lenis with GSAP (`scrub: true`), the canvas scrubber now locks instantly and flawlessly onto the smoothed virtual coordinates, resulting in zero input lag.
- **Asynchronous Frame Decoding:** Implemented `img.decode()` during the preload phase. This forces the browser to use background Web Workers to uncompress the heavy high-res frames *off* the main thread, keeping 60fps scrolling perfectly stutter-free.
- **Raw GPU Rendering Speed:** Disabled expensive native canvas smoothing (`ctx.imageSmoothingEnabled = false`) and added `transform-gpu` to force the hardware to handle the heavy lifting of rendering 40 frames a second.
- **Cache Busting:** Implemented aggressive cache-busting query parameters (`?v=3`) to prevent Safari and Chrome from aggressively serving stale frames.
