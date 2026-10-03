import React, {useEffect, useRef} from 'react';

export default function Cursor(){
 const root=useRef(null),dot=useRef(null),ring=useRef(null);
 useEffect(()=>{
  const fine=matchMedia('(hover: hover) and (pointer: fine)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let x=0,y=0,rx=0,ry=0,frame=0,visible=false,last=0;
  const position=(el,px,py)=>{el.style.transform=`translate3d(${px}px,${py}px,0)`;};
  const draw=now=>{
   const delta=Math.min(now-last,50);last=now;
   const ease=reduced.matches?1:1-Math.exp(-delta/75);
   rx+=(x-rx)*ease;ry+=(y-ry)*ease;position(ring.current,rx,ry);
   if(Math.abs(x-rx)+Math.abs(y-ry)>.1)frame=requestAnimationFrame(draw);else frame=0;
  };
  const hide=()=>{visible=false;root.current.classList.remove('cursor-visible');document.documentElement.classList.remove('custom-cursor-active');cancelAnimationFrame(frame);frame=0;};
  const move=e=>{
   if(!fine.matches||e.pointerType==='touch'){hide();return;}
   x=e.clientX;y=e.clientY;
   if(!visible){rx=x;ry=y;visible=true;root.current.classList.add('cursor-visible');document.documentElement.classList.add('custom-cursor-active');position(ring.current,rx,ry);}
   position(dot.current,x,y);
   const interactive=e.target.closest?.('a,button,input,textarea,select,[role="button"]');
   root.current.classList.toggle('cursor-hover',!!interactive);
   if(!frame){last=performance.now();frame=requestAnimationFrame(draw);}
  };
  const down=()=>root.current.classList.add('cursor-pressed');
  const up=()=>root.current.classList.remove('cursor-pressed');
  const key=e=>{if(e.key==='Tab')hide();};
  const visibility=()=>{if(document.hidden)hide();};
  window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerdown',down);window.addEventListener('pointerup',up);window.addEventListener('blur',hide);window.addEventListener('keydown',key);document.documentElement.addEventListener('pointerleave',hide);document.addEventListener('visibilitychange',visibility);fine.addEventListener('change',hide);
  return()=>{hide();window.removeEventListener('pointermove',move);window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);window.removeEventListener('blur',hide);window.removeEventListener('keydown',key);document.documentElement.removeEventListener('pointerleave',hide);document.removeEventListener('visibilitychange',visibility);fine.removeEventListener('change',hide);};
 },[]);
 return <div ref={root} className="custom-cursor" aria-hidden="true"><div ref={ring} className="cursor-ring"><span/></div><div ref={dot} className="cursor-dot"><span/></div></div>;
}
