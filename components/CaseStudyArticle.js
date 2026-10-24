'use client';
import {useId,useState} from 'react';
import ProjectOverview from './ProjectOverview';
import {projectOverviews} from '../lib/project-overviews';
import ResearchEssay from './ResearchEssay';
import ProjectArt from './ProjectArt';
const technologyContext={
  "SEO": "I improved the dental-care website’s search engine optimisation.",
  "Lighthouse": "I raised the website’s Lighthouse score from 20 to 70+ during my improvement work.",
  "Ruby on Rails": "I used Rails for backend application behaviour and business rules.",
  "PostgreSQL": "I used PostgreSQL for structured application data and relationships.",
  "APIs": "I worked with APIs to connect application interfaces and backend services.",
  "Business logic": "I implemented the coupon rules for eligibility, validation and discount calculation.",
  "React Native": "I used React Native to build my independent mobile applications.",
  "Next.js": "I used Next.js for web application development.",
  "Supabase": "I used Supabase for backend and data services.",
  "Vercel": "I used Vercel as part of my deployment workflow.",
  "Node.js": "I used Node.js for backend services.",
  "RevenueCat": "I integrated RevenueCat for subscription functionality.",
  "Real-time communication": "I connected the application with real-time communication services.",
  "Swift": "I used Swift for native iOS development and my media-viewer package.",
  "Objective-C": "I worked with the existing Objective-C app while migrating it to Swift.",
  "UIKit": "I used UIKit for native iOS interfaces.",
  "iOS": "I contributed to the native iOS application.",
  "Native iOS": "I worked on the application’s native iOS implementation.",
  "Mobile development": "I developed and maintained the mobile application.",
  "Application maintenance": "I worked within the existing app and its ongoing development needs.",
  "iOS extensions": "I integrated native extension points with the main application.",
  "Share Extension": "I integrated the app with the iOS sharing experience.",
  "Call Directory APIs": "I used Call Directory APIs for native contact-related integration.",
  "SwiftUI": "I built the reusable photo and video viewer with SwiftUI.",
  "AVFoundation": "I used AVFoundation for video playback.",
  "Swift Package Manager": "I distribute the viewer as a Swift package.",
  "XCTest": "I maintain regression coverage with XCTest.",
  "Web applications": "I helped architect and deliver the back-office web application.",
  "Backend engineering": "I worked on the services and behaviour behind the application.",
  "Relational data": "I worked with structured business information and its relationships.",
  "API integration": "I connected application interfaces and supporting services."
};
export default function CaseStudyArticle({project,onProject,next}){
 const [audience,setAudience]=useState('client'),tabId=useId();
 const overview=projectOverviews[project.slug],overviewWords=[project.summary,overview.need,...overview.delivery,overview.relevance].join(' ').split(/\s+/).length;
 const tabs=[{id:'client',label:'For clients'},{id:'recruiter',label:'For recruiters'}];
 function switchTab(event,current){const keys=['ArrowLeft','ArrowRight','Home','End'];if(!keys.includes(event.key))return;event.preventDefault();const target=event.key==='Home'?'client':event.key==='End'?'recruiter':current==='client'?'recruiter':'client';setAudience(target);document.getElementById(`${tabId}-${target}`)?.focus();}

 const d=project.details||{},essayText=d.essay?[d.essay.subtitle,d.essay.note,...d.essay.sections.flatMap(s=>[s.title,...s.paragraphs.map(p=>p.text)])].join(' '):'',count=d.essay?essayText.split(/\s+/).length:[project.summary,...Object.values(d).flat(),...project.technology.map(t=>technologyContext[t]||''),project.value].join(' ').split(/\s+/).length;
 return <article className="case-article"><header className="case-article__heading"><p className="case-domain">{project.domain}</p><h2 id="project-title">{audience==='recruiter'?(d.essay?.title||project.title):project.title}</h2><p className="case-deck">{project.intro}</p><div className="case-meta"><span>{project.kind}</span><span>{Math.max(1,Math.ceil((audience==='client'?overviewWords:count)/220))} min read</span></div></header><div className="case-audience" role="tablist" aria-label="Who are you reading for?">{tabs.map(tab=><button key={tab.id} type="button" role="tab" id={`${tabId}-${tab.id}`} aria-selected={audience===tab.id} aria-controls={`${tabId}-panel`} tabIndex={audience===tab.id?0:-1} onClick={()=>setAudience(tab.id)} onKeyDown={event=>switchTab(event,tab.id)}>{tab.label}</button>)}</div><div className="case-reading" role="tabpanel" id={`${tabId}-panel`} aria-labelledby={`${tabId}-${audience}`}><p className="case-lead">{project.summary}</p>{audience==='client'?<ProjectOverview project={project}/>:d.essay?<ResearchEssay essay={d.essay}/>:<><nav className="case-toc" aria-label="In this case study"><a href="#project-context">Context</a><a href="#how-heading">How it works</a><a href="#contribution-heading">My work</a><a href="#technology-heading">Technology</a></nav><section aria-labelledby="project-context"><h3 id="project-context">The project in context</h3>{d.context?.map(p=><p key={p}>{p}</p>)}</section><section aria-labelledby="how-heading"><h3 id="how-heading">How it works</h3>{(d.workflow||[project.how]).map(p=><p key={p}>{p}</p>)}</section><section aria-labelledby="contribution-heading"><h3 id="contribution-heading">My contribution</h3>{(d.contribution||[project.contribution]).map(p=><p key={p}>{p}</p>)}</section><section aria-labelledby="technology-heading"><h3 id="technology-heading">Technology & capabilities</h3><div className="case-technology">{project.technology.map(t=><div key={t}><h4>{t}</h4><p>{technologyContext[t]||t}</p></div>)}</div>{project.note&&<p className="case-small">{project.note}</p>}</section><section aria-labelledby="engineering-heading"><h3 id="engineering-heading">Engineering perspective</h3>{d.engineering?.map(p=><p key={p}>{p}</p>)}</section><section aria-labelledby="value-heading"><h3 id="value-heading">What I learned</h3><p>{project.value}</p></section></>}{project.url&&<a className="case-source" href={project.url}>View source ↗</a>}<figure className="case-cover"><ProjectArt src={project.media[0].src} motion={project.media[0].motion} alt={`${project.title} illustration`} width={960} height={960} lazy autoplay/></figure>{next&&<div className="case-next"><span>Next project</span><a href={`/work/${next.slug}/`} onClick={e=>{e.preventDefault();onProject(next);}}>{next.title} ↗</a></div>}</div></article>;
}
