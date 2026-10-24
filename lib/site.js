// Set NEXT_PUBLIC_SITE_URL to the public domain when deploying.
export const siteOrigin=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:4174').replace(/\/+$/,'');
