#!/usr/bin/env node
/**
 * scripts/import-posts.js
 *
 * Imports the 3 static blog articles into Sanity CMS as "post" documents.
 * Uses createOrReplace — safe to run multiple times (idempotent).
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/import-posts.js
 *
 * How to get a token:
 *   1. Go to https://www.sanity.io/manage
 *   2. Click on the project "6926yn16" (reach-media)
 *   3. Left sidebar → API → Tokens
 *   4. "Add API token" → Name: "import-script" → Permissions: Editor → Save
 *   5. Copy the token (shown only once)
 *   6. Run: SANITY_TOKEN=<paste-token-here> node scripts/import-posts.js
 */

'use strict';

const { createClient } = require('@sanity/client');

// ── Guard ──────────────────────────────────────────────────────────────────────
if (!process.env.SANITY_TOKEN) {
  console.error('\n✗  SANITY_TOKEN environment variable is required.');
  console.error('   Run: SANITY_TOKEN=<token> node scripts/import-posts.js\n');
  process.exit(1);
}

// ── Client ─────────────────────────────────────────────────────────────────────
const client = createClient({
  projectId: '6926yn16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// ── Block-content builders ─────────────────────────────────────────────────────
let _n = 0;
const k   = ()  => `k${++_n}`;
const s   = (t) => ({ _type: 'span', _key: k(), text: t, marks: [] });
const b   = (t) => ({ _type: 'span', _key: k(), text: t, marks: ['strong'] });
const em  = (t) => ({ _type: 'span', _key: k(), text: t, marks: ['em'] });

const p  = (...ch) => ({ _type: 'block', _key: k(), style: 'normal',  markDefs: [], children: ch.flat() });
const h2 = (t)    => ({ _type: 'block', _key: k(), style: 'h2',       markDefs: [], children: [s(t)] });
const h3 = (t)    => ({ _type: 'block', _key: k(), style: 'h3',       markDefs: [], children: [s(t)] });
const li = (...ch) => ({ _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: ch.flat() });

// Block with a link annotation (for the PDF link in article 3)
function pLink(before, linkText, href, after) {
  const lk = k();
  return {
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [{ _key: lk, _type: 'link', href, blank: true }],
    children: [s(before), { _type: 'span', _key: k(), text: linkText, marks: [lk] }, s(after)],
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST 1 — Klaviyo per e-commerce italiano: guida pratica al setup
// ═══════════════════════════════════════════════════════════════════════════════
const post1 = {
  _id:         'post-klaviyo-ecommerce-italiano',
  _type:       'post',
  title:       'Klaviyo per e-commerce italiano: guida pratica al setup',
  slug:        { _type: 'slug', current: 'klaviyo-ecommerce-italiano' },
  publishedAt: '2026-05-01T00:00:00.000Z',
  category:    'Klaviyo',
  readingTime: 6,
  excerpt:     "Come configurare Klaviyo da zero per un e-commerce italiano: integrazione con Shopify, i primi 3 flow da attivare e la segmentazione base per iniziare a generare revenue.",
  seoTitle:       "Klaviyo per E-commerce Italiano: Guida Pratica al Setup",
  seoDescription: "Guida all'uso di Klaviyo per e-commerce italiani: setup account, integrazione Shopify, i 3 flow essenziali e segmentazione base per generare revenue.",
  body: [
    p(s("Se gestisci un e-commerce in Italia e non stai usando Klaviyo, stai quasi certamente lasciando soldi sul tavolo ogni mese. Non perché sia l'unica piattaforma email sul mercato, ma perché è quella progettata specificamente per trasformare i dati comportamentali degli utenti in revenue misurabile. In questa guida vediamo come impostare Klaviyo per un e-commerce italiano, dal primo accesso ai flow che dovresti avere attivi entro la prima settimana.")),

    h2("Perché Klaviyo è lo strumento giusto per l'e-commerce italiano"),
    p(s("La differenza tra Klaviyo e un generico strumento di email marketing come Mailchimp o Brevo si vede nel momento in cui colleghi il tuo shop. Klaviyo non si limita a importare una lista di contatti: sincronizza in tempo reale tutti gli eventi che accadono sul tuo sito — visualizzazioni di prodotto, aggiunte al carrello, acquisti, resi — e li rende disponibili per trigger, segmentazioni e personalizzazioni.")),
    p(s("Per un e-commerce italiano che lavora con Shopify, questa integrazione è nativa e richiede letteralmente due click. Il risultato è che ogni email che mandi può essere contestualizzata su cosa ha visto o comprato quel cliente specifico, quando l'ha fatto, e quanto vale per il tuo business.")),
    p(s("Sul mercato italiano, dove la competizione su Meta Ads e Google è sempre più costosa, il canale email diventa l'unica leva di marketing che non ti fa pagare per ogni click. Costruire una lista e automatizzarla con Klaviyo significa creare un asset che genera revenue in modo prevedibile, indipendentemente da algorithm change o CPM in aumento.")),

    h2("Setup dell'account e configurazione base"),
    p(s("Il primo passo dopo la registrazione è l'integrazione con Shopify. Vai su "), em("Integrations"), s(" nel menù principale, cerca Shopify e inserisci il dominio del tuo shop. Klaviyo installerà automaticamente il pixel sul sito e inizierà a raccogliere gli eventi in tempo reale.")),
    p(s("Dopo l'integrazione, configura i sender settings: il nome del mittente (usa il nome del brand, non il tuo nome personale), l'indirizzo email di invio e l'indirizzo fisico in fondo alle email (obbligatorio per GDPR e CAN-SPAM). Per la deliverability, se mandi più di 5.000 email al mese, imposta un dominio di invio dedicato nelle impostazioni DNS del tuo provider.")),
    p(s("Crea subito almeno due liste principali: la lista principale dei subscriber e una lista separata per i clienti già acquirenti (Klaviyo può creare questa seconda lista automaticamente dai dati Shopify). Questa separazione ti servirà per segmentare fin dall'inizio.")),

    h2("I primi 3 flow da attivare subito"),
    p(s("I flow sono le automazioni che girano in background e generano revenue senza che tu debba fare nulla. Ecco i tre che producono il ritorno più alto nell'immediato.")),

    h3("1. Welcome Series"),
    p(s("Il flusso di benvenuto parte quando qualcuno si iscrive alla tua lista senza aver ancora acquistato. È il momento di maggiore attenzione: l'utente ha appena lasciato la sua email, quindi è curioso e aperto. Una welcome series efficace ha 3-5 email distribuite su 7-10 giorni.")),
    p(s("La prima email arriva entro un'ora dall'iscrizione e introduce il brand: chi sei, cosa fai, perché sei diverso dalla concorrenza. Non mandare uno sconto subito — trainerai un pubblico che si iscrive solo per il coupon. La seconda e terza email approfondiscono la proposta di valore e possono includere social proof (recensioni, numeri). Solo all'ultima email, se non ha ancora acquistato, puoi offrire un incentivo.")),

    h3("2. Abandoned Cart"),
    p(s("Statisticamente, il 70% dei carrelli viene abbandonato prima del checkout. L'abandoned cart flow ti permette di recuperarne una parte significativa — di solito tra il 10% e il 15% di chi riceve la sequenza completa converte.")),
    p(s("Imposta 3 email: la prima a 1 ora dall'abbandono (reminder semplice, nessuno sconto), la seconda a 24 ore (aggiungi social proof sul prodotto), la terza a 72 ore (se vuoi usare uno sconto, fallo qui). Usa i dynamic blocks di Klaviyo per mostrare automaticamente il prodotto esatto che ha lasciato nel carrello — è questo il punto di forza rispetto a un'email generica.")),

    h3("3. Post-Purchase Flow"),
    p(s("Il flusso post-acquisto è spesso ignorato, ma è quello con il ROI più alto perché parla a persone che hanno già dimostrato di fidarsi di te. Parte subito dopo il primo ordine confermato.")),
    p(s("Struttura suggerita: email di conferma d'ordine (automatica da Shopify, ma personalizzabile in Klaviyo), email di onboarding sul prodotto acquistato a 3 giorni (come usarlo, tips, contenuto di valore), cross-sell a 14 giorni (prodotti complementari), richiesta recensione a 21-30 giorni dalla consegna.")),

    h2("Segmentazione base: con chi stai parlando"),
    p(s("Prima di mandare qualsiasi campagna, definisci i tuoi segmenti principali. In Klaviyo, i segmenti sono dinamici: si aggiornano automaticamente man mano che gli utenti soddisfano o smettono di soddisfare i criteri.")),
    p(s("I quattro segmenti fondamentali da creare subito:")),
    li(b("Engaged subscribers"), s(": chi ha aperto o cliccato almeno una email negli ultimi 90 giorni. Questo è il tuo pubblico caldo.")),
    li(b("Active customers"),    s(": chi ha acquistato almeno una volta negli ultimi 180 giorni.")),
    li(b("VIP customers"),       s(": chi ha un valore ordine medio sopra soglia o ha fatto più di 3 acquisti. Trattali diversamente.")),
    li(b("Unengaged subscribers"), s(": chi non apre da più di 120 giorni. Da tenere separati per non penalizzare la deliverability.")),
    p(s("Quando mandi campagne broadcast, mandale principalmente ai segmenti engaged e active, non a tutta la lista. Una lista da 10.000 persone di cui 3.000 engaged performerà meglio — in termini di deliverability e conversioni — di una lista da 10.000 mandata tutta insieme con tassi di apertura bassi.")),

    h2("I numeri che devi tenere d'occhio"),
    p(s("Nella dashboard di Klaviyo, i KPI da monitorare ogni settimana sono: open rate (target sopra il 35% per gli engaged), click rate (target sopra il 2%), revenue per recipient e conversion rate. Ma il numero che conta davvero è uno solo: quanta revenue attribuisce Klaviyo ogni mese rispetto al totale del tuo e-commerce.")),
    p(s("Un sistema ben costruito dovrebbe contribuire tra il 20% e il 35% del fatturato totale. Se sei sotto il 10%, c'è ancora molto margine da recuperare.")),

    h2("Il passo successivo"),
    p(s("Questo è il setup minimo per partire. Con i 3 flow attivi e la segmentazione base, hai già un sistema che lavora per te 24 ore su 24. Il livello successivo — segmentazione predittiva, A/B testing sistematico, ottimizzazione della deliverability, campagne avanzate — richiede dati storici e un approccio più strutturato.")),
    p(s("Se vuoi capire dove si trova esattamente il tuo e-commerce rispetto a questi benchmark, il quiz qui sotto ti dà una diagnosi personalizzata in 5 domande.")),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 2 — Email marketing ecommerce: quanto dovresti fatturare da questo canale
// ═══════════════════════════════════════════════════════════════════════════════
const post2 = {
  _id:         'post-email-marketing-ecommerce-fatturato',
  _type:       'post',
  title:       'Email marketing ecommerce: quanto dovresti fatturare da questo canale',
  slug:        { _type: 'slug', current: 'email-marketing-ecommerce-fatturato' },
  publishedAt: '2026-05-10T00:00:00.000Z',
  category:    'Email Marketing',
  readingTime: 5,
  excerpt:     "Il benchmark del settore dice 15-30% del fatturato da email. La maggior parte degli e-commerce italiani è sotto il 5%. Ecco perché e come misurare le tue performance.",
  seoTitle:       "Email Marketing Ecommerce: Quanto Dovresti Fatturare",
  seoDescription: "Benchmark email marketing ecommerce: quanto dovresti fatturare, perché sei sotto la media e come misurare le performance su Klaviyo.",
  body: [
    p(s("Ogni mese, migliaia di e-commerce italiani mandano email alla loro lista senza sapere se stanno ottenendo buoni risultati o pessimi. Non hanno un benchmark di riferimento, non misurano le performance in modo sistematico e — la cosa più costosa — non sanno quanti soldi stanno lasciando sul tavolo. Questo articolo ti dà i numeri concreti per capire dove ti trovi.")),

    h2("Il benchmark del settore: cosa dicono i dati"),
    p(s("Nei mercati e-commerce maturi — Stati Uniti, UK, Germania — il dato consolidato è questo: un programma email ben gestito contribuisce tra il "), b("20% e il 35% del fatturato totale"), s(" dell'e-commerce. Non è un numero gonfiato da qualche agenzia: è la media che emerge dall'analisi di migliaia di account Klaviyo pubblicata annualmente dalla stessa piattaforma.")),
    p(s("Nei mercati più maturi, alcuni brand di fascia premium arrivano al 40-45%. Non perché mandino più email degli altri, ma perché hanno costruito sistemi automatici che lavorano in background — flow, segmentazioni, test — mentre le campagne broadcast si occupano del resto.")),
    p(s("Il dato italiano è molto diverso. Per la maggior parte degli e-commerce italiani che incontriamo, la quota email è sotto il 10%, spesso sotto il 5%. In alcuni casi, è letteralmente zero perché non esiste un sistema strutturato.")),

    h2("Perché la maggior parte degli e-commerce italiani è sotto il 5%"),
    p(s("Non è questione di mercato o di consumatori italiani che aprono meno le email. I dati di apertura sulle campagne italiane sono in linea con i mercati europei (quando le email arrivano alla inbox). I gap sono strutturali, e si ripetono quasi sempre negli stessi pattern.")),

    h3("Nessun sistema automatico attivo"),
    p(s("Il gap più grande, e il più facile da colmare. La maggior parte degli e-commerce italiani manda solo newsletter manuali — un invio ogni tanto, senza automazioni. I flow (welcome, carrello abbandonato, post-acquisto, winback) sono spesso assenti o incompleti. Questi flow sono responsabili di circa il 40-60% della revenue email nei brand strutturati, perché girano 24 ore su 24 senza richiedere lavoro continuo.")),

    h3("Lista non segmentata"),
    p(s("Mandare la stessa email a chi ha appena comprato e a chi non apre da sei mesi è l'errore più diffuso. Oltre a non funzionare (i messaggi non rilevanti non convertono), penalizza la deliverability: se il 60% della lista non apre mai, Gmail e altri provider iniziano a classificare le tue email come spam anche per chi vorrebbe riceverle.")),

    h3("Nessun testing sistematico"),
    p(s("L'oggetto dell'email è il fattore singolo che impatta di più sull'open rate, e quindi su tutta la catena di conversione. Un A/B test sull'oggetto può fare la differenza tra un'apertura del 20% e del 35% sullo stesso invio. Eppure la maggior parte degli e-commerce italiani non ha mai fatto un test sistematico sulle proprie campagne.")),

    h3("Deliverability non curata"),
    p(s("Un'email non vista è un'email che non può convertire. Se non hai configurato SPF, DKIM e DMARC sul tuo dominio, se mandi alla lista intera senza tenere conto degli unengaged, se non pulisci i bounce, stai mandando email che arrivano in spam per una percentuale significativa dei tuoi contatti.")),

    h2("Come misurare le tue performance su Klaviyo"),
    p(s("Il posto giusto da cui partire è la sezione "), em("Analytics → Overview"), s(" di Klaviyo. Guarda questi numeri nel rolling degli ultimi 30 e 90 giorni:")),
    li(b("Revenue attribuita a Klaviyo"), s(": il numero più importante. Dividilo per il fatturato totale del tuo e-commerce nello stesso periodo. Se sei sotto il 15%, hai margine.")),
    li(b("Open rate medio"), s(": sotto il 25% su lista engaged è un segnale di deliverability o rilevanza da correggere. Sopra il 35% sei in buona salute.")),
    li(b("Revenue per recipient"), s(": quanto genera in media ogni contatto della lista. Questo numero cresce con la segmentazione e la personalizzazione.")),
    li(b("Flow revenue vs Campaign revenue"), s(": il rapporto ideale nei brand strutturati è 40-60% da flow e 40-60% da campagne. Se i flow pesano meno del 20%, c'è molto da costruire.")),

    h2("I gap più comuni e quanto valgono"),
    p(s("Per dare un ordine di grandezza concreto: un e-commerce italiano con 1 milione di euro di fatturato che ora genera il 5% da email, con un sistema ben strutturato, potrebbe arrivare al 25%. Significa 200.000 euro di revenue aggiuntiva dallo stesso traffico, dalla stessa lista, senza spendere un euro in advertising.")),
    p(s("Ovviamente non succede da un giorno all'altro, e dipende dalla qualità della lista, dalla vertical e dal tasso di riacquisto naturale dei prodotti. Ma il principio è questo: l'email è il canale con il ROI più alto nell'e-commerce perché il costo marginale di un invio aggiuntivo è quasi zero, una volta che il sistema è costruito.")),

    h2("Dove iniziare"),
    p(s("Se sei sotto il 10% di revenue da email, la priorità è una sola: attivare i flow automatici. Welcome series, abandoned cart e post-purchase — questi tre da soli, ben configurati, spostano l'ago del 10-15 punti percentuali nel giro di 60-90 giorni.")),
    p(s("Se sei tra il 10% e il 20%, il lavoro è sulla qualità: segmentazione più precisa, testing degli oggetti, ottimizzazione della deliverability, aggiunta di flow secondari come browse abandonment e winback.")),
    p(s("Se sei sopra il 20%, il livello successivo è la personalizzazione avanzata: product recommendations basate su comportamento, segmentazione predittiva, espansione internazionale della lista.")),
    p(s("Non sai dove ti trovi? Il quiz di diagnosi qui sotto ti posiziona in 5 domande e ti dice esattamente dove sta il gap più grande per il tuo e-commerce.")),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 3 — I 5 flow Klaviyo che ogni e-commerce dovrebbe avere attivi
// ═══════════════════════════════════════════════════════════════════════════════
const post3 = {
  _id:         'post-flow-klaviyo-ecommerce',
  _type:       'post',
  title:       'I 5 flow Klaviyo che ogni e-commerce dovrebbe avere attivi',
  slug:        { _type: 'slug', current: 'flow-klaviyo-ecommerce' },
  publishedAt: '2026-05-20T00:00:00.000Z',
  category:    'Klaviyo',
  readingTime: 7,
  excerpt:     "Welcome series, carrello abbandonato, browse abandonment, post-acquisto e winback: i 5 flow Klaviyo che girano in automatico e generano revenue mentre dormi.",
  seoTitle:       "I 5 Flow Klaviyo Essenziali per E-commerce",
  seoDescription: "I 5 flow Klaviyo essenziali: welcome series, carrello abbandonato, browse abandonment, post-acquisto e winback. Come configurarli e cosa aspettarsi.",
  body: [
    p(s("I flow Klaviyo sono il motivo per cui le agenzie email marketing parlano di \"revenue passiva\". Non perché non richiedano lavoro — costruirli bene richiede strategia, copywriting e testing — ma perché una volta attivi, girano in autonomia. Ogni carrello abbandonato, ogni nuovo iscritto, ogni cliente silenzioso da sei mesi: tutti ricevono la comunicazione giusta al momento giusto, senza che tu debba fare nulla.")),
    p(s("Nei brand strutturati su Klaviyo, i flow contribuiscono tra il 40% e il 60% di tutta la revenue email. Eppure la maggior parte degli e-commerce italiani ne ha al massimo uno attivo — spesso incompleto. Questa guida copre i cinque flow che dovresti avere operativi prima di pensare a qualsiasi altra ottimizzazione.")),

    h2("Flow 1: Welcome Series"),
    p(s("Il flusso di benvenuto è il punto di ingresso nel tuo ecosistema email. Parte quando qualcuno si iscrive alla lista senza aver ancora acquistato — e questo è il momento di massima attenzione: l'utente è curioso, ha appena alzato la mano dicendo \"sono interessato\".")),
    p(s("Una welcome series efficace non è solo un'email di conferma iscrizione. È una sequenza di 3-5 email distribuite su 7-10 giorni che fa tre cose: introduce il brand con una voce autentica, dimostra la proposta di valore con prove concrete, e costruisce la fiducia necessaria per il primo acquisto.")),
    p(s("Struttura consigliata:")),
    li(b("Email 1 (ora 1)"), s(": benvenuto nel brand, storia e perché siete diversi")),
    li(b("Email 2 (giorno 2)"), s(": prodotto o categoria flagship con social proof")),
    li(b("Email 3 (giorno 4)"), s(": contenuto di valore (guida, tips, educational)")),
    li(b("Email 4 (giorno 7)"), s(": offerta o incentivo per il primo acquisto")),
    p(s("Performance attese: open rate 45-65% sulla prima email, conversion rate del 5-10% sull'intera serie. Tra tutti i flow, la welcome series ha spesso il revenue per recipient più alto.")),

    h2("Flow 2: Abandoned Cart"),
    p(s("Circa il 70% dei carrelli viene abbandonato prima del checkout. L'abandoned cart flow è il tentativo di recuperare quella quota — e funziona. Un'implementazione base (anche solo una email) recupera mediamente tra il 5% e l'8% dei carrelli abbandonati. Una sequenza completa arriva al 15-20%.")),
    p(s("In Klaviyo, il trigger è lo "), em("Started Checkout"), s(" event: si attiva quando un utente identificato aggiunge prodotti al carrello e lascia il sito senza completare l'ordine. La chiave è che Klaviyo mostra dinamicamente il prodotto esatto abbandonato — con immagine, nome e prezzo — rendendo ogni email rilevante per quel cliente specifico.")),
    p(s("Struttura consigliata:")),
    li(b("Email 1 (1 ora)"), s(": reminder semplice, nessuno sconto, focus sul prodotto")),
    li(b("Email 2 (24 ore)"), s(": social proof sul prodotto (recensioni, rating)")),
    li(b("Email 3 (72 ore)"), s(": incentivo finale (se usi sconti, solo qui)")),
    p(s("Evita di mettere lo sconto nella prima email: abitua i clienti ad aspettare il coupon invece di completare l'acquisto al prezzo pieno.")),

    h2("Flow 3: Browse Abandonment"),
    p(s("Meno conosciuto dell'abandoned cart, ma con un volume molto più alto: parte quando un utente visita una pagina prodotto senza aggiungere niente al carrello. Il trigger è il "), em("Viewed Product"), s(" event.")),
    p(s("La conversione è più bassa rispetto all'abandoned cart (l'utente era meno \"caldo\"), ma il volume compensa: ogni giorno ci sono decine o centinaia di prodotti visualizzati senza conversione. Anche un tasso di recupero dell'1-2% su quei volumi genera revenue significativa.")),
    p(s("Per il browse abandonment funziona bene una sequenza breve: 1-2 email, la prima a 4-6 ore dalla visita (non subito — aspetta di essere sicuro che non abbia acquistato altrove), con il prodotto visualizzato e eventualmente prodotti correlati. Il tono deve essere leggero, non aggressivo: \"Hai dato un'occhiata a questo, forse ti è rimasto in mente.\"")),

    h2("Flow 4: Post-Purchase"),
    p(s("Il flusso post-acquisto è quello con il ROI potenzialmente più alto perché parla a persone che hanno già dimostrato fiducia acquistando. Eppure è il flow più spesso ignorato dagli e-commerce italiani.")),
    p(s("Il post-purchase ha due obiettivi: migliorare l'esperienza post-vendita (riduci i resi, aumenta la soddisfazione, ottieni recensioni) e stimolare il secondo acquisto (il momento più difficile nel ciclo di vita del cliente — una volta che acquista due volte, la probabilità che diventi cliente abituale sale enormemente).")),
    p(s("Struttura consigliata:")),
    li(b("Email 1 (subito dopo l'ordine)"), s(": conferma con personalità del brand")),
    li(b("Email 2 (3-5 giorni)"), s(": come usare il prodotto, tips, contenuto educativo")),
    li(b("Email 3 (14-21 giorni)"), s(": cross-sell di prodotti complementari")),
    li(b("Email 4 (30 giorni post-consegna)"), s(": richiesta di recensione")),
    p(s("Per brand con prodotti consumabili (cosmetica, integratori, food), aggiungi una email di replenishment: calcolando la durata media del prodotto, manda un promemoria quando è probabile che stia finendo.")),

    h2("Flow 5: Winback"),
    p(s("Il winback si attiva sui clienti che hanno acquistato in passato e non tornano da un periodo definito — di solito 90, 120 o 180 giorni, dipende dalla frequenza di acquisto media del tuo settore. È il flow che recupera i clienti \"dormienti\" prima che diventino persi.")),
    p(s("La logica è semplice: è molto meno costoso riattivare un cliente esistente che acquisirne uno nuovo. Un winback ben costruito ha conversion rate tra il 5% e il 15% sui clienti riattivabili.")),
    p(s("Struttura consigliata:")),
    li(b("Email 1"), s(": \"Ci sei mancato\" — no sconto, solo reminder dei prodotti")),
    li(b("Email 2 (7 giorni dopo)"), s(": novità del brand o bestseller recenti")),
    li(b("Email 3 (14 giorni dopo)"), s(": incentivo finale per chi non ha risposto")),
    p(s("Chi non apre o clicca nessuna delle tre email va spostato in un segmento \"unengaged\" e gestito separatamente per non penalizzare la deliverability delle tue campagne principali.")),

    h2("L'ordine in cui attivarli"),
    p(s("Se stai partendo da zero, l'ordine logico è: Abandoned Cart prima (ROI immediato più alto), poi Welcome Series (impatta ogni nuovo iscritto da subito), poi Post-Purchase (aumenta LTV), poi Winback (riattiva chi hai già), poi Browse Abandonment (volume alto, conversione bassa).")),
    p(s("Se hai già alcuni flow attivi ma li hai costruiti velocemente senza ottimizzazioni, spesso conviene fermarsi a migliorare quelli esistenti piuttosto che aggiungere nuovi. Un abandoned cart con 3 email ottimizzate performa meglio di 5 flow mal costruiti.")),

    h2("Vuoi sapere quali flow ti mancano?"),
    pLink(
      "I 5 flow descritti qui sopra sono il framework base. Esistono poi flow più avanzati — segmentazione predittiva, loyalty program, international flows — che si costruiscono sopra a questo fondamento. Se vuoi una checklist dettagliata di tutti i flow avanzati con le specifiche di configurazione, puoi scaricarla gratuitamente: ",
      "scarica i flow avanzati",
      "/rm_flow_avanzati.pdf",
      "."
    ),
    p(s("Oppure, se vuoi prima capire dove ti trovi rispetto a questi benchmark, fai il quiz qui sotto: 5 domande, risultato personalizzato in 2 minuti.")),
  ],
};

// ── Import ─────────────────────────────────────────────────────────────────────
async function main() {
  const posts = [post1, post2, post3];
  console.log(`\nImporting ${posts.length} posts into Sanity (project: 6926yn16, dataset: production)...\n`);

  for (const post of posts) {
    process.stdout.write(`  • ${post.title} ... `);
    try {
      await client.createOrReplace(post);
      console.log('✓');
    } catch (err) {
      console.log('✗');
      console.error(`    Error: ${err.message}`);
      process.exit(1);
    }
  }

  console.log('\n✓  All posts imported successfully.\n');
  console.log('  Next: run your dev server and check /blog to verify the posts appear.\n');
}

main();
