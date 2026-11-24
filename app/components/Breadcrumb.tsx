import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string; // omit for the current (last) page
};

type Props = {
  items: BreadcrumbItem[];
};

/**
 * Breadcrumb trail — renders a visual nav + JSON-LD BreadcrumbList schema.
 * Place it at the top of the page content, under the sticky header.
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
      <nav aria-label="Breadcrumb" className="container-site pt-10">
        <ol className="flex items-center gap-2 flex-wrap font-mono text-xs">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 min-w-0">
              {i > 0 && <span className="text-dim select-none" aria-hidden="true">/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-secondary hover:text-primary transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-dim truncate max-w-[60vw]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
