"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KLAVIYO_COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY ?? "VhAfyx";

/**
 * Scripts that set non-essential cookies — GA4 (analytics) and Klaviyo onsite
 * tracking (marketing) — load only after "Accetta tutti", as the cookie
 * policy states. The quiz and newsletter call Klaviyo's API directly and do
 * not depend on klaviyo.js.
 */
export default function ConsentScripts() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let wasAllowed = false;
    const sync = () => {
      const ok = localStorage.getItem("cookie-consent") === "all";
      if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !ok;
      // Consent withdrawn after scripts ran: drop Klaviyo's cookie and reload
      // so nothing keeps tracking in this tab.
      if (wasAllowed && !ok) {
        document.cookie = "__kla_id=; Max-Age=0; path=/";
        window.location.reload();
        return;
      }
      wasAllowed = ok;
      setAllowed(ok);
    };
    sync();
    window.addEventListener("rm_cookie_choice", sync);
    return () => window.removeEventListener("rm_cookie_choice", sync);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${KLAVIYO_COMPANY_ID}`}
        strategy="afterInteractive"
      />
      {GA_ID && (
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
      )}
    </>
  );
}
