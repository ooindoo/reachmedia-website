"use client";

import { useState } from "react";
import Link from "next/link";
import type { Resource } from "../lib/resources";
import { subscribeToKlaviyo, trackResourceDownload, KLAVIYO_LISTS } from "../lib/klaviyo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { name?: string; email?: string };

/**
 * Free resource offered mid-article. The article stays fully readable; the
 * PDF is unlocked with name + email (website optional). Marketing consent is
 * a separate, unticked checkbox: without it the profile is only recorded as
 * having downloaded the resource.
 */
export default function ResourceUpgrade({ resource, slug }: { resource: Resource; slug: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const id = (f: string) => `res-${slug}-${f}`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Il nome è obbligatorio.";
    if (!email.trim()) next.email = "L'email è obbligatoria.";
    else if (!EMAIL_RE.test(email)) next.email = "Inserisci un indirizzo email valido.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const source = `Blog · ${slug}`;
    const site = website.trim();
    await Promise.all([
      trackResourceDownload({ email, firstName: name, website: site || undefined, resource: resource.title, source }),
      consent
        ? subscribeToKlaviyo({
            email,
            firstName: name,
            source,
            listId: KLAVIYO_LISTS.newsletter,
            ...(site && { properties: { website: site } }),
          })
        : Promise.resolve(true),
    ]);
    setLoading(false);
    setDone(true);
    // The download never depends on Klaviyo answering. A same-origin link
    // with `download` is not treated as a popup after the async submit.
    const link = document.createElement("a");
    link.href = resource.file;
    link.download = "";
    link.click();
  };

  return (
    <aside className="tile max-w-[760px] my-3 p-6 md:p-10" aria-labelledby={id("title")}>
      <p className="section-label mb-3">Risorsa gratuita</p>
      <h2 id={id("title")} className="text-2xl font-semibold tracking-[-0.03em] leading-tight text-balance">
        {resource.title}
      </h2>
      <p className="mt-2 text-secondary text-[0.9375rem] leading-relaxed max-w-xl">{resource.desc}</p>

      {done ? (
        <div className="quiz-enter mt-6" role="status">
          <p className="font-semibold">Grazie, {name.split(" ")[0]}. Il download è partito.</p>
          <p className="text-sm text-secondary mt-1">
            Se non si è aperto,{" "}
            <a href={resource.file} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
              scarica il PDF da qui
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor={id("name")} className="field-label">Nome</label>
            <input
              id={id("name")}
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
              placeholder="Il tuo nome"
              aria-invalid={!!errors.name}
              className={`field ${errors.name ? "field-error" : ""}`}
            />
            {errors.name && <p className="text-sm text-[color:var(--danger)] mt-1.5">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor={id("email")} className="field-label">Email</label>
            <input
              id={id("email")}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="tua@email.it"
              aria-invalid={!!errors.email}
              className={`field ${errors.email ? "field-error" : ""}`}
            />
            {errors.email && <p className="text-sm text-[color:var(--danger)] mt-1.5">{errors.email}</p>}
          </div>
          <div className="md:col-span-2">
            <label htmlFor={id("site")} className="field-label">
              Sito del tuo e-commerce <span className="font-normal text-dim">(facoltativo)</span>
            </label>
            <input
              id={id("site")}
              type="text"
              inputMode="url"
              autoComplete="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.tuobrand.it"
              className="field"
            />
          </div>
          <label htmlFor={id("consent")} className="md:col-span-2 flex items-start gap-3 text-sm text-secondary leading-relaxed cursor-pointer">
            <input
              id={id("consent")}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#0b0c0e]"
            />
            <span>
              Voglio ricevere anche la newsletter mensile di Reach Media. Puoi disiscriverti quando vuoi.
            </span>
          </label>
          <div className="md:col-span-2 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="submit" disabled={loading} className="btn btn-ink">
              {loading ? "Un attimo..." : <>Scarica il PDF <span className="arrow" aria-hidden="true">→</span></>}
            </button>
            <p className="text-xs text-dim">
              Leggi la{" "}
              <Link href="/privacy-policy" className="underline underline-offset-4">privacy policy</Link>.
            </p>
          </div>
        </form>
      )}
    </aside>
  );
}
