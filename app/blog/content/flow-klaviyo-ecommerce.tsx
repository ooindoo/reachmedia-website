import Link from "next/link";

export default function FlowKlaviyoEcommerce() {
  return (
    <>
      <p>
        I flow Klaviyo sono il motivo per cui le agenzie email marketing parlano di "revenue passiva".
        Non perché non richiedano lavoro (costruirli bene richiede strategia, copywriting e testing),
        ma perché una volta attivi, girano in autonomia. Ogni carrello abbandonato, ogni nuovo iscritto,
        ogni cliente silenzioso da sei mesi: tutti ricevono la comunicazione giusta al momento giusto,
        senza che tu debba fare nulla.
      </p>
      <p>
        Nei brand strutturati su Klaviyo, i flow contribuiscono tra il 40% e il 60% di tutta la revenue
        email. Eppure la maggior parte degli e-commerce italiani ne ha al massimo uno attivo, spesso
        incompleto. Questa guida copre i cinque flow che dovresti avere operativi prima di pensare a
        qualsiasi altra ottimizzazione.
      </p>

      <h2>Flow 1: Welcome Series</h2>
      <p>
        Il flusso di benvenuto è il punto di ingresso nel tuo ecosistema email. Parte quando qualcuno
        si iscrive alla lista senza aver ancora acquistato. Questo è il momento di massima
        attenzione: l&apos;utente è curioso, ha appena alzato la mano dicendo "sono interessato".
      </p>
      <p>
        Una welcome series efficace non è solo un&apos;email di conferma iscrizione. È una sequenza di
        3-5 email distribuite su 7-10 giorni che fa tre cose: introduce il brand con una voce autentica,
        dimostra la proposta di valore con prove concrete, e costruisce la fiducia necessaria per il
        primo acquisto.
      </p>
      <p>
        Struttura consigliata:
      </p>
      <ul>
        <li><strong>Email 1 (ora 1)</strong>: benvenuto nel brand, storia e perché siete diversi</li>
        <li><strong>Email 2 (giorno 2)</strong>: prodotto o categoria flagship con social proof</li>
        <li><strong>Email 3 (giorno 4)</strong>: contenuto di valore (guida, tips, educational)</li>
        <li><strong>Email 4 (giorno 7)</strong>: offerta o incentivo per il primo acquisto</li>
      </ul>
      <p>
        Performance attese: open rate 45-65% sulla prima email, conversion rate del 5-10% sull&apos;intera
        serie. Tra tutti i flow, la welcome series ha spesso il revenue per recipient più alto.
      </p>

      <h2>Flow 2: Abandoned Cart</h2>
      <p>
        Circa il 70% dei carrelli viene abbandonato prima del checkout. L&apos;abandoned cart flow è il
        tentativo di recuperare quella quota, e funziona. Un&apos;implementazione base (anche solo una
        email) recupera mediamente tra il 5% e l&apos;8% dei carrelli abbandonati. Una sequenza completa
        arriva al 15-20%.
      </p>
      <p>
        In Klaviyo, il trigger è l&apos;<em>Started Checkout</em> event: si attiva quando un utente
        identificato aggiunge prodotti al carrello e lascia il sito senza completare l&apos;ordine.
        La chiave è che Klaviyo mostra dinamicamente il prodotto esatto abbandonato, con immagine,
        nome e prezzo, rendendo ogni email rilevante per quel cliente specifico.
      </p>
      <p>
        Struttura consigliata:
      </p>
      <ul>
        <li><strong>Email 1 (1 ora)</strong>: reminder semplice, nessuno sconto, focus sul prodotto</li>
        <li><strong>Email 2 (24 ore)</strong>: social proof sul prodotto (recensioni, rating)</li>
        <li><strong>Email 3 (72 ore)</strong>: incentivo finale (se usi sconti, solo qui)</li>
      </ul>
      <p>
        Evita di mettere lo sconto nella prima email: abitua i clienti ad aspettare il coupon invece
        di completare l&apos;acquisto al prezzo pieno.
      </p>

      <h2>Flow 3: Browse Abandonment</h2>
      <p>
        Meno conosciuto dell&apos;abandoned cart, ma con un volume molto più alto: parte quando un utente
        visita una pagina prodotto senza aggiungere niente al carrello. Il trigger è il
        <em> Viewed Product</em> event.
      </p>
      <p>
        La conversione è più bassa rispetto all&apos;abandoned cart (l&apos;utente era meno "caldo"), ma il
        volume compensa: ogni giorno ci sono decine o centinaia di prodotti visualizzati senza
        conversione. Anche un tasso di recupero dell&apos;1-2% su quei volumi genera revenue significativa.
      </p>
      <p>
        Per il browse abandonment funziona bene una sequenza breve: 1-2 email, la prima a 4-6 ore
        dalla visita (non subito: aspetta di essere sicuro che non abbia acquistato altrove), con
        il prodotto visualizzato e eventualmente prodotti correlati. Il tono deve essere leggero,
        non aggressivo: "Hai dato un&apos;occhiata a questo, forse ti è rimasto in mente."
      </p>

      <h2>Flow 4: Post-Purchase</h2>
      <p>
        Il flusso post-acquisto è quello con il ROI potenzialmente più alto perché parla a persone
        che hanno già dimostrato fiducia acquistando. Eppure è il flow più spesso ignorato dagli
        e-commerce italiani.
      </p>
      <p>
        Il post-purchase ha due obiettivi: migliorare l&apos;esperienza post-vendita (riduci i resi,
        aumenta la soddisfazione, ottieni recensioni) e stimolare il secondo acquisto (il momento
        più difficile nel ciclo di vita del cliente: una volta che acquista due volte, la probabilità
        che diventi cliente abituale sale enormemente).
      </p>
      <p>
        Struttura consigliata:
      </p>
      <ul>
        <li><strong>Email 1 (subito dopo l&apos;ordine)</strong>: conferma con personalità del brand</li>
        <li><strong>Email 2 (3-5 giorni)</strong>: come usare il prodotto, tips, contenuto educativo</li>
        <li><strong>Email 3 (14-21 giorni)</strong>: cross-sell di prodotti complementari</li>
        <li><strong>Email 4 (30 giorni post-consegna)</strong>: richiesta di recensione</li>
      </ul>
      <p>
        Per brand con prodotti consumabili (cosmetica, integratori, food), aggiungi una email di
        replenishment: calcolando la durata media del prodotto, manda un promemoria quando è
        probabile che stia finendo.
      </p>

      <h2>Flow 5: Winback</h2>
      <p>
        Il winback si attiva sui clienti che hanno acquistato in passato e non tornano da un periodo
        definito, di solito 90, 120 o 180 giorni in base alla frequenza di acquisto media del
        tuo settore. È il flow che recupera i clienti "dormienti" prima che diventino persi.
      </p>
      <p>
        La logica è semplice: è molto meno costoso riattivare un cliente esistente che acquisirne uno
        nuovo. Un winback ben costruito ha conversion rate tra il 5% e il 15% sui clienti riattivabili.
      </p>
      <p>
        Struttura consigliata:
      </p>
      <ul>
        <li><strong>Email 1</strong>: "Ci sei mancato", senza sconto, solo reminder dei prodotti</li>
        <li><strong>Email 2 (7 giorni dopo)</strong>: novità del brand o bestseller recenti</li>
        <li><strong>Email 3 (14 giorni dopo)</strong>: incentivo finale per chi non ha risposto</li>
      </ul>
      <p>
        Chi non apre o clicca nessuna delle tre email va spostato in un segmento "unengaged" e
        gestito separatamente per non penalizzare la deliverability delle tue campagne principali.
      </p>

      <h2>L&apos;ordine in cui attivarli</h2>
      <p>
        Se stai partendo da zero, l&apos;ordine logico è: Abandoned Cart prima (ROI immediato più alto),
        poi Welcome Series (impatta ogni nuovo iscritto da subito), poi Post-Purchase (aumenta LTV),
        poi Winback (riattiva chi hai già), poi Browse Abandonment (volume alto, conversione bassa).
      </p>
      <p>
        Se hai già alcuni flow attivi ma li hai costruiti velocemente senza ottimizzazioni, spesso
        conviene fermarsi a migliorare quelli esistenti piuttosto che aggiungere nuovi. Un abandoned
        cart con 3 email ottimizzate performa meglio di 5 flow mal costruiti.
      </p>

      <h2>Vuoi sapere quali flow ti mancano?</h2>
      <p>
        I 5 flow descritti qui sopra sono il framework base. Esistono poi flow più avanzati
        (segmentazione predittiva, loyalty program, international flows) che si costruiscono sopra
        a questo fondamento. Se vuoi una checklist dettagliata di tutti i flow avanzati con le
        specifiche di configurazione, puoi scaricarla gratuitamente:{" "}
        <Link
          href="/rm_flow_avanzati.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-primary transition-colors"
        >
          scarica i flow avanzati
        </Link>
        .
      </p>
      <p>
        Oppure, se vuoi prima capire dove ti trovi rispetto a questi benchmark, fai il quiz qui sotto:
        5 domande, risultato personalizzato in 2 minuti.
      </p>
    </>
  );
}
