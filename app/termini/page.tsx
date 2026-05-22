import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Termini di Servizio | Reach Media",
};

export default function Termini() {
  return (
    <LegalLayout title="TERMINI DI SERVIZIO">
      <p>
        Il sito reachmedia.it è gestito da{" "}
        <strong>Ardit [COGNOME]</strong>, freelance con P.IVA [TUA_PIVA],
        operante con il nome commerciale Reach Media.
      </p>

      <h2>Proprietà intellettuale</h2>
      <p>
        I contenuti del sito (testi, struttura, risorse scaricabili) sono di
        proprietà di Reach Media. È vietata la riproduzione senza
        autorizzazione scritta.
      </p>

      <h2>Limitazione di responsabilità</h2>
      <p>
        Le informazioni sul sito hanno carattere informativo e non costituiscono
        offerta contrattuale. I servizi sono regolati da contratti separati.
      </p>

      <h2>Legge applicabile e foro competente</h2>
      <p>
        Legge applicabile: legge italiana. Foro competente: Tribunale di
        Treviso.
      </p>
    </LegalLayout>
  );
}
