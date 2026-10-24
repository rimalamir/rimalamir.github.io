'use client';
import {useContext,useEffect,useRef,useState} from 'react';
import {ArtworkMotion} from './ArtworkMotion';
import ProceduralArt from './ProceduralArt';
function RasterArt({src,motion,alt='',width=960,height=960,priority=false,lazy=false,...props}){
 const ref=useRef(null),[animate,setAnimate]=useState(false),[hovered,setHovered]=useState(false),permitted=useContext(ArtworkMotion);
 useEffect(()=>{
  if(!motion)return;
  const image=ref.current,preference=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
  const update=()=>setAnimate(hovered&&permitted&&visible&&!preference.matches&&!document.hidden);
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{rootMargin:'50px'});io.observe(image);
  preference.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{io.disconnect();preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
 },[motion,permitted,hovered]);
 return <img {...props} ref={ref} onPointerEnter={event=>{if(event.pointerType!=='touch')setHovered(true);props.onPointerEnter?.(event);}} onPointerLeave={event=>{setHovered(false);props.onPointerLeave?.(event);}} onPointerCancel={event=>{setHovered(false);props.onPointerCancel?.(event);}} src={animate&&hovered&&motion?motion:src} alt={alt} width={width} height={height} draggable="false" loading={lazy?'lazy':'eager'} fetchPriority={priority?'high':undefined}/>;
}

export default function ProjectArt({src,autoplay=false,...props}){
 const kind=src?.match(/^\/covers\/([a-z]+)-cutout\.webp$/)?.[1];
 return kind?<ProceduralArt kind={kind} autoplay={autoplay} alt={props.alt} width={props.width} height={props.height}/>:<RasterArt src={src} {...props}/>;
}
