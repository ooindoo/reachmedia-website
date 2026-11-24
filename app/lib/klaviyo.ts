// Client-side Klaviyo subscriptions (quiz + footer newsletter).
// VhAfyx è la public company key — già visibile nel sorgente tramite klaviyo.js
const COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY ?? "VhAfyx";
const QUIZ_LIST_ID = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID ?? "YqRu4p";

export const KLAVIYO_LISTS = {
  quiz: QUIZ_LIST_ID,
  // Falls back to the quiz list; set NEXT_PUBLIC_KLAVIYO_NEWSLETTER_LIST_ID
  // to send newsletter signups to their own list.
  newsletter: process.env.NEXT_PUBLIC_KLAVIYO_NEWSLETTER_LIST_ID ?? QUIZ_LIST_ID,
};

type Subscription = {
  email: string;
  firstName?: string;
  source: string;
  listId?: string;
  properties?: Record<string, string | number>;
};

/** Subscribes a profile to a list. Resolves true when Klaviyo accepted it. */
export async function subscribeToKlaviyo({
  email,
  firstName,
  source,
  listId,
  properties,
}: Subscription): Promise<boolean> {
  const payload = {
    data: {
      type: "subscription",
      attributes: {
        custom_source: source,
        profile: {
          data: {
            type: "profile",
            attributes: {
              email,
              ...(firstName !== undefined && { first_name: firstName }),
              ...(properties && { properties }),
            },
          },
        },
      },
      ...(listId && {
        relationships: {
          list: {
            data: {
              type: "list",
              id: listId,
            },
          },
        },
      }),
    },
  };

  try {
    const res = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${COMPANY_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          revision: "2024-02-15",
        },
        body: JSON.stringify(payload),
      }
    );
    return res.ok;
  } catch (err) {
    console.error("Klaviyo subscription error:", err);
    return false;
  }
}

type ResourceDownload = {
  email: string;
  firstName: string;
  website?: string;
  resource: string;
  source: string;
};

/**
 * Records a resource download in Klaviyo (creates/updates the profile and
 * logs a "Downloaded Resource" event). This does NOT subscribe the profile
 * to marketing — use subscribeToKlaviyo only with explicit consent.
 */
export async function trackResourceDownload({
  email,
  firstName,
  website,
  resource,
  source,
}: ResourceDownload): Promise<boolean> {
  const payload = {
    data: {
      type: "event",
      attributes: {
        properties: { resource, source },
        metric: { data: { type: "metric", attributes: { name: "Downloaded Resource" } } },
        profile: {
          data: {
            type: "profile",
            attributes: {
              email,
              first_name: firstName,
              ...(website && { properties: { website } }),
            },
          },
        },
      },
    },
  };

  try {
    const res = await fetch(
      `https://a.klaviyo.com/client/events/?company_id=${COMPANY_ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", revision: "2024-02-15" },
        body: JSON.stringify(payload),
      }
    );
    return res.ok;
  } catch (err) {
    console.error("Klaviyo event error:", err);
    return false;
  }
}
