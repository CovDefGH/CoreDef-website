import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type FeatureRowProps = {
  heading: string;
  body: string;
  bullets?: string[];
  image: { src: string; alt: string };
  /** Which side the image sits on at md+. Alternate down a page for rhythm. */
  imageSide?: "left" | "right";
};

// Use-case block: image + explanatory copy, alternating sides. This is the
// "use case with a picture" pattern (simple, professional — no fancy panels).
export function FeatureRow({
  heading,
  body,
  bullets,
  image,
  imageSide = "right",
}: FeatureRowProps) {
  return (
    <Reveal
      as="section"
      className="grid items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16"
    >
      <div className={`md:col-span-5 ${imageSide === "left" ? "md:order-2" : ""}`}>
        <h2 className="text-ink text-3xl font-bold md:text-4xl">{heading}</h2>
        <p className="text-ink-muted mt-5 text-justify text-lg leading-relaxed">
          {body}
        </p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="text-ink-muted flex gap-3 text-base">
                <Check
                  aria-hidden
                  size={20}
                  className="text-primary mt-0.5 shrink-0"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={`border-line relative aspect-video overflow-hidden border md:col-span-7 ${
          imageSide === "left" ? "md:order-1" : ""
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}
