import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import { ReactNode } from "react";

type Props = {
  title: string;
  breadcrumbLabel: string;
  children: ReactNode;
};

export default function LegalLayout({ title, breadcrumbLabel, children }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24 bg-bg">
        <div className="pt-14 md:pt-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]} />
        </div>
        <div className="container-site pt-10 md:pt-14">
          <div className="max-w-3xl">
            <h1
              className="font-display tracking-display text-primary mb-14 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {title}
            </h1>

            <div className="space-y-10 text-secondary text-sm leading-relaxed [&_h2]:font-sans [&_h2]:text-xs [&_h2]:text-primary [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-primary [&_a]:underline [&_a]:hover:text-primary [&_a]:transition-colors">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
