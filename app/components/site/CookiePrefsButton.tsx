"use client";

/** Reopens the cookie banner so the visitor can change their choice. */
export default function CookiePrefsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("rm_open_cookie_prefs"))}
    >
      Preferenze cookie
    </button>
  );
}
