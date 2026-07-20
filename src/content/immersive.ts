export type ImageSequence = {
  alt: string;
  frameCount: number;
  height: number;
  poster: string;
  width: number;
  frames: string[];
};

// Bright art-directed fallback for the landing-page hero. Populate `frames`
// only with the approved V01 WebP/AVIF sequence; an empty array intentionally
// preserves this poster rather than falling back to the earlier dark footage.
export const immersiveHeroSequence: ImageSequence = {
  alt: "Nuclear power plant cooling towers releasing steam against a blue sky.",
  frameCount: 0,
  height: 540,
  poster: "/immersive/hero/hero-v2.jpg",
  width: 960,
  frames: [],
};
