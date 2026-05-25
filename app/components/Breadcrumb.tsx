import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string; // omit for the current (last) page
};

type Props = {
  items: BreadcrumbItem[];
};

/**
 * Breadcrumb bar — renders a visual nav + JSON-LD BreadcrumbList schema.
 * Place this as the first child inside <main>, wrapped in a
 * `pt-14 md:pt-16` div to clear the fixed navbar.
 */
export default function Breadcrumb({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://reachmedia.it${item.href === "/" ? "" : item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-border">
        <div className="container-site py-3">
          <ol className="flex items-center gap-2 flex-wrap">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-xs select-none" style={{ color: "#555555" }}>
                    /
                  </span>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-xs text-secondary hover:text-primary transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-xs"
                    style={{ color: "#666666" }}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
