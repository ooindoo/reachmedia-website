import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cream border-t border-border py-8">
      <div className="container-site flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-muted font-light">
          &copy; {year} Reach Media
        </p>
        <Link
          href="/privacy"
          className="text-xs text-muted hover:text-ink transition-colors duration-200 font-light"
        >
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
