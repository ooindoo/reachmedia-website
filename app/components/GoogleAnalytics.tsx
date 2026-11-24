"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GA4 loads only after the visitor accepts analytics cookies, as the cookie
 * policy promises. Withdrawing consent disables tracking right away.
 */
export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      const ok = localStorage.getItem("cookie-consent") === "all";
      if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !ok;
      setAllowed(ok);
    };
    sync();
    window.addEventListener("rm_cookie_choice", sync);
    return () => window.removeEventListener("rm_cookie_choice", sync);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`}
      </Script>
    </>
  );
}
