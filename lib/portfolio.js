import {themes} from './themes';
import {getPosts} from './posts';
import {projects} from './projects.js';
import {details} from './project-details.js';
const domains=['dental','commerce','delivery','retail','news','communication','privacy','accountability','media','ridesharing'];
export const studies=projects.map((p,i)=>({...p,details:details[p.slug],title:p.name,description:p.summary,role:p.kind,technology:p.tech,contribution:p.role,media:[{src:`/covers/${domains[i]}-cutout.webp`,motion:['dental','retail'].includes(domains[i])?`/covers/${domains[i]}-motion.webp`:undefined,type:'image'}],illustration:true}));
export const portfolio={
 posts:getPosts(),
 hero:{headline:{line_a:'Web apps, websites, mobile products & AI integration.',line_b:'I’m Amir, a software developer with interests in mathematics, science, history, geopolitics and semiconductors.'},details_top:{line_a:'Amir Rimal / Toowoomba, Queensland',line_b:'rimalamir17@gmail.com'},details_bottom:{line_a:'Independent products & team contributions',line_b:'Web / APIs / Mobile'},images:[studies[0],studies[4],studies[8],studies[5]].map(p=>({src:p.media[0].src,motion:p.media[0].motion,alt:`${p.title} illustration`}))},
 sections:[{title:'Featured work',description:'Selected projects and my contribution',projects:[studies[0],studies[1],studies[4],studies[5],studies[6],studies[8],studies[9]]},{title:'More work',description:'Mobile, web and the systems between them',projects:studies}],
 themes
};
