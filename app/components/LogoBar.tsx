import FadeIn from "./FadeIn";

const LOGOS = [
  { name: "Klaviyo", slug: "klaviyo" },
  { name: "Shopify", slug: "shopify" },
  { name: "Meta", slug: "meta" },
  { name: "Google Ads", slug: "googleads" },
  { name: "Figma", slug: "figma" },
  { name: "Notion", slug: "notion" },
  { name: "Make", slug: "make" },
  { name: "Zapier", slug: "zapier" },
  { name: "Vercel", slug: "vercel" },
  { name: "GitHub", slug: "github" },
  { name: "Google Analytics", slug: "googleanalytics" },
  { name: "ChatGPT", slug: "openai" },
  { name: "Claude", slug: "anthropic" },
  { name: "Google AI Studio", slug: "googlegemini" },
];

const doubled = [...LOGOS, ...LOGOS];

export default function LogoBar() {
  return (
    <section className="border-t border-border py-14 overflow-hidden">
      <div className="container-site mb-10">
        <FadeIn>
          <p className="section-label">Strumenti che usiamo</p>
        </FadeIn>
      </div>

      {/* Full-width scrolling strip */}
      <div className="logo-fade-mask overflow-hidden">
        <div className="flex gap-14 marquee-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              title={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}`}
                alt={logo.name}
                width={36}
                height={36}
                className="logo-img h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
