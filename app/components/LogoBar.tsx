import FadeIn from "./FadeIn";

type LogoItem = {
  name: string;
  url: string;
  label?: string;
};

const LOGOS: LogoItem[] = [
  { name: "Klaviyo", url: "/logos/klaviyo.svg" },
  { name: "Shopify", url: "https://cdn.simpleicons.org/shopify" },
  { name: "Meta", url: "https://cdn.simpleicons.org/meta" },
  { name: "Google Ads", url: "https://cdn.simpleicons.org/googleads" },
  { name: "Figma", url: "https://cdn.simpleicons.org/figma" },
  { name: "Notion", url: "https://cdn.simpleicons.org/notion" },
  { name: "Make", url: "https://cdn.simpleicons.org/make" },
  { name: "Zapier", url: "https://cdn.simpleicons.org/zapier" },
  { name: "Vercel", url: "https://cdn.simpleicons.org/vercel" },
  { name: "GitHub", url: "https://cdn.simpleicons.org/github" },
  {
    name: "Google Analytics",
    url: "https://cdn.simpleicons.org/googleanalytics",
  },
  { name: "ChatGPT", url: "/logos/openai.svg" },
  { name: "Claude", url: "/logos/anthropic.svg" },
  { name: "Google AI Studio", url: "/logos/google-ai-studio.svg" },
];

const doubled = [...LOGOS, ...LOGOS];

export default function LogoBar() {
  return (
    <section className="border-t border-border py-10 md:py-14 overflow-hidden">
      <div className="container-site mb-10">
        <FadeIn>
          <p className="section-label">Strumenti che usiamo</p>
        </FadeIn>
      </div>

      {/* Full-width scrolling strip */}
      <div className="logo-fade-mask overflow-hidden">
        <div className="flex items-center gap-14 marquee-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center gap-1"
              title={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.url}
                alt={logo.name}
                width={36}
                height={36}
                className="logo-img h-8 w-auto"
              />
              {logo.label && (
                <span className="font-display tracking-display text-[7px] text-secondary opacity-60 whitespace-nowrap">
                  {logo.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
