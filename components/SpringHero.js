'use client';
import {useEffect,useRef,useState} from 'react';
import {spring,atRest} from '../lib/spring';
import ProjectArt from './ProjectArt';
export default function SpringHero({hero}){
 const root=useRef(null),cards=useRef([]);const [mounted,setMounted]=useState(false);
 useEffect(()=>{
  const element=root.current,preference=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,visible=true,disposed=false,px=0,py=0,pendingX=0,pendingY=0,inside=false,initialized=false;
  const start=performance.now(),states=cards.current.map((node,i)=>({node,cx:0,cy:0,x:{x:0,v:0},y:{x:0,v:0},rotation:{x:0,v:0},scale:{x:preference.matches?1:.1,v:0},delay:180+i*75}));
  function measure(){states.forEach(s=>{const r=s.node.getBoundingClientRect();s.cx=r.x+r.width/2;s.cy=r.y+scrollY+r.height/2;});}
  function wake(){if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function paint(s){s.node.style.setProperty('--offsetX',s.x.x.toFixed(3));s.node.style.setProperty('--offsetY',s.y.x.toFixed(3));s.node.style.setProperty('--velocity',(-s.rotation.x*4).toFixed(3));s.node.style.setProperty('--entry-scale',s.scale.x.toFixed(4));}
  function tick(now){frame=0;if(disposed||!visible||document.hidden)return;
   const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;let unsettled=false,energy=0;
   for(const s of states){
    if(preference.matches){s.x.x=s.x.v=s.y.x=s.y.v=s.rotation.x=s.rotation.v=0;s.scale.x=1;s.scale.v=0;}
    else{
     if(inside){const dx=(px-s.cx)/innerWidth*2,dy=(py+scrollY-s.cy)/innerHeight*2;const proximity=Math.max(0,1-Math.hypot(dx,dy));const force=proximity**6*9;s.x.v+=pendingX*force;s.y.v+=pendingY*force;}
     spring(s.x,0,dt,180,16);spring(s.y,0,dt,180,16);
     const tilt=Math.max(-14,Math.min(14,(s.x.v-s.y.v)*.009));spring(s.rotation,tilt,dt,220,20);
     if(now-start>=s.delay)spring(s.scale,1,dt,230,18);
    }
    paint(s);energy+=Math.abs(s.x.x)+Math.abs(s.y.x)+Math.abs(s.x.v)+Math.abs(s.y.v);
    unsettled=unsettled||!atRest(s.x)||!atRest(s.y)||!atRest(s.rotation)||!atRest(s.scale,1);
   }
   pendingX=pendingY=0;element.dataset.energy=energy.toFixed(3);
   if(unsettled)wake();else last=0;
  }
  function enter(e){px=e.clientX;py=e.clientY;inside=true;initialized=true;}
  function move(e){if(preference.matches)return;if(!initialized){enter(e);return;}const events=e.getCoalescedEvents?.()||[e];for(const event of events.length?events:[e]){pendingX+=Math.max(-140,Math.min(140,event.clientX-px));pendingY+=Math.max(-140,Math.min(140,event.clientY-py));px=event.clientX;py=event.clientY;}pendingX=Math.max(-180,Math.min(180,pendingX));pendingY=Math.max(-180,Math.min(180,pendingY));inside=true;wake();}
  function leave(){inside=false;initialized=false;pendingX=pendingY=0;wake();}
  function visibility(){cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden)wake();}
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;last=0;}});io.observe(element);
  const ro=new ResizeObserver(()=>{measure();wake();});ro.observe(element);measure();wake();setMounted(true);
  element.addEventListener('pointerenter',enter,{passive:true});element.addEventListener('pointermove',move,{passive:true});element.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);preference.addEventListener('change',wake);
  return()=>{disposed=true;cancelAnimationFrame(frame);io.disconnect();ro.disconnect();element.removeEventListener('pointerenter',enter);element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);preference.removeEventListener('change',wake);};
 },[hero]);
 const words=text=>text.split(' ').map((word,i)=><span key={i} className="hero-word-group"><span className="word" style={{'--delay':i}}>{word}</span>{i<text.split(' ').length-1?' ':null}</span>);
 return <section ref={root} className="hero" mounted={String(mounted)} aria-label="Introduction"><div className="hero__mid"><h1 aria-label={hero.headline.line_a}>{words(hero.headline.line_a)}</h1><div className="hero__images" aria-label="Project illustrations">{hero.images.map((image,i)=><div ref={e=>cards.current[i]=e} className="hero__image" key={image.src+i} style={{'--delay':i,'--offsetX':0,'--offsetY':0,'--velocity':0,'--entry-scale':1}}><div className="shadow"/><ProjectArt src={image.src} motion={image.motion} width={400} height={400} alt={image.alt||''} priority/></div>)}</div><h2 aria-label={hero.headline.line_b}>{words(hero.headline.line_b)}</h2></div><div className="hero__top"><p>{hero.details_top.line_a}</p><a href={`mailto:${hero.details_top.line_b}`}><small>{hero.details_top.line_b}</small></a></div><div className="hero__bot"><p>{hero.details_bottom.line_a}</p><small>{hero.details_bottom.line_b}</small></div></section>
}
