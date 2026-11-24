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
    <LegalLayout title="Cookie Policy" breadcrumbLabel="Cookie Policy">
      <p>
        Questo sito usa cookie tecnici necessari al funzionamento e, solo se
        accettati, cookie analitici e di marketing.
      </p>

      <h2>Cookie tecnici (sempre attivi)</h2>
      <ul className="list-none space-y-2 mt-3">
        <li>Sessione utente</li>
        <li>Preferenze cookie</li>
      </ul>

      <h2>Cookie analitici (solo se accettati)</h2>
      <ul className="list-none space-y-2 mt-3">
        <li>Google Analytics: statistiche anonime di navigazione</li>
      </ul>

      <h2>Cookie di marketing (solo se accettati)</h2>
      <ul className="list-none space-y-2 mt-3">
        <li>
          Klaviyo: riconosce chi è già iscritto alle nostre email per
          personalizzare le comunicazioni in base alle pagine visitate
        </li>
      </ul>

      <h2>Statistiche senza cookie</h2>
      <p>
        Vercel Analytics raccoglie statistiche aggregate e anonime sulle
        visite senza usare cookie e senza identificare chi naviga.
      </p>

      <h2>Come gestire i cookie</h2>
      <p>
        Puoi modificare le preferenze in qualsiasi momento cliccando su
        &ldquo;Preferenze cookie&rdquo; in fondo a ogni pagina, oppure dalle
        impostazioni del browser.
      </p>
    </LegalLayout>
  );
}
