import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy di Reach Media. Scopri quali cookie usiamo e come gestire le tue preferenze.",
  alternates: {
    canonical: "https://reachmedia.it/cookie-policy",
  },
  robots: { index: false, follow: false },
};

export default function CookiePolicy() {
  return (
    <LegalLayout title="COOKIE POLICY" breadcrumbLabel="Cookie Policy">
      <p>
        Questo sito usa cookie tecnici necessari al funzionamento e cookie
        analitici (se accettati) per migliorare il servizio.
      </p>

      <h2>Cookie tecnici (sempre attivi)</h2>
      <ul className="list-none space-y-2 mt-3">
        <li>Sessione utente</li>
        <li>Preferenze cookie</li>
      </ul>

      <h2>Cookie analitici (solo se accettati)</h2>
      <ul className="list-none space-y-2 mt-3">
        <li>
          Google Analytics / Vercel Analytics: statistiche anonime di
          navigazione
        </li>
      </ul>

      <h2>Come gestire i cookie</h2>
      <p>
        Puoi modificare le preferenze in qualsiasi momento cliccando su
        &ldquo;Gestisci preferenze&rdquo; nel banner cookie o nelle impostazioni
        del browser.
      </p>
    </LegalLayout>
  );
}
