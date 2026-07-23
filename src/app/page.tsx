import { Outfit } from "next/font/google";
import { ImmersiveHome } from "@/components/immersive/ImmersiveHome";
import "./immersive.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${outfit.variable} immersive-font-outfit`}>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }",
        }}
      />
      <ImmersiveHome />
    </div>
  );
}
