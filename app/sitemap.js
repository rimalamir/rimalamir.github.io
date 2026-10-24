import {studies} from '../lib/portfolio';
import {getPosts} from '../lib/posts';
import {siteOrigin as origin} from '../lib/site';
export const dynamic='force-static';
export default function sitemap(){return ['/', '/about/','/work/','/blog/',...studies.map(p=>`/work/${p.slug}/`),...getPosts().map(p=>`/blog/${p.slug}/`)].map(route=>({url:origin+route}));}
