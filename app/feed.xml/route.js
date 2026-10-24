import {getPosts} from '../../lib/posts';
export const dynamic='force-static';
import {siteOrigin as origin} from '../../lib/site';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Amir Rimal — Notes</title><link>${origin}/blog/</link><description>AI and software engineering</description>${getPosts().map(p=>`<item><title>${esc(p.title)}</title><link>${origin}/blog/${p.slug}/</link><guid>${origin}/blog/${p.slug}/</guid><description>${esc(p.description)}</description></item>`).join('')}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});}
