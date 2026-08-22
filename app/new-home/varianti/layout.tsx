import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Varianti link — reachmedia.it",
  robots: { index: false, follow: false },
};

export default function VariantiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
