(()=>{'use strict';
const tilt=c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');c.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*14+'deg')});c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})};
const W=document.querySelector('.watch');
if(W){const d=W.querySelector('.dial');for(let i=0;i<12;i++){const t=document.createElement('b');t.className='tk'+(i%3?'':' q');t.style.transform='rotate('+i*30+'deg)';d.appendChild(t)}
 const H=W.querySelector('.hh'),M=W.querySelector('.mh'),S=W.querySelector('.sh'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;let px=0,py=0;
 addEventListener('pointermove',e=>{px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5},{passive:true});
 const tick=t=>{const n=new Date(),s=n.getSeconds()+n.getMilliseconds()/1000,m=n.getMinutes()+s/60,h=n.getHours()%12+m/60;
  H.style.transform='translateZ(6px) rotate('+h*30+'deg)';M.style.transform='translateZ(8px) rotate('+m*6+'deg)';S.style.transform='translateZ(10px) rotate('+s*6+'deg)';
  W.style.setProperty('--ry',((rm?-18:Math.sin(t/1800)*26)+px*30)+'deg');W.style.setProperty('--rx',(-py*24)+'deg');requestAnimationFrame(tick)};
 requestAnimationFrame(tick)}
document.querySelectorAll('.card').forEach(tilt);
// Catálogo: se lee de products.json (edítalo en GitHub y la web se actualiza sola)
document.querySelectorAll('.grid[data-brand]').forEach(g=>{const b=g.dataset.base||'',br=g.dataset.brand,lim=+g.dataset.limit||99;
 fetch(b+'products.json',{cache:'no-cache'}).then(r=>r.ok?r.json():Promise.reject()).then(L=>{L=L.filter(x=>!br||x.brand===br).slice(0,lim);if(!L.length)return;
  g.replaceChildren(...L.map(x=>{const a=document.createElement('article'),im=new Image(),h=document.createElement('h3'),p=document.createElement('p'),pr=document.createElement('p'),l=document.createElement('a'),ok=x.stock,pc='$'+Number(x.price).toFixed(2);
   a.className='card';im.src=b+'uploads/'+x.img;im.alt=x.name+' - reloj '+x.brand+' de VIGIA WATCHES';im.width=im.height=600;im.loading='lazy';h.textContent=x.name;p.textContent=x.desc;pr.className='pr';pr.textContent=ok?pc:'Agotado';
   const m=ok?'Hola VIGIA WATCHES, quiero comprar este reloj:\n*'+x.name+'* ('+x.brand+')\nPrecio: '+pc+'\nFoto: '+g.dataset.domain+'/uploads/'+x.img+'\n\nCantidad:\nCiudad de entrega:\nComentarios:':'Hola, avísame cuando llegue el '+x.name;
   l.className='btn '+(ok?'fill':'ghost');l.rel='noopener noreferrer';l.href='https://wa.me/'+g.dataset.wa+'?text='+encodeURIComponent(m);l.textContent=ok?'Comprar por WhatsApp':'Avisarme cuando llegue';
   a.append(im,h,p,pr,l);tilt(a);return a}))}).catch(()=>{})});
})();
