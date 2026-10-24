import Experience from '../../../components/Experience';
import {portfolio,studies} from '../../../lib/portfolio';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return studies.map(p=>({slug:p.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}){const {slug}=await params;const p=studies.find(p=>p.slug===slug);return p?{title:`${p.title} | Amir Rimal`,description:p.summary,openGraph:{title:p.title,description:p.summary,type:'article',url:`/work/${p.slug}/`},alternates:{canonical:`/work/${p.slug}/`}}:{};}
export default async function Page({params}){const {slug}=await params;const p=studies.find(p=>p.slug===slug);if(!p)notFound();return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:p.title,description:p.summary,contributor:{'@type':'Person',name:'Amir Rimal'}}).replaceAll('<','\\u003c')}}/><Experience data={portfolio} personal initialProject={p}/></>}
