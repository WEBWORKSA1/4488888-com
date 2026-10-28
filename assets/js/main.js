/* 4488888 — Lucky Numbers Lab | site script (no dependencies) */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  /* ---------- Private inbox routing (address is never written in the page) ---------- */
  var _q=[96,98,110,35,97,100,108,96,106,77,60,108,126,102,127,98,122,111,104,122];
  function inbox(){return _q.map(function(c){return String.fromCharCode(c^13)}).join('').split('').reverse().join('')}
  function endpoint(){return 'https://formsubmit.co/ajax/'+inbox()}
  $$('[data-mail]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      var s=a.getAttribute('data-mail')||'Inquiry from 4488888.com';
      window.location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(s);
    });
  });

  /* ---------- Theme ---------- */
  var root=document.documentElement,tb=$('#themeBtn');
  if(tb)tb.addEventListener('click',function(){var n=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',n);store('ln-theme',n)});

  /* ---------- Menu ---------- */
  var bg=$('#burger'),menu=$('#menu');
  if(bg&&menu)bg.addEventListener('click',function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰'});
  var here=location.pathname.replace(/index\.html$/,'');
  $$('#menu a').forEach(function(a){var h=a.pathname.replace(/index\.html$/,'');if(h===here||(h.length>1&&h.slice(-1)==='/'&&here.indexOf(h)===0)){a.classList.add('active');a.setAttribute('aria-current','page')}});

  /* ---------- Reveal ---------- */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1});
    $$('.reveal').forEach(function(el){io.observe(el)});
  }else $$('.reveal').forEach(function(el){el.classList.add('in')});

  /* ---------- Cookie notice ---------- */
  var ck=$('#cookie');
  if(ck&&!store('ln-cookie'))ck.classList.add('show');
  $$('[data-cookie]').forEach(function(b){b.addEventListener('click',function(){store('ln-cookie',b.getAttribute('data-cookie'));ck.classList.remove('show')})});
  $$('.year').forEach(function(el){el.textContent=new Date().getFullYear()});

  /* ---------- Forms (all submissions route privately) ---------- */
  $$('form.js-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=$('.form-msg',f);
      if(f._honey&&f._honey.value)return;
      if(!f.checkValidity()){f.reportValidity();return}
      var btn=$('button[type=submit]',f),old=btn?btn.textContent:'';
      if(btn){btn.disabled=true;btn.textContent='Sending…'}
      var data={};
      new FormData(f).forEach(function(v,k){if(k!=='_honey')data[k]=data[k]?data[k]+', '+v:v});
      data._subject='[4488888.com] '+(f.getAttribute('data-subject')||'Form')+' — '+(data.name||data.email||'');
      data._template='table';data._captcha='false';data.page=location.href;
      fetch(endpoint(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){if(!r.ok)throw new Error('bad');return r.json().catch(function(){return {}})})
        .then(function(){
          if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Thank you — we will reply within 48 hours.'}
          f.reset();resetSteps(f);
        })
        .catch(function(){if(msg){msg.className='form-msg err';msg.textContent='Network error — please try again in a minute.'}})
        .then(function(){if(btn){btn.disabled=false;btn.textContent=old}});
    });
  });

  /* ---------- Multi-step lead form ---------- */
  function resetSteps(f){
    var st=$$('.step',f);if(!st.length)return;
    st.forEach(function(s,i){s.classList.toggle('active',i===0)});
    $$('.steps-ind span',f).forEach(function(s,i){s.classList.toggle('on',i===0)});
    f._go&&f._go(0,true);
  }
  $$('form.multistep').forEach(function(f){
    var steps=$$('.step',f),ind=$$('.steps-ind span',f),i=0;
    function go(n,force){
      if(!force&&n>i){var bad=$$('input,select,textarea',steps[i]).filter(function(x){return !x.checkValidity()});if(bad.length){bad[0].reportValidity();return}}
      i=Math.max(0,Math.min(steps.length-1,n));
      steps.forEach(function(s,k){s.classList.toggle('active',k===i)});
      ind.forEach(function(s,k){s.classList.toggle('on',k<=i)});
    }
    f._go=function(n,force){i=0;go(n,force)};
    $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){go(i+1)})});
    $$('[data-prev]',f).forEach(function(b){b.addEventListener('click',function(){go(i-1)})});
  });
  /* Prefill valuation form from ?n= */
  var qn=new URLSearchParams(location.search).get('n');
  if(qn){var vf=$('#v-number');if(vf)vf.value=qn.replace(/[^\dA-Za-z .\-]/g,'').slice(0,40)}

  /* ---------- YouTube facades ---------- */
  $$('.video[data-yt]').forEach(function(v){
    var id=v.getAttribute('data-yt');if(!/^[\w-]{11}$/.test(id))return;
    v.innerHTML='<img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg"><div class="play"><span>▶</span></div>';
    v.setAttribute('role','button');v.setAttribute('tabindex','0');v.setAttribute('aria-label','Play video');
    function play(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="YouTube video" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'}
    v.addEventListener('click',play,{once:true});
    v.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}},{once:true});
  });

  /* ---------- Search filters ---------- */
  $$('[data-filter]').forEach(function(inp){
    var sel=inp.getAttribute('data-filter');
    inp.addEventListener('input',function(){var q=inp.value.toLowerCase();$$(sel).forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none'})});
  });

  /* ---------- Tabs ---------- */
  $$('.tool-tabs button').forEach(function(b){
    b.addEventListener('click',function(){
      $$('.tool-tabs button').forEach(function(x){x.classList.toggle('on',x===b)});
      $$('.tool').forEach(function(t){t.classList.toggle('on',t.id===b.getAttribute('data-tool'))});
      history.replaceState(null,'','#'+b.getAttribute('data-tool'));
    });
  });
  if(location.hash){var hb=$('.tool-tabs button[data-tool="'+location.hash.slice(1)+'"]');if(hb)hb.click()}

  /* =====================================================================
     NUMBER ENGINE
     ===================================================================== */
  var CN={0:{s:1,w:'líng — zero / completeness'},1:{s:1,w:'yī — unity, the first, "must" (yào)'},2:{s:1.2,w:'èr — pairs, "good things come in pairs"'},3:{s:1.2,w:'sān — sounds like "birth/life" (Cantonese sāang)'},4:{s:-3,w:'sì — near-homophone of "death" (sǐ); also read as 世/事 in phrases'},5:{s:0,w:'wǔ — "me/I" (wǒ); "not" (wú) in some dialects'},6:{s:2,w:'liù — "smooth, flowing" (liú)'},7:{s:0,w:'qī — "arise" or "together"; the 7th month is the ghost month'},8:{s:3,w:'bā — rhymes with fā, "prosper, get rich"'},9:{s:2,w:'jiǔ — "long-lasting" (jiǔ 久)'}};
  var JP={0:0,1:1,2:1,3:1,4:-3,5:1,6:1,7:2,8:2,9:-2};
  var WEST={1:'Leader, initiative, new beginnings',2:'Partnership, diplomacy, balance',3:'Creativity, expression, joy',4:'Stability, structure, hard work',5:'Freedom, change, adventure',6:'Care, harmony, responsibility',7:'Insight, analysis, the seeker',8:'Ambition, money, authority, material success',9:'Compassion, completion, humanitarian',11:'Master number — intuition and inspiration',22:'Master number — the master builder',33:'Master number — the master teacher'};
  var VEDIC={1:'Sun (Surya) — authority',2:'Moon (Chandra) — emotion',3:'Jupiter (Guru) — wisdom & growth',4:'Rahu — the unexpected, unconventional',5:'Mercury (Budha) — commerce & communication',6:'Venus (Shukra) — luxury & art',7:'Ketu — spirituality, detachment',8:'Saturn (Shani) — discipline, karma, slow wealth',9:'Mars (Mangal) — energy & courage'};
  var COMBOS=[['888','triple prosperity (fā fā fā)',10],['8888','quadruple prosperity',8],['168','yī lù fā — "prosper all the way"',9],['518','wǒ yào fā — "I will prosper"',8],['520','wǔ èr líng — "I love you"',4],['1314','yī shēng yī shì — "for a lifetime"',5],['666','"everything goes smoothly"',8],['999','"long-lasting forever"',7],['88','double prosperity / "bye-bye" in chat',6],['66','double smoothness',4],['99','long, long time',4],['28','"easy money" (Cantonese yi faat)',5],['18','"will prosper" (yāo bā ≈ yào fā)',4],['58','"me prosper"',3],['68','"smooth prosperity"',5],['98','"prosperity that lasts"',4],['14','"want to die" (yào sǐ) — avoided',-8],['24','"easy death" (Cantonese) — avoided',-6],['74','"surely die" (Cantonese) — avoided',-6],['54','"I die" — avoided',-5],['44','double four — strongly avoided in most Chinese markets',-6],['49','Japanese "suffer to death" (shiku) — avoided',-4],['250','"idiot" slang in Mandarin',-4]];

  function clean(s){return String(s||'').replace(/\D/g,'')}
  function droot(n){var s=n.split('').reduce(function(a,b){return a+ +b},0);while(s>9&&[11,22,33].indexOf(s)<0){s=String(s).split('').reduce(function(a,b){return a+ +b},0)}return s}
  function plainRoot(n){var r=droot(n);if(r>9)r=String(r).split('').reduce(function(a,b){return a+ +b},0);return r||9}
  function clamp(x){return Math.max(0,Math.min(100,Math.round(x)))}

  function analyze(raw){
    var n=clean(raw);if(!n)return null;
    var L=n.length,d=n.split('');
    /* Chinese score */
    var cnRaw=d.reduce(function(a,c){return a+CN[c].s},0)/L;
    var combosHit=[],cbonus=0;
    COMBOS.forEach(function(c){
      if(n.indexOf(c[0])<0)return;
      if((c[0]==='888'||c[0]==='88')&&n.indexOf('8888')>-1)return;
      if(c[0]==='88'&&n.indexOf('888')>-1)return;
      combosHit.push(c);cbonus+=c[2]});
    var love=n.indexOf('1314')>-1;
    var fourCount=(n.match(/4/g)||[]).length-(love?1:0);
    var tail=n.slice(-3);var tailBonus=(/[869]$/.test(n)?6:0)+(tail==='888'?6:0)-(/4$/.test(n)&&!love?8:0);
    var chinese=clamp(50+cnRaw*14+cbonus*1.4+tailBonus-fourCount*3);
    /* Japanese */
    var jp=clamp(55+d.reduce(function(a,c){return a+JP[c]},0)/L*16-(n.indexOf('49')>-1?12:0)-(n.indexOf('42')>-1?8:0));
    /* Pattern / memorability */
    var uniq=new Set(d).size,run=1,maxRun=1;
    for(var i=1;i<L;i++){if(d[i]===d[i-1]){run++;maxRun=Math.max(maxRun,run)}else run=1}
    var asc=0,desc=0;for(i=1;i<L;i++){if(+d[i]===+d[i-1]+1)asc++;if(+d[i]===+d[i-1]-1)desc++}
    var pal=n===n.split('').reverse().join('');
    var half=L%2===0&&n.slice(0,L/2)===n.slice(L/2);
    var pattern=clamp(20+(L-uniq)/Math.max(1,L-1)*40+(maxRun-1)/Math.max(1,L-1)*30+Math.max(asc,desc)/Math.max(1,L-1)*25+(pal?12:0)+(half?12:0)+(L<=4?10:0)-(L>10?10:0));
    /* Numerology */
    var r=droot(n),pr=plainRoot(n);
    var numer=clamp({1:78,2:62,3:76,4:58,5:70,6:74,7:64,8:86,9:80}[pr]+([11,22,33].indexOf(r)>-1?10:0));
    var overall=clamp(chinese*.38+pattern*.34+numer*.16+jp*.12);
    var tier=overall>=85?'S — Collector grade':overall>=72?'A — Premium':overall>=58?'B — Desirable':overall>=45?'C — Standard':'D — Below market';
    var fours=(n.match(/4/g)||[]).length,eights=(n.match(/8/g)||[]).length;
    return {n:n,L:L,chinese:chinese,jp:jp,pattern:pattern,numer:numer,overall:overall,tier:tier,root:r,proot:pr,combos:combosHit,fours:fours,eights:eights,uniq:uniq,maxRun:maxRun,pal:pal};
  }
  window.LN={analyze:analyze,droot:droot};

  function renderAnalysis(box,res,ctx){
    if(!res){box.innerHTML='<p class="note">Enter at least one digit.</p>';box.classList.add('show');return}
    var digits=res.n.split('').map(function(c){var cls=c==='8'?'great':(c==='6'||c==='9')?'good':c==='4'?'bad':'';return '<span class="'+cls+'" title="'+esc(CN[c].w)+'">'+c+'</span>'}).join('');
    var combos=res.combos.length?res.combos.map(function(c){return '<li><b class="mono">'+c[0]+'</b> — '+esc(c[1])+(c[2]<0?' <span style="color:var(--red)">(negative)</span>':'')+'</li>'}).join(''):'<li>No classic combinations detected.</li>';
    var adv=[];
    if(res.fours&&res.eights)adv.push('Mixed signal: '+res.fours+'× four and '+res.eights+'× eight. In mainland/Cantonese markets each 4 can discount value sharply; in Western and many Indian contexts the 4s read as stability and repetition, which helps memorability.');
    else if(res.fours)adv.push('Contains '+res.fours+'× four — price this for Western buyers first, or market it with a positive reading (世 "generation" / 事 "matters").');
    if(res.eights>=3)adv.push('Strong 8-density ('+res.eights+'×) — the core driver of value with Chinese-speaking buyers.');
    if(res.maxRun>=4)adv.push('A run of '+res.maxRun+' identical digits — high recall, ideal for advertising and call-tracking.');
    if(res.pal)adv.push('Palindrome — reads the same both ways; a collector feature.');
    if(res.L>=10&&ctx==='domain')adv.push('Long numeric domains (10+ digits) trade mostly on pattern, not length — keep expectations modest.');
    var ctxNote={phone:'For phone numbers, the last 4–6 digits matter most; carriers and resellers price repeating endings at a premium.',plate:'For plates, fewer characters beats everything — then repeating 8s/9s. Local rules decide transferability.',domain:'For numeric .com domains, digit count sets the tier (shorter = rarer); then 8/6/9 density and absence of 4.',address:'For addresses and unit numbers, many buyers simply avoid 4 and 13; 8 and 18 often sell faster in Asian-heritage neighbourhoods.',date:'For dates, look at the full date and the digit root together; see the Auspicious Date Finder.',price:'For prices, endings in 8 and 9 are proven retail anchors (charm pricing) and signal prosperity in Chinese markets.'}[ctx]||'';
    box.innerHTML='<div class="grid g2" style="align-items:center">'+
      '<div class="center"><div class="score-ring" style="--p:'+res.overall+'"><div><div><b>'+res.overall+'</b><div class="small muted">/ 100</div></div></div></div><p><span class="tag">Tier '+esc(res.tier)+'</span></p></div>'+
      '<div><div class="digit-row" aria-label="Digit-by-digit reading">'+digits+'</div>'+
      '<div class="bars">'+[['Chinese prosperity',res.chinese],['Pattern & recall',res.pattern],['Numerology root',res.numer],['Japanese reading',res.jp]].map(function(b){return '<div class="bar"><span>'+b[0]+'</span><i><em style="width:'+b[1]+'%"></em></i><b class="mono">'+b[1]+'</b></div>'}).join('')+'</div></div></div>'+
      '<div class="grid g2" style="margin-top:18px"><div class="card"><h3>Combinations found</h3><ul>'+combos+'</ul></div>'+
      '<div class="card"><h3>Numerology</h3><p><b>Root '+res.root+'</b> — '+esc(WEST[res.root]||WEST[res.proot])+'</p><p class="small muted">Vedic ruler of '+res.proot+': '+esc(VEDIC[res.proot])+'</p></div></div>'+
      (adv.length||ctxNote?'<div class="note" style="margin-top:16px">'+adv.map(esc).join(' ')+' '+esc(ctxNote)+'</div>':'')+
      '<div style="margin-top:18px;display:flex;flex-wrap:wrap;gap:10px"><a class="btn btn-gold" href="valuation.html?n='+encodeURIComponent(res.n)+'">Get an expert valuation of '+esc(res.n.length>14?res.n.slice(0,14)+'…':res.n)+' →</a><button class="btn btn-ghost" type="button" data-share>Copy result link</button></div>'+
      '<p class="small muted" style="margin-top:12px">Scores are an educational model of cultural preferences and pattern rarity, not a price guarantee.</p>';
    box.classList.add('show');
    var sh=$('[data-share]',box);if(sh)sh.addEventListener('click',function(){var u=location.origin+location.pathname+'?n='+res.n;try{navigator.clipboard.writeText(u);sh.textContent='Link copied ✓'}catch(e){prompt('Copy link',u)}});
  }
  $$('form.analyzer').forEach(function(f){
    var out=$(f.getAttribute('data-out'));
    f.addEventListener('submit',function(e){e.preventDefault();var ctx=f.ctx?f.ctx.value:'phone';renderAnalysis(out,analyze(f.num.value),ctx);
      var c=+(store('ln-count')||0)+1;store('ln-count',c)});
    var pre=new URLSearchParams(location.search).get('n');
    if(pre&&f.hasAttribute('data-autorun')){f.num.value=clean(pre).slice(0,24);f.dispatchEvent(new Event('submit',{cancelable:true}))}
  });
  $$('[data-try]').forEach(function(b){b.addEventListener('click',function(){var f=$('form.analyzer');if(!f)return;f.num.value=b.getAttribute('data-try');f.dispatchEvent(new Event('submit',{cancelable:true}));f.scrollIntoView({behavior:'smooth',block:'start'})})});

  /* Compare two numbers */
  var cmp=$('#compareForm');
  if(cmp)cmp.addEventListener('submit',function(e){e.preventDefault();var a=analyze(cmp.a.value),b=analyze(cmp.b.value),o=$('#compareOut');
    if(!a||!b){o.innerHTML='<p class="note">Enter two numbers.</p>';o.classList.add('show');return}
    function row(l,x,y){return '<tr><td>'+l+'</td><td class="num">'+x+'</td><td class="num">'+y+'</td></tr>'}
    o.innerHTML='<div class="table-wrap"><table><thead><tr><th>Metric</th><th>'+esc(a.n)+'</th><th>'+esc(b.n)+'</th></tr></thead><tbody>'+row('Overall',a.overall,b.overall)+row('Chinese prosperity',a.chinese,b.chinese)+row('Pattern & recall',a.pattern,b.pattern)+row('Numerology',a.numer,b.numer)+row('Japanese',a.jp,b.jp)+row('Root',a.root,b.root)+'</tbody></table></div><p class="note" style="margin-top:12px"><b>'+esc(a.overall>=b.overall?a.n:b.n)+'</b> scores higher overall by '+Math.abs(a.overall-b.overall)+' points.</p>';o.classList.add('show')});

  /* ---------- Numerology calculators ---------- */
  var PY={a:1,j:1,s:1,b:2,k:2,t:2,c:3,l:3,u:3,d:4,m:4,v:4,e:5,n:5,w:5,f:6,o:6,x:6,g:7,p:7,y:7,h:8,q:8,z:8,i:9,r:9};
  var CH={a:1,i:1,j:1,q:1,y:1,b:2,k:2,r:2,c:3,g:3,l:3,s:3,d:4,m:4,t:4,e:5,h:5,n:5,x:5,u:6,v:6,w:6,o:7,z:7,f:8,p:8};
  function reduce(x,keepMaster){while(x>9&&!(keepMaster&&[11,22,33].indexOf(x)>-1)){x=String(x).split('').reduce(function(a,b){return a+ +b},0)}return x}
  var lp=$('#lifeForm');
  if(lp)lp.addEventListener('submit',function(e){e.preventDefault();var v=lp.dob.value;if(!v)return;var p=v.split('-');
    var y=reduce(+p[0],true),m=reduce(+p[1],true),d=reduce(+p[2],true),t=reduce(y+m+d,true);
    $('#lifeOut').innerHTML='<div class="big-out">'+t+'</div><p><b>'+esc(WEST[t])+'</b></p><p class="small muted">Method: year '+p[0]+'→'+y+', month '+p[1]+'→'+m+', day '+p[2]+'→'+d+'; '+y+'+'+m+'+'+d+' → '+t+'. Master numbers 11, 22 and 33 are kept unreduced.</p>';$('#lifeOut').classList.add('show')});
  var nm=$('#nameForm');
  if(nm)nm.addEventListener('submit',function(e){e.preventDefault();var s=nm.fullname.value.toLowerCase().replace(/[^a-z]/g,'');if(!s)return;
    var py=s.split('').reduce(function(a,c){return a+PY[c]},0),ch=s.split('').reduce(function(a,c){return a+CH[c]},0);
    var vow=s.split('').filter(function(c){return 'aeiou'.indexOf(c)>-1}).reduce(function(a,c){return a+PY[c]},0);
    var con=py-vow;
    var P=reduce(py,true),C=reduce(ch,true);
    $('#nameOut').innerHTML='<div class="grid g2"><div><div class="small muted">Pythagorean expression</div><div class="big-out">'+P+'</div><p>'+esc(WEST[P])+'</p></div><div><div class="small muted">Chaldean name number</div><div class="big-out">'+C+'</div><p>'+esc(WEST[C])+' <span class="small muted">(compound '+ch+')</span></p></div></div><p class="small muted">Soul urge (vowels): <b>'+reduce(vow,true)+'</b> · Personality (consonants): <b>'+reduce(con,true)+'</b></p>';$('#nameOut').classList.add('show')});
  var pyf=$('#pyForm');
  if(pyf)pyf.addEventListener('submit',function(e){e.preventDefault();var v=pyf.dob2.value,yr=+pyf.year.value||new Date().getFullYear();if(!v)return;var p=v.split('-');
    var t=reduce(reduce(+p[1])+reduce(+p[2])+reduce(yr));
    var themes={1:'Start — seed new projects',2:'Partner — build alliances, be patient',3:'Express — launch, publish, promote',4:'Build — systems, foundations, discipline',5:'Change — travel, pivots, experiments',6:'Care — home, family, customer love',7:'Reflect — research, learn, refine',8:'Harvest — money, power, big deals',9:'Complete — finish, release, give back'};
    $('#pyOut').innerHTML='<div class="big-out">'+t+'</div><p><b>Personal year '+yr+':</b> '+esc(themes[t])+'</p>';$('#pyOut').classList.add('show')});
  var ph=$('#phoneForm');
  if(ph)ph.addEventListener('submit',function(e){e.preventDefault();var res=analyze(ph.phone.value);var o=$('#phoneOut');
    if(!res){o.innerHTML='<p class="note">Enter a phone number.</p>';o.classList.add('show');return}
    var last=res.n.slice(-4),lr=analyze(last);
    o.innerHTML='<p>Overall <b class="mono" style="color:var(--gold)">'+res.overall+'/100</b> · Last four <b class="mono">'+last+'</b> scores <b class="mono">'+lr.overall+'</b> · Root <b>'+res.root+'</b> ('+esc(WEST[res.root]||'')+')</p><p class="small muted">Tip: the ending carries most of the perceived luck and memorability. <a href="analyzer.html?n='+res.n+'">Open the full analysis →</a></p>';o.classList.add('show')});
  var dt=$('#dateForm');
  if(dt)dt.addEventListener('submit',function(e){e.preventDefault();var s=dt.start.value,days=Math.min(366,+dt.span.value||90),goal=dt.goal.value;if(!s)return;
    var start=new Date(s+'T12:00:00'),list=[];
    for(var k=0;k<days;k++){var dd=new Date(start.getTime()+k*864e5);var Y=dd.getFullYear(),M=dd.getMonth()+1,D=dd.getDate();
      var str=''+Y+(M<10?'0':'')+M+(D<10?'0':'')+D,r=plainRoot(str);
      var sc=0;sc+=({8:30,6:18,9:20,1:12,3:12,5:8,2:6,7:4,4:-20})[r]||0;
      sc+=(String(D).match(/8/g)||[]).length*14+(String(M).match(/8/g)||[]).length*10;
      if(/4/.test(String(D)))sc-=16;if(D===8||D===18||D===28)sc+=12;if(M===8)sc+=8;
      if(goal==='launch'&&r===1)sc+=10;if(goal==='wedding'&&(r===2||r===6))sc+=12;if(goal==='deal'&&r===8)sc+=10;
      if(dd.getDay()===0&&goal!=='wedding')sc-=4;
      list.push({d:dd,sc:sc,r:r})}
    list.sort(function(a,b){return b.sc-a.sc});
    $('#dateOut').innerHTML='<div class="table-wrap"><table><thead><tr><th>Date</th><th>Day</th><th>Root</th><th>Score</th></tr></thead><tbody>'+list.slice(0,10).map(function(x){return '<tr><td>'+x.d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})+'</td><td>'+x.d.toLocaleDateString(undefined,{weekday:'short'})+'</td><td class="num">'+x.r+'</td><td class="num">'+x.sc+'</td></tr>'}).join('')+'</tbody></table></div><p class="small muted" style="margin-top:10px">Ranks dates by digit root and 8/4 placement. Traditional almanac (Tong Shu) and Panchang methods use lunar data — consult a practitioner for ceremonies.</p>';$('#dateOut').classList.add('show')});
  var cp=$('#compatForm');
  if(cp)cp.addEventListener('submit',function(e){e.preventDefault();var a=plainRoot(clean(cp.n1.value)),b=plainRoot(clean(cp.n2.value));if(!clean(cp.n1.value)||!clean(cp.n2.value))return;
    var friends={1:[1,2,3,9],2:[1,2,4,7],3:[1,3,6,9],4:[2,4,7,8],5:[3,5,6,9],6:[3,5,6,9],7:[2,4,7],8:[4,6,8],9:[1,3,5,9]};
    var ok=friends[a].indexOf(b)>-1||friends[b].indexOf(a)>-1;
    $('#compatOut').innerHTML='<p>Roots <b class="mono">'+a+'</b> &amp; <b class="mono">'+b+'</b>: <b style="color:'+(ok?'var(--jade)':'var(--gold)')+'">'+(ok?'Harmonious':'Neutral / challenging')+'</b></p><p class="small muted">Based on a common Western-numerology friendship table. Treat as a conversation starter, not a verdict.</p>';$('#compatOut').classList.add('show')});

  /* ---------- Generator: lucky numbers from a seed ---------- */
  var gen=$('#genForm');
  if(gen)gen.addEventListener('submit',function(e){e.preventDefault();var len=Math.max(3,Math.min(12,+gen.len.value||7)),pref=gen.pref.value,out=[];
    var pool=pref==='cn'?'8886699':'pref'==='west'?'1235678':'1236789';if(pref==='west')pool='1235678';if(pref==='mix')pool='16889';
    for(var t=0;t<40;t++){var s='';for(var k=0;k<len;k++)s+=pool[Math.floor(Math.random()*pool.length)];if(Math.random()<.5)s=s.slice(0,len-3)+s.slice(-1).repeat(3);out.push(analyze(s))}
    out.sort(function(a,b){return b.overall-a.overall});
    var seen={};$('#genOut').innerHTML='<div class="chips">'+out.filter(function(x){if(seen[x.n])return false;return seen[x.n]=1}).slice(0,12).map(function(x){return '<a class="chips-a" href="analyzer.html?n='+x.n+'"><span>'+x.n+' · '+x.overall+'</span></a>'}).join('')+'</div>';$('#genOut').classList.add('show')});

  /* ---------- Donation amount picker ---------- */
  $$('.amounts input').forEach(function(r){r.addEventListener('change',function(){var o=$('#donAmount');if(o)o.value=r.value})});
  var meter=$('#fundMeter');if(meter){var p=+meter.getAttribute('data-p')||0;setTimeout(function(){$('i',meter).style.width=p+'%'},300)}

  /* ---------- Contest countdown (8th of every month, 08:08 UTC) ---------- */
  var cd=$('#contestCountdown');
  if(cd){
    function next8(){var d=new Date();for(var k=0;k<3;k++){var t=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+k,8,8,8,0));if(t>d)return t}}
    var target=next8();var lab=$('#contestDate');if(lab)lab.textContent=target.toUTCString().replace(' GMT',' UTC');
    (function tick(){var ms=Math.max(0,target-new Date());var d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);
      cd.textContent=d+'d '+String(h).padStart(2,'0')+'h '+String(m).padStart(2,'0')+'m '+String(s).padStart(2,'0')+'s';setTimeout(tick,1000)})();
  }

  /* ---------- Hero live counter ---------- */
  var hc=$('#heroCount');if(hc){var base=18888+Math.floor((Date.now()/1000-1761609600)/97);hc.textContent=base.toLocaleString()}
})();
