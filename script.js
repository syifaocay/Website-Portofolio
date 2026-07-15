/* ══════════════════════════════════════
   THEME CONTROLLER
══════════════════════════════════════ */
const Theme = (() => {
  const KEY = 'au-theme';
  const root = document.documentElement;
  let pref = localStorage.getItem(KEY) || 'system';
  const mq = matchMedia('(prefers-color-scheme:dark)');
  const isDark = p => p==='dark' || (p==='system' && mq.matches);
  function apply(p) {
    root.setAttribute('data-theme', isDark(p) ? 'dark' : 'light');
    document.querySelectorAll('.theme-toggle input').forEach(cb => cb.checked = isDark(p));
  }
  function toggle() { pref = isDark(pref) ? 'light' : 'dark'; localStorage.setItem(KEY, pref); apply(pref); }
  mq.addEventListener('change', () => { if (pref==='system') apply('system'); });
  apply(pref);
  return { toggle };
})();



/* ══════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // trigger hero entrance
    requestAnimationFrame(() => document.getElementById('home').classList.add('hero-animate'));
  }, 650);
});

/* ══════════════════════════════════════
   PROJECTS
══════════════════════════════════════ */
const projects = [
  {
    title: "Customer Segmentation Analysis – Supermarket",
    category: "analytics",
    desc: "Identified high-value customer segments to optimize marketing spend and campaign targeting.",
    metrics: "Income-spend correlation: 0.79",
    tech: ["Python", "Pandas", "Seaborn", "K-Means"],
    link: "https://github.com/syifaocay/Analisa-Segment-Pelanggan-Supermarket"
  },
  {
    title: "Customer Churn Prediction – Telecom",
    category: "ml",
    desc: "Successfully identified 228 out of 258 customers at risk of churning with model LightGBM.",
    metrics: "Recall: 88.37%  |  ROC-AUC: 0.832",
    tech: ["LightGBM", "Handle Imbalance", "Python"],
    link: "https://github.com/syifaocay/Customer-Churn-Prediction-Model"
  },
  {
    title: "Bank Marketing Campaign Optimization",
    category: "ml",
    desc: "Cut telemarketing costs by ~89% by predicting which customers were actually likely to open a term deposit",
    metrics: "F1 Score: 51.29%  |  NCR Resampling",
    tech: ["XGBoost", "Handle Imbalance", "Python"],
    link: "https://github.com/jcdspurwadhika/JCDSAH-024_Delta"
  },
  {
    title: "Motorcycle Sales Performance Dashboard",
    category: "analytics",
    type: "dashboard",
    desc: "Interactive business dashboard to analyze motorcycle sales performance based on branch, product, sales channel, and daily trends. This dashboard helps identify best-selling products, top-performing branches, and opportunities to boost sales through data analysis.",
    tech: ["Looker Studio", "Data Visualization"],
    image: "dashboard-motor.png",
    live: "https://datastudio.google.com/reporting/baf63300-3494-47b1-8e9c-111000d18abb/page/WscgF",
    github: "https://github.com/syifaocay"
  },
  {
    title: "Titanic passenger Survival Analysis Dashboard",
    category: "analytics",
    type: "dashboard",
    desc: "Interactive dashboard exploring Titanic passenger survival patterns based on class, gender, and age. Designed to uncover the key factors influencing survival rates through intuitive and clear data visualizations.",
    tech: ["Tableau", "Data Visualization"],
    image: "dashboard-titanic.png",
    live: "https://public.tableau.com/app/profile/ahmad.syifaul.umam/viz/TugasTitanicPassengerList/Dashboard1",
    github: "https://github.com/syifaocay"
  },
  {
    title: "Supermarket Customer Analytics Dashboard",
    category: "analytics",
    type: "dashboard",
    desc: "Customer analytics dashboard analyzing shopping behavior, marketing campaign effectiveness, product category contributions, and the relationship between income and spending to support data-driven business strategies.",
    tech: ["Tableau", "Customer Analytics"],
    image: "dashboard-supermarket.png",
    live: "https://public.tableau.com/app/profile/ahmad.syifaul.umam/viz/DashboardSupermarket_17646908624520/DashboardSupermarket",
    github: "https://github.com/syifaocay"
  }
];
function renderProjects(data) {
  const g = document.getElementById('projectsGrid'); g.innerHTML='';
  data.forEach(p => {
    const tags = p.tech.map(t=>`<span class="tag">${t}</span>`).join('');
    const catClass = p.category==='ml' ? 'cat-ml' : 'cat-analytics';
    const catLabel = p.category==='ml' ? 'Machine Learning' : 'Analytics';
    const el = document.createElement('div');
    if (p.type === 'dashboard') {
      const idx = projects.indexOf(p);
      el.className = 'proj-card dash-card glow-card reveal';
      el.innerHTML = `<div class="glow-inner">
        <div class="proj-cat ${catClass}"><span class="cat-dot"></span>${catLabel}</div>
        <div class="dash-thumb-wrap" tabindex="0" role="button" aria-label="Preview ${p.title}" onclick="openDashModal(${idx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDashModal(${idx})}">
          <div class="dash-thumb-media">
            <div class="dash-thumb-placeholder" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <img src="${p.image}" alt="${p.title} preview" loading="lazy" onerror="this.style.display='none'">
          </div>
          <div class="dash-thumb-overlay">
            <div class="dash-overlay-icon">🔍</div>
            <div class="dash-overlay-text">Preview Dashboard</div>
            <div class="dash-overlay-sub">Click to View</div>
          </div>
        </div>
        <div class="proj-title">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-tech">${tags}</div>
        <div><a href="${p.live}" target="_blank" class="proj-link">Live Demo →</a></div>
      </div>`;
    } else {
      el.className = 'proj-card glow-card reveal';
      el.innerHTML = `<div class="glow-inner"><div class="proj-cat ${catClass}"><span class="cat-dot"></span>${catLabel}</div><div class="proj-title">${p.title}</div><div class="proj-desc">${p.desc}</div><div class="proj-metrics">${p.metrics}</div><div class="proj-tech">${tags}</div><div><a href="${p.link}" target="_blank" class="proj-link">View on GitHub →</a></div></div>`;
    }
    g.appendChild(el);
  });
  bindGlowCards(); observeReveal(); bindDashTilt();
}
function filterProjects(el) {
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  const f = el.dataset.filter;
  renderProjects(f==='all' ? projects : projects.filter(p=>p.category===f));
}

/* ══════════════════════════════════════
   TYPING ROLE
══════════════════════════════════════ */
const roles = ["Data Analyst","Data Scientist","ML Engineer"];
let ri = 0;
(function cycleRole(){
  document.getElementById('roleText').textContent = roles[ri];
  ri = (ri+1) % roles.length;
  setTimeout(cycleRole, 2800);
})();

/* HELPERS */
function scrollTop(){window.scrollTo({top:0,behavior:'smooth'})}
function toggleMobileNav(){document.getElementById('mobileNav').classList.toggle('open')}

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
const cur=document.getElementById('cur'), curRing=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
document.addEventListener('mousedown',()=>document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',()=>document.body.classList.remove('cursor-click'));
(function animCursor(){
  rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
  cur.style.transform=`translate(${mx}px,${my}px)`;
  curRing.style.transform=`translate(${rx}px,${ry}px)`;
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a,button,.filter-btn,.theme-toggle').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});

/* ══════════════════════════════════════
   GLOW CARDS
══════════════════════════════════════ */
const isTouchDevice = matchMedia('(hover:none) and (pointer:coarse)').matches;
let glowScrollIO = null;

function bindGlowCards(){
  document.querySelectorAll('.glow-card').forEach(card=>{
    if(isTouchDevice){
      if(card.dataset.touchGlowBound) return; // hindari binding ganda saat re-render
      card.dataset.touchGlowBound = '1';
      card.addEventListener('touchstart',e=>{
        const t = e.touches[0];
        const r = card.getBoundingClientRect();
        card.style.setProperty('--cx', ((t.clientX-r.left)/r.width*100).toFixed(1)+'%');
        card.style.setProperty('--cy', ((t.clientY-r.top)/r.height*100).toFixed(1)+'%');
        card.classList.add('touch-glow','pulsing');
      },{passive:true});
      card.addEventListener('touchend',()=>{
        setTimeout(()=>card.classList.remove('touch-glow','pulsing'), 900);
      },{passive:true});
    } else {
      card.addEventListener('mousemove',e=>{
        const r=card.getBoundingClientRect();
        card.style.setProperty('--cx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
        card.style.setProperty('--cy',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
      });
      card.addEventListener('mouseenter',()=>card.classList.add('pulsing'));
      card.addEventListener('mouseleave',()=>card.classList.remove('pulsing'));
    }
  });
  if(isTouchDevice) observeGlowScroll();
}

/* Auto-glow ringan saat card masuk area tengah layar (pengganti hover di mobile) */
function observeGlowScroll(){
  if(!glowScrollIO){
    glowScrollIO = new IntersectionObserver(entries=>entries.forEach(entry=>{
      const el = entry.target;
      if(entry.isIntersecting){
        el.style.setProperty('--cx','50%');
        el.style.setProperty('--cy','38%');
        el.classList.add('touch-glow');
      } else {
        el.classList.remove('touch-glow');
      }
    }),{threshold:.55});
  }
  document.querySelectorAll('.glow-card').forEach(card=>glowScrollIO.observe(card));
}

/* ══════════════════════════════════════
   DASHBOARD THUMB — light 3D tilt (desktop only)
══════════════════════════════════════ */
function bindDashTilt(){
  if(isTouchDevice) return;
  const MAX=6;
  document.querySelectorAll('.dash-thumb-wrap').forEach(wrap=>{
    if(wrap.dataset.tiltBound) return;
    wrap.dataset.tiltBound='1';
    const media = wrap.querySelector('.dash-thumb-media');
    wrap.addEventListener('mousemove', e=>{
      const r=wrap.getBoundingClientRect();
      const nx=(e.clientX-r.left)/r.width-.5;
      const ny=(e.clientY-r.top)/r.height-.5;
      media.style.transform=`rotateX(${(-ny*MAX).toFixed(2)}deg) rotateY(${(nx*MAX).toFixed(2)}deg)`;
    });
    wrap.addEventListener('mouseleave', ()=>{ media.style.transform=''; });
  });
}

/* ══════════════════════════════════════
   DASHBOARD PREVIEW MODAL
══════════════════════════════════════ */
function openDashModal(idx){
  const p = projects[idx];
  if(!p) return;
  const img = document.getElementById('dashModalImg');
  img.src = p.image; img.alt = p.title+' preview';
  document.getElementById('dashModalTitle').textContent = p.title;
  document.getElementById('dashModalOverview').textContent = p.desc;
  document.getElementById('dashModalTech').innerHTML = p.tech.map(t=>`<span class="tag">${t}</span>`).join('');
  const catClass = p.category==='ml' ? 'cat-ml' : 'cat-analytics';
  const catLabel = p.category==='ml' ? 'Machine Learning' : 'Analytics';
  const catEl = document.getElementById('dashModalCat');
  catEl.className = 'proj-cat '+catClass;
  catEl.innerHTML = `<span class="cat-dot"></span>${catLabel}`;
  const liveBtn = document.getElementById('dashModalLive');
  liveBtn.href = p.live || '#';
  const ghBtn = document.getElementById('dashModalGithub');
  if(p.github){ ghBtn.href = p.github; ghBtn.style.display='inline-flex'; } else { ghBtn.style.display='none'; }
  document.getElementById('dashModalOverlay').classList.add('open');
  document.body.classList.add('modal-open');
}
function closeDashModal(e){
  if(e && e.type==='click' && e.target!==e.currentTarget) return;
  document.getElementById('dashModalOverlay').classList.remove('open');
  document.body.classList.remove('modal-open');
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDashModal(); });

/* ══════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════ */
document.querySelectorAll('.mag-btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.25}px)`;
  });
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function observeReveal(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
  }),{threshold:.1});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>io.observe(el));
}

/* ══════════════════════════════════════
   HERO PARTICLE CANVAS
══════════════════════════════════════ */
(function heroParticles(){
  const canvas=document.getElementById('hero-canvas');
  const heroEl=document.getElementById('home');
  if(!canvas||!heroEl)return;
  const ctx=canvas.getContext('2d');
  const isMobile=()=>window.innerWidth<768;
  let W,H,mouse={x:-999,y:-999},particles=[];
  function gc(n){return getComputedStyle(document.documentElement).getPropertyValue(`--particle-color-${n}`).trim()||(n===1?'0,212,255':'124,58,237')}
  function resize(){const r=heroEl.getBoundingClientRect();W=canvas.width=r.width;H=canvas.height=r.height}
  function Particle(){
    this.reset=function(){this.x=Math.random()*W;this.y=Math.random()*H;this.r=Math.random()*1.6+.4;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.base=Math.random()*.35+.08;this.a=this.base;this.ci=Math.random()>.65?1:2};
    this.reset();
    this.update=function(){
      this.x+=this.vx;this.y+=this.vy;
      if(this.x<0||this.x>W)this.vx*=-1;if(this.y<0||this.y>H)this.vy*=-1;
      if(!isMobile()){const dx=mouse.x-this.x,dy=mouse.y-this.y,d=Math.sqrt(dx*dx+dy*dy);this.a=d<180?Math.min(1,this.base+((180-d)/180)*.7):this.base}
    };
    this.draw=function(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${gc(this.ci)},${this.a.toFixed(2)})`;ctx.fill()};
  }
  function initP(){const cap=isMobile()?40:120;particles=Array.from({length:Math.min(Math.floor(W*H/9000),cap)},()=>new Particle())}
  function drawLines(){
    const c1=gc(1);
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        const mdx=mouse.x-particles[i].x,mdy=mouse.y-particles[i].y,md=Math.sqrt(mdx*mdx+mdy*mdy);
        const b=(!isMobile()&&md<220)?.18*(1-d/120)*(1-md/220):.06*(1-d/120);
        ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=`rgba(${c1},${b.toFixed(3)})`;ctx.lineWidth=.6;ctx.stroke();
      }
    }
  }
  (function loop(){ctx.clearRect(0,0,W,H);drawLines();particles.forEach(p=>{p.update();p.draw()});requestAnimationFrame(loop)})();
  if(!isMobile()){
    heroEl.addEventListener('mousemove',e=>{const r=heroEl.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
    heroEl.addEventListener('mouseleave',()=>{mouse.x=-999;mouse.y=-999});
  }
  window.addEventListener('resize',()=>{resize();initP()});
  resize();initP();
})();

/* ══════════════════════════════════════
   HERO SPOTLIGHT FOLLOW (mouse)
══════════════════════════════════════ */
(function(){
  const spot=document.getElementById('heroSpotlight');
  const hero=document.getElementById('home');
  if(!spot||!hero||window.innerWidth<768)return;
  hero.addEventListener('mousemove',e=>{
    const r=hero.getBoundingClientRect();
    spot.style.background=`radial-gradient(500px circle at ${e.clientX-r.left}px ${e.clientY-r.top}px,var(--spotlight-color) 0%,var(--spotlight-color2) 40%,transparent 70%)`;
  });
  hero.addEventListener('mouseleave',()=>spot.style.background='none');
})();

/* ══════════════════════════════════════
   3D TILT — HERO IMAGE
══════════════════════════════════════ */
(function(){
  const tilt=document.getElementById('photoTilt');
  const glow=document.getElementById('tiltGlow');
  if(!tilt||window.innerWidth<768)return;
  const MAX=12;
  tilt.addEventListener('mousemove',e=>{
    const r=tilt.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width-.5;  // -0.5 to 0.5
    const ny=(e.clientY-r.top)/r.height-.5;
    const rx_=-ny*MAX, ry_=nx*MAX;
    tilt.style.transform=`perspective(800px) rotateX(${rx_}deg) rotateY(${ry_}deg) scale(1.02)`;
    // glow follows
    glow.style.setProperty('--tg-x',`${(nx+.5)*100}%`);
    glow.style.setProperty('--tg-y',`${(ny+.5)*100}%`);
  });
  tilt.addEventListener('mouseleave',()=>{tilt.style.transform='';});
})();

/* ══════════════════════════════════════
   TIMELINE — animated progress + reveal + active highlight
══════════════════════════════════════ */
(function(){
  const wrap=document.getElementById('timelineWrap');
  const prog=document.getElementById('timelineProgress');
  const items=[...document.querySelectorAll('[data-tl]')];
  if(!wrap||!prog)return;

  /* Reveal items with IntersectionObserver */
  const revealIO=new IntersectionObserver(entries=>entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('tl-visible'),i*120);
      revealIO.unobserve(e.target);
    }
  }),{threshold:.15});
  items.forEach(item=>revealIO.observe(item));

  /* Scroll: grow timeline line + highlight current */
  function updateTimeline(){
    const wr=wrap.getBoundingClientRect();
    const wh=window.innerHeight;
    // how far we've scrolled through the timeline
    const start=wr.top;
    const end=wr.bottom;
    const visible=wh-start;
    const total=end-start;
    const pct=Math.min(100,Math.max(0,(visible/total)*100));
    prog.style.height=pct+'%';

    // highlight nearest item
    let closestItem=null, closestDist=Infinity;
    items.forEach(item=>{
      const r=item.getBoundingClientRect();
      const center=r.top+r.height/2;
      const dist=Math.abs(center-wh*.45);
      if(dist<closestDist){closestDist=dist;closestItem=item}
    });
    items.forEach(item=>{
      const inView=item.getBoundingClientRect().top<wh*.8&&item.getBoundingClientRect().bottom>0;
      item.classList.toggle('tl-current',item===closestItem&&inView);
    });
  }
  window.addEventListener('scroll',updateTimeline,{passive:true});
  updateTimeline();

  /* Hover lift effect */
  items.forEach(item=>{
    item.addEventListener('mouseenter',()=>item.classList.add('tl-hovering'));
    item.addEventListener('mouseleave',()=>item.classList.remove('tl-hovering'));
  });
})();

/* INIT */
renderProjects(projects);
bindGlowCards();
observeReveal();
