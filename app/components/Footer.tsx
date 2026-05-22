import Link from "next/link";

const NAV_LINKS = [
  { href: "#servizi", label: "Servizi" },
  { href: "#chi-sono", label: "Chi Sono" },
  { href: "#contatti", label: "Contatti" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1C1C1C] px-6 py-10 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold text-white hover:text-accent transition-colors duration-200"
          >
            Reach Media
          </Link>

          {/* Nav */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#555555] hover:text-[#BBBBBB] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#3D3D3D]">
            © {year} Reach Media. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
