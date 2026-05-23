import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy di Reach Media. Come raccogliamo e utilizziamo i tuoi dati personali nel rispetto del GDPR.",
  alternates: {
    canonical: "https://reachmedia.it/privacy-policy",
  },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="PRIVACY POLICY">
      <h2>Titolare del trattamento</h2>
      <p>
        Ardit Ndoja, freelance operante con il nome commerciale{" "}
        <strong>Reach Media</strong>
        <br />
        Sede: Treviso (TV), Italia
        <br />
        P.IVA: IT12345670151
        <br />
        Email:{" "}
        <a href="mailto:info@reachmedia.it">info@reachmedia.it</a>
      </p>

      <h2>Dati raccolti</h2>
      <p>
        Tramite il form di contatto e il form di download raccogliamo: nome,
        indirizzo email. I dati sono usati esclusivamente per rispondere alle
        richieste e per inviare la risorsa richiesta.
      </p>

      <h2>Base giuridica</h2>
      <p>
        Consenso esplicito dell&apos;utente (art. 6 par. 1 lett. a GDPR).
      </p>

      <h2>Conservazione</h2>
      <p>
        I dati sono conservati fino alla revoca del consenso o per un massimo
        di 24 mesi dall&apos;ultimo contatto.
      </p>

      <h2>Terze parti</h2>
      <p>
        I dati possono essere condivisi con <strong>Klaviyo Inc.</strong>{" "}
        (piattaforma email marketing, server USA, con garanzie adeguate tramite
        Standard Contractual Clauses) e <strong>Vercel Inc.</strong> (hosting,
        server USA, stesse garanzie).
      </p>

      <h2>Diritti dell&apos;utente</h2>
      <p>
        Accesso, rettifica, cancellazione, portabilità, opposizione. Richieste
        via email a{" "}
        <a href="mailto:info@reachmedia.it">info@reachmedia.it</a>. Diritto di
        reclamo al Garante Privacy italiano (
        <a
          href="https://www.garanteprivacy.it"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.garanteprivacy.it
        </a>
        ).
      </p>

      <h2>Cookie</h2>
      <p>
        Vedi{" "}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>
    </LegalLayout>
  );
}
