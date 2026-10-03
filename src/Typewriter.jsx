import React, {useEffect, useState} from 'react';

const roles=['Full Stack Engineer','React Developer','Backend Developer','Problem Solver'];
export default function Typewriter(){
 const [text,setText]=useState(roles[0]);
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let timer,index=0,count=0,deleting=false;
  const tick=()=>{
   const role=roles[index];
   count+=deleting?-1:1;setText(role.slice(0,count));
   let delay=deleting?38:78;
   if(!deleting&&count===role.length){deleting=true;delay=1900;}
   else if(deleting&&count===0){deleting=false;index=(index+1)%roles.length;delay=320;}
   timer=setTimeout(tick,delay);
  };
  const start=()=>{
   clearTimeout(timer);index=0;count=0;deleting=false;
   if(reduced.matches||document.hidden){setText(roles[0]);return;}
   setText('');timer=setTimeout(tick,350);
  };
  start();reduced.addEventListener('change',start);document.addEventListener('visibilitychange',start);
  return()=>{clearTimeout(timer);reduced.removeEventListener('change',start);document.removeEventListener('visibilitychange',start);};
 },[]);
 return <div className="hero-role"><span className="sr-only">I’m a Full Stack Engineer, React Developer, Backend Developer, and Problem Solver.</span><span aria-hidden="true">I’m a <strong className="typed-role">{text}<span className="typing-caret"/></strong></span></div>;
}
