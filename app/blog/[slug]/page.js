import Experience from '../../../components/Experience';
import {portfolio} from '../../../lib/portfolio';
import {notFound} from 'next/navigation';
import {getPosts} from '../../../lib/posts';
export function generateStaticParams(){const posts=getPosts();return posts.length?posts.map(p=>({slug:p.slug})):[{slug:'_unpublished'}];}
export const dynamicParams=false;
export async function generateMetadata({params}){const {slug}=await params,p=getPosts().find(p=>p.slug===slug);return p?{title:`${p.title} | Amir Rimal`,description:p.description,alternates:{canonical:`/blog/${p.slug}/`}}:{};}
export default async function Post({params}){const {slug}=await params,p=getPosts().find(p=>p.slug===slug);if(!p)notFound();return <><Experience data={portfolio} personal initialNote={p}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description,datePublished:p.date,author:{'@type':'Person',name:'Amir Rimal'}}).replaceAll('<','\\u003c')}}/></>}
