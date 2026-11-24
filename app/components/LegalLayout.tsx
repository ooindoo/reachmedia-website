import SiteHeader from "./site/SiteHeader";
import SiteFooter from "./site/SiteFooter";
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
      <SiteHeader />
      <main className="min-h-screen">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]} />
        <div className="container-site pt-8">
          <h1 className="text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] tracking-[-0.045em] font-semibold mb-10 text-balance">
            {title}
          </h1>
          <div className="tile max-w-3xl p-6 md:p-10 text-secondary text-[0.9375rem] leading-relaxed space-y-4 [&_h2]:text-primary [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:pt-6 [&_h2:first-child]:pt-0 [&_strong]:text-primary [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-border-mid hover:[&_a]:decoration-primary [&_ul]:space-y-2 [&_li]:pl-4 [&_li]:relative [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:rounded-[2px] [&_li]:before:bg-accent [&_li]:before:outline [&_li]:before:outline-1 [&_li]:before:outline-primary/20">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
