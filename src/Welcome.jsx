import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';

export default function Welcome({children}){
 const [stage,setStage]=useState('loading');
 const enterButton=useRef(null), exitTimer=useRef(null);
 useEffect(()=>{
  let cancelled=false;
  const timers=[];
  const delay=ms=>new Promise(resolve=>timers.push(setTimeout(resolve,ms)));
  const fonts=document.fonts?.ready?.catch(()=>{})??Promise.resolve();
  Promise.all([delay(900),Promise.race([fonts,delay(3000)])]).then(()=>{if(!cancelled)setStage('welcome');});
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{cancelled=true;timers.forEach(clearTimeout);clearTimeout(exitTimer.current);document.body.style.overflow=previous;};
 },[]);
 useEffect(()=>{
  if(stage==='welcome')enterButton.current?.focus({preventScroll:true});
  if(stage==='ready'){
   document.body.style.overflow='';
   const heading=document.querySelector('main h1');
   heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});
   if(location.hash){document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'});}
  }
 },[stage]);
 const enter=()=>{
  if(stage!=='welcome')return;
  setStage('leaving');
  exitTimer.current=setTimeout(()=>setStage('ready'),matchMedia('(prefers-reduced-motion: reduce)').matches?0:550);
 };
 if(stage==='ready')return <div className="portfolio-reveal">{children}</div>;
 return <section className={`intro-screen intro-${stage}`} aria-label="Welcome to Simon Lee's portfolio" aria-busy={stage==='loading'}>
  <div className="intro-grain" aria-hidden="true"/>
  <div className="intro-top"><span className="intro-signature">Simon Lee.</span><span>TOKYO, JAPAN</span></div>
  <div className="intro-orbits" aria-hidden="true"><span/><span/><span/><i>✳</i></div>
  <div className="intro-content">
   <p className="eyebrow"><span className="status-dot"/> CODE, CURIOSITY & A LITTLE CREATIVITY</p>
   <h1>{stage==='loading'?'Good things take a moment.':'Welcome to my little corner.'}</h1>
   <p className="intro-description">{stage==='loading'?'Preparing the experience for you.':'I’m Simon. I turn thoughtful ideas into digital experiences. Come take a look around.'}</p>
   <div className="intro-action" aria-live="polite">
    {stage==='loading'?<div className="intro-loader" role="status"><div className="intro-loader-track"><span/></div><span>LOADING YOUR EXPERIENCE</span></div>:<button ref={enterButton} className="button primary intro-enter" onClick={enter} disabled={stage==='leaving'}>Enter portfolio <ArrowUpRight size={20}/></button>}
   </div>
  </div>
  <div className="intro-bottom"><span>SENIOR FULL STACK ENGINEER</span><span>BUILT WITH CARE. EXPLORED BY YOU.</span></div>
 </section>;
}
