import {siteOrigin} from '../lib/site';
import Experience from '../components/Experience';
import {portfolio} from '../lib/portfolio';
export const metadata={title:'Amir Rimal — Software Developer in Toowoomba',description:'Web applications, websites, APIs and mobile products. Explore independent software projects and anonymised team contributions by Toowoomba developer Amir Rimal.',alternates:{canonical:'/'}};
export default function Page(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Amir Rimal',jobTitle:'Software Developer',url:siteOrigin+'/',email:'rimalamir17@gmail.com',address:{'@type':'PostalAddress',addressLocality:'Toowoomba',addressRegion:'QLD',addressCountry:'AU'},sameAs:['https://github.com/rimalamir','https://www.linkedin.com/in/rimalamir/']}).replaceAll('<','\\u003c')}}/><Experience data={portfolio} personal/></>}
