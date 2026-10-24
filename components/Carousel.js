'use client';
import {useEffect,useRef} from 'react';
import {spring,atRest} from '../lib/spring';
import ProjectArt from './ProjectArt';
export default function Carousel({projects,onProject}){
 const root=useRef(null),slides=useRef([]),suppress=useRef(false);
 useEffect(()=>{
  const el=root.current,preference=matchMedia('(prefers-reduced-motion: reduce)');
  const position={x:0,v:0};let width=480,step=496,center=0,total=1,target=0,frame=0,last=0,down=false,dragging=false,visible=true,disposed=false,startX=0,startY=0,startOffset=0,lastX=0,lastTime=0,pointerVelocity=0,wheelTimer=0,measured=false;
  function render(){for(let i=0;i<slides.current.length;i++){const slide=slides.current[i];const diff=((i*step-position.x+total/2)%total+total)%total-total/2;slide.style.transform=`translate3d(${center+diff}px,${Math.cos(diff*Math.PI/1000)*-48+48}px,0) rotate(${diff*.03}deg)`;slide.style.setProperty('--label-opacity',String(Math.max(0,Math.cos(diff*Math.PI/600))));}el.dataset.offset=position.x.toFixed(3);el.dataset.velocity=position.v.toFixed(3);}
  function measure(){const fraction=position.x/step;width=Math.min(480,el.clientWidth*.8);step=width+16;total=step*projects.length;center=(el.clientWidth-width)/2;if(measured){position.x=fraction*step;target=Math.round(fraction)*step;}measured=true;for(const slide of slides.current)slide.style.width=`${width}px`;el.style.height=`${width+155}px`;render();}
  function wake(){if(!frame&&visible&&!document.hidden&&!disposed)frame=requestAnimationFrame(tick);}
  function tick(now){frame=0;if(disposed||!visible||document.hidden)return;const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;
   if(preference.matches){position.x=target;position.v=0;}else if(down)spring(position,target,dt,1600,72);else spring(position,target,dt,105,18);
   render();if(!atRest(position,target))wake();else{position.x=target;position.v=0;render();last=0;}
  }
  function snap(direction=0){target=(Math.round(position.x/step)+direction)*step;wake();}
  function pointerDown(e){if(e.button!==0&&e.pointerType!=='touch')return;down=true;dragging=false;suppress.current=false;startX=lastX=e.clientX;startY=e.clientY;startOffset=position.x;lastTime=performance.now();pointerVelocity=0;target=position.x;clearTimeout(wheelTimer);}
  function pointerMove(e){if(!down)return;const now=performance.now();const elapsed=Math.max(8,now-lastTime);const instant=-(e.clientX-lastX)/elapsed*1000;pointerVelocity+= (Math.max(-4000,Math.min(4000,instant))-pointerVelocity)*(1-Math.exp(-elapsed/35));lastX=e.clientX;lastTime=now;
   if(!dragging&&Math.abs(e.clientX-startX)>6&&Math.abs(e.clientX-startX)>Math.abs(e.clientY-startY)){dragging=true;suppress.current=true;el.setPointerCapture(e.pointerId);el.dataset.dragging='true';}
   if(dragging){target=startOffset-(e.clientX-startX);wake();}
  }
  function pointerUp(e){if(!down)return;down=false;if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);delete el.dataset.dragging;
   if(dragging){const age=performance.now()-lastTime;const release=pointerVelocity*Math.exp(-age/90);position.v=Math.max(-3400,Math.min(3400,release*.7+position.v*.3));const projected=position.x+position.v*.20;target=Math.round(projected/step)*step;wake();}
   setTimeout(()=>{suppress.current=false;},0);dragging=false;
  }
  function wheel(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();target+=e.deltaX*.75;wake();clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>{target=Math.round(target/step)*step;wake();},140);}}
  function key(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();snap(e.key==='ArrowLeft'?-1:1);}}
  function visibility(){cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden&&!atRest(position,target))wake();}
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!atRest(position,target))wake();else if(!visible){cancelAnimationFrame(frame);frame=0;last=0;}});io.observe(el);
  const ro=new ResizeObserver(measure);ro.observe(el);measure();
  el.addEventListener('pointerdown',pointerDown);el.addEventListener('pointermove',pointerMove);el.addEventListener('pointerup',pointerUp);el.addEventListener('pointercancel',pointerUp);el.addEventListener('wheel',wheel,{passive:false});el.addEventListener('keydown',key);document.addEventListener('visibilitychange',visibility);preference.addEventListener('change',wake);
  return()=>{disposed=true;cancelAnimationFrame(frame);clearTimeout(wheelTimer);io.disconnect();ro.disconnect();el.removeEventListener('pointerdown',pointerDown);el.removeEventListener('pointermove',pointerMove);el.removeEventListener('pointerup',pointerUp);el.removeEventListener('pointercancel',pointerUp);el.removeEventListener('wheel',wheel);el.removeEventListener('keydown',key);document.removeEventListener('visibilitychange',visibility);preference.removeEventListener('change',wake);};
 },[projects]);
 return <div ref={root} className="carousel" tabIndex="0" role="region" aria-label="Featured projects, drag or use left and right arrow keys"><div className="carousel__track">{projects.map((p,i)=><article key={p.slug+i} ref={e=>slides.current[i]=e} className="carousel__slide"><a className="carousel__artwork" href={`/work/${p.slug}/`} aria-label={`View ${p.title||'project'}`} onClick={e=>{e.preventDefault();if(!suppress.current)onProject(p);}}><ProjectArt src={p.media[0].src} motion={p.media[0].motion} alt={p.title||'Project illustration'} width={960} height={960}/></a><a className="button" href={`/work/${p.slug}/`} onClick={e=>{e.preventDefault();if(!suppress.current)onProject(p);}}>{p.title||'View project'}</a></article>)}</div></div>
}
