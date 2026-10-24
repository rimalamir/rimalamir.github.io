'use client';
import {useContext,useEffect,useRef,useState,useId} from 'react';
import {ArtworkMotion} from './ArtworkMotion';
const styles={
 ridesharing:{ink:'#24365c',accent:'#6c9aeb',light:'#b9e5f4',bg:'#e2edf9',label:'A closer pickup'},
 dental:{ink:'#173d31',accent:'#7bdb9f',light:'#d5f7ce',bg:'#e8f5d9',label:'Care, connected'},
 commerce:{ink:'#352833',accent:'#ff8a60',light:'#ffcf8a',bg:'#ffe6d6',label:'One system. Many stores.'},
 delivery:{ink:'#353143',accent:'#ff714e',light:'#ffd172',bg:'#ffecd0',label:'Always moving forward'},
 retail:{ink:'#193d39',accent:'#50cfa3',light:'#b8ec75',bg:'#e0f2de',label:'A shop in your pocket'},
 news:{ink:'#242c57',accent:'#7085fa',light:'#c9d4ff',bg:'#e6eaff',label:'Signals into stories'},
 communication:{ink:'#412747',accent:'#c383e3',light:'#fac3d6',bg:'#f5e1f1',label:'A little closer'},
 privacy:{ink:'#1e4147',accent:'#54c8d0',light:'#b7eee1',bg:'#dbf3ed',label:'Here, then gone'},
 accountability:{ink:'#4b3029',accent:'#ff9763',light:'#ffd97a',bg:'#ffead7',label:'Intent into action'},
 media:{ink:'#24345c',accent:'#6288f2',light:'#a5d9f3',bg:'#e0edfa',label:'Motion, in focus'}
};
function Star({x,y,size=12,...props}){return <path {...props} d={`M${x} ${y-size}Q${x} ${y} ${x+size} ${y}Q${x} ${y} ${x} ${y+size}Q${x} ${y} ${x-size} ${y}Q${x} ${y} ${x} ${y-size}Z`}/>;}
function Eyes({x,y,gap=35}){return <g className="art-blink" style={{transformOrigin:`${x+gap/2}px ${y}px`}}><ellipse cx={x} cy={y} rx="10" ry="15" fill="#fffdf6"/><ellipse cx={x+gap} cy={y} rx="10" ry="15" fill="#fffdf6"/><g className="art-look" stroke="none"><ellipse cx={x+2} cy={y+2} rx="4.5" ry="7" fill="var(--art-ink)"/><ellipse cx={x+gap+2} cy={y+2} rx="4.5" ry="7" fill="var(--art-ink)"/></g></g>;}
function Smile({x,y,w=30}){return <path d={`M${x} ${y}q${w/2} ${w*.65} ${w} 0`} fill="none" strokeWidth="4"/>;}
function Scene({kind,paint}){
 if(kind==='ridesharing')return <>
  {Array.from({length:19},(_,i)=>{const coords=[[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1],[2,0],[1,1],[0,2],[-1,2],[-2,2],[-2,1],[-2,0],[-1,-1],[0,-2],[1,-2],[2,-2],[2,-1]];const [q,r]=coords[i],x=200+46*(q+r/2),y=174+40*r;const points=Array.from({length:6},(_,j)=>{const a=(j*60-30)*Math.PI/180;return `${x+26*Math.cos(a)},${y+26*Math.sin(a)}`;}).join(' ');return <polygon key={i} points={points} fill={i<7?'var(--art-light)':'none'} strokeWidth="1.6" opacity={i<7?.65:.22}/>;})}
  <path className="art-flow" d="M103 225q32-72 96-62t102-53" fill="none" strokeDasharray="6 7" strokeWidth="4"/>
  <ellipse cx="199" cy="292" rx="91" ry="13" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-scooter"><path d="m105 223 23-53q7-15 24-15h94q17 0 24 15l24 53v39H105z" fill={paint}/><path d="m139 172-16 41h155l-16-41z" fill="#eaf8ff"/><Eyes x={175} y={191} gap={36}/><path d="M122 245h21m112 0h21" stroke="#fff9dd" strokeWidth="9"/><Smile x={183} y={253} w={31}/><rect x="115" y="261" width="30" height="17" rx="6" fill="var(--art-ink)"/><rect x="254" y="261" width="30" height="17" rx="6" fill="var(--art-ink)"/></g>
  <g className="art-small-orbit"><path d="M304 135q-36-36-24-55a28 28 0 0 1 48 0q12 19-24 55z" fill="var(--art-accent)"/><circle cx="304" cy="88" r="9" fill="#fffdf6"/></g>
  <Star className="art-spark" x={84} y={127} size={18} fill="var(--art-accent)"/>
 </>;
 if(kind==='dental')return <>
  <ellipse className="art-shadow" cx="202" cy="319" rx="89" ry="14" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-hero-bounce"><path d="M112 145c-19-48 10-79 49-70 24 5 33 15 49 12 43-18 84-17 88 33 3 35-18 59-26 86-10 29-11 89-36 94-23 4-13-62-33-61-24 0-12 66-37 62-28-5-27-67-37-100z" fill={paint}/><path d="M137 115q9-23 39-10" fill="none" stroke="#fff" strokeWidth="9" opacity=".75"/><Eyes x={165} y={158}/><Smile x={170} y={191} w={34}/><ellipse cx="145" cy="185" rx="10" ry="5" fill="#f6b5a2" stroke="none"/><ellipse cx="228" cy="185" rx="10" ry="5" fill="#f6b5a2" stroke="none"/>
  <g className="art-wave" style={{transformOrigin:'263px 185px'}}><path d="M267 187q36 16 45-14m-7 1 8-13m-7 13 14-3" fill="none" strokeWidth="7"/></g>
  <g transform="rotate(-12 121 242)"><rect x="81" y="217" width="64" height="64" rx="19" fill="var(--art-accent)"/><path d="M103 231h20v13h13v18h-13v13h-20v-13H90v-18h13z" transform="translate(2 -4) scale(.9)" fill="#fffdf6" stroke="none"/></g></g>
  <Star className="art-spark" x={302} y={90} size={22} fill="var(--art-accent)"/><Star className="art-spark art-late" x={79} y={157} size={13} fill="#fffdf6"/>
 </>;
 if(kind==='commerce')return <>
  <ellipse cx="206" cy="317" rx="113" ry="16" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-hero-bounce"><path d="m101 184 105-52 104 52v91l-104 53-105-53z" fill="var(--art-accent)"/><path d="m101 184 105 51 104-51-104-52z" fill="var(--art-light)"/><path d="M206 235v93m-66-162 106 52v31l29-15v-31l-105-52" fill="#fff5dd"/>
  <Eyes x={134} y={237} gap={32}/><Smile x={137} y={268} w={30}/><path d="M122 203l23 11" stroke="#fff" strokeWidth="6"/></g>
  <g className="art-small-orbit"><rect x="252" y="65" width="77" height="75" rx="20" fill="#fffdf6" transform="rotate(12 290 102)"/><path d="M265 87h49l-5 17h-39z" fill="var(--art-accent)"/><path d="M273 106v20h32v-20" fill="var(--art-light)"/></g>
  <g className="art-float-left"><circle cx="89" cy="111" r="28" fill="#fffdf6"/><path d="M89 94v34m10-28c-26-12-27 17-6 13 19-3 12 22-13 12" fill="none" strokeWidth="4"/></g>
  <Star className="art-spark" x={315} y={310} size={16} fill="var(--art-light)"/>
 </>;
 if(kind==='delivery')return <>
  <path className="art-road" d="M39 309h322" strokeWidth="5" strokeDasharray="18 15" opacity=".25"/>
  <g className="art-scooter"><g className="art-wheel" style={{transformOrigin:'129px 279px'}}><circle cx="129" cy="279" r="31" fill="var(--art-ink)"/><circle cx="129" cy="279" r="17" fill="var(--art-light)"/><path d="m117 268 24 22m0-22-24 22"/></g><g className="art-wheel" style={{transformOrigin:'279px 279px'}}><circle cx="279" cy="279" r="31" fill="var(--art-ink)"/><circle cx="279" cy="279" r="17" fill="var(--art-light)"/><path d="m267 268 24 22m0-22-24 22"/></g>
  <path d="M101 264q8-56 53-52h34l24 39h34l-17-71h-17v-13h36l31 98H101z" fill="var(--art-accent)"/><path d="M111 204h65" strokeWidth="14"/><path d="M185 212l22-34-30-25" fill="none" strokeWidth="17"/><path d="m196 174 35 5" strokeWidth="11"/>
  <path d="M168 153q-28-22-20-50 8-24 31-19 28 5 21 43l-9 21z" fill="var(--art-light)"/><path d="M146 111c-3-50 63-58 65-7l-33-4-9 20z" fill="var(--art-accent)"/><path d="M173 144l-14 30 28 25" strokeWidth="20" fill="none"/><circle cx="191" cy="116" r="3" fill="var(--art-ink)"/><path d="M186 130q7 6 13-1" fill="none"/>
  <rect x="67" y="160" width="77" height="53" rx="10" fill="var(--art-light)"/><path d="M98 161v51m-13-35h8"/></g>
  {[0,1,2].map(i=><path key={i} className="art-speed" style={{'--art-delay':`${i*-.25}s`}} d={`M${42-i*8} ${124+i*28}h${40+i*9}`} fill="none" strokeWidth="5" opacity=".5"/>)}
  <g className="art-float-left"><path d="M303 159q-37-39-24-57a28 28 0 0 1 48 0q13 18-24 57z" fill="#fffdf6"/><circle cx="303" cy="112" r="8" fill="var(--art-accent)"/></g>
 </>;
 if(kind==='retail')return <>
  <ellipse cx="200" cy="324" rx="100" ry="15" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-hero-bounce"><path d="m111 156 171-12 22 161-202 10z" fill={paint}/><path d="M151 161v-38c0-59 89-59 89 0v31" fill="none" strokeWidth="13"/><path d="M163 150v-26c0-40 66-43 66-3v30" fill="none" stroke="#fffdf6" strokeWidth="4" opacity=".55"/><Eyes x={170} y={217} gap={39}/><Smile x={176} y={250} w={34}/><path d="m119 181-6 94" stroke="#fffdf6" strokeWidth="7" opacity=".55"/><circle cx="150" cy="159" r="5" fill="var(--art-ink)"/><circle cx="241" cy="152" r="5" fill="var(--art-ink)"/></g>
  <g className="art-float-left" transform="rotate(-18 94 114)"><rect x="61" y="80" width="58" height="66" rx="13" fill="var(--art-light)"/><path d="m76 103 12-8 15 7v20H76z" fill="#fffdf6"/></g>
  <g className="art-small-orbit"><path d="M285 77h45v70h-45z" fill="#fffdf6" transform="rotate(17 307 112)"/><path d="m291 111 9 9 18-23" fill="none" strokeWidth="5"/></g>
  <Star className="art-spark" x={328} y={258} size={20} fill="var(--art-light)"/>
 </>;
 if(kind==='news')return <>
  <ellipse cx="211" cy="326" rx="106" ry="14" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-hero-bounce"><path d="m131 91 152 12 15 211-180-7z" fill="var(--art-accent)" transform="rotate(7 208 202)"/><path d="M108 92h161v190q0 28-24 28H108z" fill="#fffdf6"/><path d="M269 282v-36h27v40q0 24-27 24h-24q24 0 24-28z" fill="var(--art-light)"/><rect x="128" y="113" width="121" height="62" rx="10" fill={paint}/><Eyes x={157} y={143} gap={36}/><path d="M130 196h103m-103 17h77m-77 17h103m-103 17h54m-54 17h103" strokeWidth="5" opacity=".45"/><path d="M130 285h60" strokeWidth="7"/></g>
  {[[40,139,-14],[292,163,14],[293,56,-10]].map(([x,y,r],i)=><g key={i} className={`art-news-tile art-tile-${i}`} style={{'--art-delay':`${i*-.7}s`}}><g transform={`rotate(${r} ${x+24} ${y+26})`}><rect x={x} y={y} width="52" height="58" rx="10" fill={i===1?'var(--art-accent)':'var(--art-light)'}/><path d={`M${x+11} ${y+17}h30m-30 11h21m-21 11h30`} strokeWidth="3"/></g></g>)}
  <Star className="art-spark" x={70} y={281} size={22} fill="var(--art-accent)"/>
 </>;
 if(kind==='communication')return <>
  <path d="M59 277c30-14 14-50 47-60m157-14c49 2 9-86 62-93" fill="none" strokeDasharray="7 9" className="art-flow" opacity=".5"/>
  <g className="art-hero-bounce"><path d="M91 90h147q29 0 29 29v77q0 29-29 29h-83l-45 34 3-34H91q-29 0-29-29v-77q0-29 29-29z" fill={paint}/><path d="M87 111h65" stroke="#fff" strokeWidth="7" opacity=".55"/><Eyes x={134} y={156} gap={40}/><Smile x={140} y={186} w={33}/></g>
  <g className="art-reply"><path d="M214 216h91q26 0 26 26v42q0 26-26 26h-9v24l-37-24h-45q-26 0-26-26v-42q0-26 26-26z" fill="var(--art-light)"/>{[0,1,2].map(i=><circle key={i} className="art-dot" style={{'--art-delay':`${i*-.2}s`}} cx={231+i*25} cy="263" r="6" fill="var(--art-ink)" stroke="none"/>)}</g>
  <g className="art-heart"><path d="M310 72c-24-27-47 8 0 34 47-26 24-61 0-34z" fill="var(--art-light)"/></g>
 </>;
 if(kind==='privacy')return <>
  <ellipse cx="204" cy="324" rx="100" ry="14" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-hero-bounce"><rect x="102" y="128" width="191" height="177" rx="31" fill={paint}/><path d="M142 130V99c0-72 110-72 110 0v30" fill="none" strokeWidth="21"/><path d="M146 125V99c0-65 102-65 102 0v25" stroke="#fff" opacity=".6" fill="none" strokeWidth="6"/>
  <Eyes x={162} y={196} gap={42}/><path d="M183 241a13 13 0 1 1 26 0q0 8-7 12v16h-12v-16q-7-4-7-12z" fill="var(--art-ink)" stroke="none"/><path d="M120 165v73" stroke="#fff" strokeWidth="7" opacity=".55"/></g>
  {[0,1,2,3,4].map(i=><g key={i} className="art-vanish" style={{'--art-delay':`${i*-.5}s`}}><rect x={46+i%2*263} y={94+i*43} width="20" height="20" rx="6" fill={i%2?'var(--art-accent)':'#fffdf6'} transform={`rotate(${i*14} ${56+i%2*263} ${104+i*43})`}/></g>)}
  <Star className="art-spark" x={304} y={69} size={15} fill="var(--art-accent)"/>
 </>;
 if(kind==='accountability')return <>
  <path d="M50 312h86v-45h82v-50h91v-50h48" fill="none" strokeWidth="17" stroke="var(--art-light)"/>
  <g className="art-hero-bounce"><path d="m159 240-27 42-27 2m109-40 22 34 27 2" fill="none" strokeWidth="10"/><rect x="109" y="86" width="151" height="155" rx="35" fill={paint} transform="rotate(-8 185 164)"/><path d="m143 163 25 25 55-63" fill="none" stroke="#fffdf6" strokeWidth="17"/><path className="art-wave" d="M254 156q33 4 44-27" fill="none" strokeWidth="8" style={{transformOrigin:'254px 156px'}}/><path d="m117 191-28 17-16-8" fill="none" strokeWidth="8"/></g>
  <g className="art-heart"><circle cx="314" cy="91" r="29" fill="var(--art-light)"/><path d="m300 91 10 10 18-22" fill="none" strokeWidth="5"/></g>
  {[0,1,2,3].map(i=><path key={i} className="art-confetti" style={{'--art-delay':`${i*-.4}s`}} d={`M${65+i*80} ${65+i%2*25}l${i%2?8:-8} -12`} stroke={i%2?'var(--art-accent)':'var(--art-ink)'} strokeWidth="7"/>)}
 </>;
 return <>
  <ellipse cx="206" cy="325" rx="113" ry="14" fill="var(--art-ink)" opacity=".12" stroke="none"/>
  <g className="art-back-frame"><rect x="66" y="102" width="229" height="168" rx="22" fill="var(--art-light)" transform="rotate(-15 180 186)"/></g>
  <g className="art-hero-bounce"><rect x="89" y="104" width="237" height="185" rx="23" fill={paint} transform="rotate(9 207 196)"/><rect x="97" y="101" width="213" height="176" rx="19" fill="#fffdf6"/><rect x="111" y="115" width="185" height="139" rx="10" fill="var(--art-light)"/><circle cx="254" cy="149" r="20" fill="#ffd375" stroke="none"/><path d="m111 230 59-65 47 45 29-26 50 53v17H111z" fill="var(--art-accent)"/><path d="m111 230 59-65 21 20" fill="none" stroke="#fffdf6" strokeWidth="5" opacity=".7"/>
  <g className="art-play"><circle cx="204" cy="190" r="25" fill="#fffdf6"/><path d="m198 176 19 14-19 14z" fill="var(--art-ink)" stroke="none"/></g></g>
  <g className="art-small-orbit"><circle cx="82" cy="286" r="28" fill="var(--art-accent)"/><path d="M69 286h26m-13-13v26" stroke="#fffdf6" strokeWidth="5"/></g>
  <Star className="art-spark" x={317} y={80} size={23} fill="var(--art-accent)"/>
 </>;
}
export default function ProceduralArt({kind,alt='',width=960,height=960,autoplay=false,...props}){
 const root=useRef(null),permitted=useContext(ArtworkMotion),[playing,setPlaying]=useState(false),palette=styles[kind]||styles.media;
 useEffect(()=>{
  const svg=root.current,area=svg.closest('.project-stack,.carousel__slide,.hero__image,.case-cover')||svg;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');let hovered=false,visible=false;
  const update=()=>setPlaying(permitted&&(autoplay||hovered)&&visible&&!preference.matches&&!document.hidden);
  const enter=e=>{if(e.pointerType!=='touch'){hovered=true;update();}};
  const leave=()=>{hovered=false;svg.style.setProperty('--look-x','0px');svg.style.setProperty('--look-y','0px');update();};
  const move=e=>{if(!permitted||preference.matches||e.pointerType==='touch')return;const box=svg.getBoundingClientRect();svg.style.setProperty('--look-x',`${Math.max(-4,Math.min(4,(e.clientX-box.left-box.width/2)/box.width*10))}px`);svg.style.setProperty('--look-y',`${Math.max(-3,Math.min(3,(e.clientY-box.top-box.height/2)/box.height*8))}px`);};
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});io.observe(svg);
  area.addEventListener('pointerenter',enter);area.addEventListener('pointermove',move,{passive:true});area.addEventListener('pointerleave',leave);area.addEventListener('pointercancel',leave);
  preference.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{io.disconnect();area.removeEventListener('pointerenter',enter);area.removeEventListener('pointermove',move);area.removeEventListener('pointerleave',leave);area.removeEventListener('pointercancel',leave);preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
 },[permitted,autoplay]);
 const id=useId().replaceAll(':',''),paint=`url(#art-${id})`;
 return <svg {...props} ref={root} className="procedural-art" viewBox="0 0 400 400" width={width} height={height} role="img" aria-label={alt||palette.label} data-art-kind={kind} data-playing={playing?'true':'false'} style={{'--art-ink':palette.ink,'--art-accent':palette.accent,'--art-light':palette.light,'--art-bg':palette.bg}}>
  <defs><linearGradient id={`art-${id}`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor={kind==='dental'?'#fffef5':palette.light}/><stop offset="1" stopColor={kind==='dental'?'#e2f2d5':palette.accent}/></linearGradient></defs>
  <rect width="400" height="400" rx="30" fill={palette.bg}/>
  <circle cx="210" cy="190" r="137" fill={palette.light} opacity=".38"/>
  <g fill="none" stroke={palette.ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><Scene kind={kind} paint={paint}/></g>
 </svg>;
}
