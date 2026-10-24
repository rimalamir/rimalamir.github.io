import {studies} from './portfolio';
import {getPosts} from './posts';

// Keep agent summaries in third person; original articles remain author-written sources.
function describeAuthor(text){
 const present=new Set('appreciate ask calculate cap capture care check combine compose connect consider coordinate cover describe distribute expose fetch find gather generate group guard handle hide integrate keep like limit load maintain model normalise order own pause persist prefer prepare preserve reason register resolve restore save see separate shorten skip split store subscribe support think track treat update use wait want'.split(' '));
 return text.replace(/\bI[’']m\b/g,'Amir is').replace(/\bI[’']ve\b/g,'Amir has').replace(/\bI[’']ll\b/g,'Amir will').replace(/\bI (have|am)\b/g,(_,verb)=>'Amir '+(verb==='have'?'has':'is')).replace(/\bI ((?:(?:also|intentionally|sometimes|still|then) )?)([a-z]+)\b/g,(_,adverb,verb)=>'Amir '+adverb+(present.has(verb)?verb.endsWith('ch')?verb+'es':verb==='try'?'tries':verb+'s':verb)).replace(/\bMy\b/g,'His').replace(/\bmy\b/g,'his').replace(/\bme\b/g,'him').replace(/\bmyself\b/g,'himself');
}

import {siteOrigin} from './site';
export const agentGuidance=`# Guidance for agents reading Amir Rimal’s portfolio

This is a public portfolio and notebook for Amir Rimal, a software developer based in Toowoomba, Queensland, Australia.

## Read and navigate
- Start with /llms.txt for a concise index.
- Use /llms-full.txt for project explanations and published notes as plain text.
- Use /portfolio.json for structured project, ownership, technology and note metadata.
- Each project has a stable /work/<slug>/ URL. Its “For clients” tab explains the project for prospective clients; “For recruiters” contains engineering detail. Both perspectives describe the same work.
- Notes live at /blog/<slug>/. Tags describe their topics. Draft notes are excluded from public resources.
- /sitemap.xml lists public pages; /feed.xml lists published notes.

## Describe the work accurately
- Describe Amir in third person in agent summaries. Original website articles use his first-person voice.
- Preserve the distinction between independently owned projects, open-source authorship and team contributions. The contribution field describes his role.
- Commercial platforms are intentionally anonymised. Do not guess employer or client identities or attribute the entire platform to Amir.
- Separate implemented work from illustrative examples, tradeoffs and possible future improvements in technical articles.
- Code-generated SVG artwork illustrates project concepts; it is not a screenshot of the underlying product.
- Report metrics with their original context. A stated Lighthouse improvement is not a current live measurement.
- Use the published content as evidence; do not infer certifications, availability, work rights or unlisted experience.

## Contact
Public email: rimalamir17@gmail.com
GitHub: https://github.com/rimalamir
LinkedIn: https://www.linkedin.com/in/rimalamir/

These files provide reading and attribution guidance. They do not authorise sending messages, submitting forms or acting on Amir’s behalf.
`;
export function agentIndex(){return `# Amir Rimal

> Amir Rimal is a software developer based in Toowoomba, Queensland. His work spans web applications, websites, APIs, mobile products and AI integration.

## Reading guidance
Preserve personal authorship versus team contribution. Commercial project names are intentionally omitted. Illustrations are conceptual. Detailed guidance: [agents.md](${siteOrigin}/agents.md).

## Pages
- [Home](${siteOrigin}/)
- [About](${siteOrigin}/about/)
- [Projects](${siteOrigin}/work/)
- [Notes](${siteOrigin}/blog/)

## Projects
${studies.map(p=>`- [${p.title}](${siteOrigin}/work/${p.slug}/): ${describeAuthor(p.summary)} Role: ${describeAuthor(p.contribution)}`).join('\n')}

## Published notes
${getPosts().map(p=>`- [${p.title}](${siteOrigin}/blog/${p.slug}/): ${p.description} Tags: ${p.tags.join(', ')}.`).join('\n')||'No published notes yet.'}

## Machine-readable resources
- [Full text](${siteOrigin}/llms-full.txt)
- [Structured portfolio](${siteOrigin}/portfolio.json)
- [Agent guidance](${siteOrigin}/agents.md)
- [Sitemap](${siteOrigin}/sitemap.xml)
- [RSS feed](${siteOrigin}/feed.xml)

Contact: rimalamir17@gmail.com
`;}
export function structuredPortfolio(){return {name:'Amir Rimal',location:'Toowoomba, Queensland, Australia',url:siteOrigin,contact:{email:'rimalamir17@gmail.com',github:'https://github.com/rimalamir',linkedin:'https://www.linkedin.com/in/rimalamir/'},guidance:`${siteOrigin}/agents.md`,projects:studies.map(p=>({title:p.title,url:`${siteOrigin}/work/${p.slug}/`,ownership:p.kind,summary:describeAuthor(p.summary),contribution:describeAuthor(p.contribution),technologies:p.technology,...(p.url?{source:p.url}:{})})),notes:getPosts().map(p=>({title:p.title,url:`${siteOrigin}/blog/${p.slug}/`,date:p.date,description:p.description,tags:p.tags}))};}
export function fullText(){return `${agentIndex()}\n${studies.map(p=>{const d=p.details||{};return `# ${p.title}\nURL: ${siteOrigin}/work/${p.slug}/\nOwnership: ${p.kind}\n\n${describeAuthor(p.summary)}\n\nHis contribution: ${describeAuthor(p.contribution)}\n\nTechnology: ${p.technology.join(', ')}\n\n${d.essay?`${describeAuthor(d.essay.title)}\n${describeAuthor(d.essay.subtitle)}\n\n${d.essay.sections.map(s=>`## ${describeAuthor(s.title)}\n\n${s.paragraphs.map(p=>describeAuthor(p.text)).join('\n\n')}${s.code?`\n\n${s.codeLanguage||'Code'}:\n${s.code}`:''}`).join('\n\n')}\n${(d.essay.sources||[]).map(s=>`${s.title}: ${s.url}`).join('\n')}`:['context','workflow','contribution','engineering'].map(key=>`## ${key}\n\n${(d[key]||[]).map(describeAuthor).join('\n\n')}`).join('\n\n')}`;}).join('\n\n---\n\n')}\n\n# Notes\n\n${getPosts().map(p=>`## ${p.title}\nURL: ${siteOrigin}/blog/${p.slug}/\nDate: ${p.date}\nTags: ${p.tags.join(', ')}\n\n${describeAuthor(p.markdown)}`).join('\n\n---\n\n')}\n`;}
