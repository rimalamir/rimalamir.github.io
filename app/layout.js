import {siteOrigin} from '../lib/site';
import {themeBootstrap} from '../lib/themes';
import '@fontsource-variable/manrope';
import './globals.css';
export const metadata={metadataBase:new URL(siteOrigin),title:'Amir Rimal — Software Developer',description:'Web apps, websites and mobile products. Software developer based in Toowoomba, Queensland.',alternates:{types:{'application/rss+xml':'/feed.xml'}},openGraph:{title:'Amir Rimal — Software Developer',description:'Web apps, websites and mobile products. Toowoomba, Queensland.',type:'website'}};
export default function Layout({children}){return <html lang="en-AU" suppressHydrationWarning><head><link rel="alternate" type="text/plain" href="/llms.txt" title="Portfolio index for language models"/><link rel="alternate" type="application/json" href="/portfolio.json" title="Structured portfolio"/><script id="portfolio-theme" dangerouslySetInnerHTML={{__html:themeBootstrap}}/></head><body>{children}</body></html>}
