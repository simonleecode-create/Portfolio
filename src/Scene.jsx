import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

export default function Scene(){
 const host=useRef(null);
 useEffect(()=>{
  const el=host.current;
  let renderer;
  try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});} catch {return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  el.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,1,.1,60);camera.position.z=10;
  scene.add(new THREE.AmbientLight(0xb8dab5,1.7));
  const light=new THREE.DirectionalLight(0xe4ffd0,4);light.position.set(-3,5,6);scene.add(light);
  const rim=new THREE.PointLight(0x6daea5,32);rim.position.set(4,-2,4);scene.add(rim);
  const world=new THREE.Group();scene.add(world);
  const waves=new THREE.Group();scene.add(waves);
  const waveGeometries=[];
  const waveMaterial=new THREE.LineBasicMaterial({color:0x8cac79,transparent:true,opacity:.16});
  for(let strand=0;strand<35;strand++){
   const vertices=[];
   for(let step=0;step<=100;step++){
    const t=step/100;
    vertices.push(new THREE.Vector3(-9+t*18,Math.sin(t*7+strand*.055)*1.1+strand*.075-1.3,Math.cos(t*5+strand*.06)*1.2-3));
   }
   const geometry=new THREE.BufferGeometry().setFromPoints(vertices);waveGeometries.push(geometry);waves.add(new THREE.Line(geometry,waveMaterial));
  }
  waves.rotation.z=.43;
  const objects=[];
  const add=(geometry,position,scale,color,wire=false)=>{
   const material=new THREE.MeshStandardMaterial({color,metalness:.55,roughness:.29,wireframe:wire,transparent:true,opacity:wire?.38:.88});
   const mesh=new THREE.Mesh(geometry,material);mesh.position.set(...position);mesh.scale.setScalar(scale);mesh.rotation.set(.6,.3,.4);world.add(mesh);
   objects.push({mesh,base:mesh.position.clone(),phase:objects.length*1.7});return mesh;
  };
  add(new THREE.TorusGeometry(1.1,.32,28,80),[2.5,.45,0],1.05,0xa6c78e);
  add(new THREE.IcosahedronGeometry(1,1),[4,2.1,-1],.62,0x9fbea8,true);
  add(new THREE.OctahedronGeometry(1),[.5,2.2,.7],.33,0xb9dca2);
  add(new THREE.TorusKnotGeometry(.65,.15,90,10),[3,-2,1],.62,0x829d85,true);
  add(new THREE.IcosahedronGeometry(1,0),[-4.8,-1.65,-.8],.48,0x738d72,true);
  add(new THREE.TorusGeometry(.65,.085,10,64),[-4.3,2.7,-2],.8,0xacc78b);
  add(new THREE.OctahedronGeometry(1),[4.9,-.8,-1],.25,0xa5c497);
  const orbitGeo=new THREE.TorusGeometry(2,.006,4,120);
  const orbitMat=new THREE.MeshBasicMaterial({color:0xb6d8a0,transparent:true,opacity:.23});
  const orbit=new THREE.Mesh(orbitGeo,orbitMat);orbit.position.set(2.5,.45,0);orbit.rotation.set(1.1,.4,-.4);world.add(orbit);
  const dustGeo=new THREE.BufferGeometry(),positions=new Float32Array(420*3);
  for(let i=0;i<positions.length;i+=3){positions[i]=(Math.random()-.5)*16;positions[i+1]=(Math.random()-.5)*10;positions[i+2]=(Math.random()-.5)*7;}
  dustGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const dustMat=new THREE.PointsMaterial({color:0xcde6b8,size:.018,transparent:true,opacity:.5});
  const dust=new THREE.Points(dustGeo,dustMat);world.add(dust);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,last=0,time=0,px=0,py=0,scroll=window.scrollY;
  const resize=()=>{renderer.setSize(el.clientWidth,el.clientHeight);camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();world.scale.setScalar(innerWidth<700?.72:1);world.position.x=innerWidth<700?-1.2:0;renderStill();};
  const renderStill=()=>renderer.render(scene,camera);
  const pointer=e=>{px=(e.clientX/innerWidth-.5)*.65;py=(e.clientY/innerHeight-.5)*.45;};
  const onScroll=()=>{scroll=window.scrollY;};
  const draw=now=>{
   if(document.hidden||reduced.matches){frame=0;renderStill();return;}
   const dt=Math.min((now-last)/1000,.05);last=now;time+=dt;
   objects.forEach(({mesh,base,phase},i)=>{mesh.rotation.x+=dt*(.1+i*.018);mesh.rotation.y+=dt*(.16+i*.015);mesh.position.y=base.y+Math.sin(time*.5+phase)*.16;});
   camera.position.x+=(px-camera.position.x)*.035;camera.position.y+=(-py-camera.position.y)*.035;camera.lookAt(0,0,0);
   world.rotation.y+=((scroll*.00012)-world.rotation.y)*.025;
   orbit.rotation.z+=dt*.06;dust.rotation.y+=dt*.012;waves.rotation.y=Math.sin(time*.1)*.2;waves.position.y=Math.sin(time*.15)*.25;
   renderer.render(scene,camera);frame=requestAnimationFrame(draw);
  };
  const resume=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=performance.now();if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(draw);else renderStill();};
  resize();const observer=new ResizeObserver(resize);observer.observe(el);
  window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});document.addEventListener('visibilitychange',resume);reduced.addEventListener('change',resume);resume();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',onScroll);document.removeEventListener('visibilitychange',resume);reduced.removeEventListener('change',resume);objects.forEach(({mesh})=>{mesh.geometry.dispose();mesh.material.dispose();});waveGeometries.forEach(geo=>geo.dispose());waveMaterial.dispose();orbitGeo.dispose();orbitMat.dispose();dustGeo.dispose();dustMat.dispose();renderer.dispose();el.removeChild(renderer.domElement);};
 },[]);
 return <div className="scene-background" ref={host} aria-hidden="true"/>;
}
