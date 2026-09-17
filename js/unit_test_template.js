(() => {
  'use strict';

  const SOURCES = {
    chemistry: { label: '화학', icon: '⚗', file: 'chemistry_test.html' },
    geometry: { label: '기하', icon: '◇', file: 'geometry_test.html' },
    physics: { label: '물리학', icon: '⚡', file: 'physics_test.html' }
  };
  const subject = new URLSearchParams(location.search).get('subject') || 'chemistry';
  const info = SOURCES[subject] || SOURCES.chemistry;
  const state = { data:null, unit:null, i:0, answers:[], left:900, timer:null, score:0 };
  const $ = id => document.getElementById(id);
  const app = () => $('unitTestApp');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const timeText = s => `${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.max(0,s)%60).padStart(2,'0')}`;

  function setTemplateTitle(text){
    document.title = `${text} · 통합 과학 정리 노트`;
    const title = $('assessmentTitle');
    if(title) title.textContent = `${info.icon} ${text}`;
  }

  async function loadData(){
    const res = await fetch(info.file, { cache:'no-store' });
    if(!res.ok) throw new Error(`자료를 불러오지 못했습니다 (${res.status})`);
    const html = await res.text();
    const match = html.match(/<script>window\.UNIT_DATA=([\s\S]*?);<\/script>/i);
    if(!match) throw new Error('단원평가 자료 형식을 찾지 못했습니다.');
    const data = Function(`"use strict"; return (${match[1]});`)();
    if(!data || !Array.isArray(data.units)) throw new Error('단원평가 데이터가 올바르지 않습니다.');
    state.data = data;
    setTemplateTitle(data.title);
  }

  function unit(){ return state.data.units.find(u => u.id === state.unit); }
  function stop(){ if(state.timer){ clearInterval(state.timer); state.timer=null; } }
  function updateTimer(){ const e=$('utTimer'); if(e){ e.textContent=timeText(state.left); e.classList.toggle('warn',state.left<=180); } }

  function home(){
    stop(); state.unit=null; state.i=0; state.answers=[]; state.left=900;
    app().innerHTML = `<div class="ut-wrap"><section class="ut-hero"><div class="ut-kicker">SHARED UNIT TEST TEMPLATE · ${esc(info.label.toUpperCase())}</div><h1>${esc(state.data.title)}</h1><p>공통 템플릿을 사용해 ${esc(info.label)}의 한 단원만 집중적으로 평가합니다. 단원별 5문제 · 15분 · 제출 후 채점과 해설을 제공합니다.</p></section><div class="ut-grid">${state.data.units.map(u=>`<button class="ut-card" onclick="unitStart('${u.id}')"><div class="ut-tag">5 QUESTIONS · 15 MIN</div><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></button>`).join('')}</div></div>`;
  }

  function start(id){
    const u=state.data.units.find(x=>x.id===id);
    if(!u || u.questions.length!==5){ alert('단원평가 데이터 오류가 있습니다.'); return; }
    stop(); state.unit=id; state.i=0; state.answers=Array(5).fill(null); state.left=900; render();
    state.timer=setInterval(()=>{ state.left--; updateTimer(); if(state.left<=0) submit(true); },1000);
  }

  function map(u){
    return `<aside class="ut-map"><h3>문제 번호</h3><div class="ut-qgrid">${u.questions.map((_,i)=>`<button class="ut-q ${i===state.i?'current ':''}${state.answers[i]!==null?'done':''}" onclick="unitGoto(${i})">${i+1}</button>`).join('')}</div><div class="ut-note">진한색: 현재 문제<br>파란색: 답안 선택<br>3분 전부터 시간 경고</div></aside>`;
  }

  function render(){
    const u=unit(), q=u.questions[state.i];
    app().innerHTML=`<div class="ut-wrap"><div class="ut-top"><span class="ut-sub">${esc(info.label)}</span><span class="ut-unit">${esc(u.title)}</span><button class="ut-btn ut-outline" onclick="unitHome()">단원 선택</button><div><div class="ut-kicker">남은 시간</div><div id="utTimer" class="ut-timer">${timeText(state.left)}</div></div></div><div class="ut-shell">${map(u)}<main class="ut-panel"><div class="ut-num">QUESTION ${String(state.i+1).padStart(2,'0')} / 05</div><span class="ut-type">${esc(q[4])}</span><h2>${esc(q[0])}</h2><div class="ut-choices">${q[1].map((c,j)=>`<label class="ut-choice ${state.answers[state.i]===j?'selected':''}" onclick="unitPick(${j})"><input type="radio" name="choice" ${state.answers[state.i]===j?'checked':''}><span class="ut-key">${String.fromCharCode(65+j)}</span><span>${esc(c)}</span></label>`).join('')}</div><div class="ut-actions"><button class="ut-btn ut-outline" onclick="unitPrev()" ${state.i===0?'disabled':''}>← 이전</button>${state.i===4?'<button class="ut-btn ut-primary" onclick="unitSubmit()">답안 제출</button>':'<button class="ut-btn ut-primary" onclick="unitNext()">다음 →</button>'}</div></main></div></div>`;
    updateTimer();
  }

  function pick(j){ state.answers[state.i]=j; render(); }
  function next(){ if(state.i<4){ state.i++; render(); } }
  function prev(){ if(state.i>0){ state.i--; render(); } }
  function gotoQ(i){ if(i>=0&&i<5){ state.i=i; render(); } }

  function submitAsk(){ if(confirm('답안을 제출하시겠습니까?')) submit(false); }
  function submit(auto){
    if(!state.unit) return; stop();
    const u=unit();
    state.score=u.questions.reduce((n,q,i)=>n+(state.answers[i]===q[2]?1:0),0);
    const answered=state.answers.filter(v=>v!==null).length;
    app().innerHTML=`<div class="ut-wrap"><section class="ut-result"><div class="ut-kicker">${auto?'TIME LIMIT REACHED':'UNIT TEST COMPLETE'}</div><h1>${esc(u.title)}</h1><div class="ut-score">${state.score*20}점</div><p>5문제 중 ${state.score}문제 정답 · ${answered}문제 응답 · ${5-answered}문제 미응답</p><div style="display:flex;justify-content:center;gap:10px;margin-top:22px"><button class="ut-btn ut-outline" onclick="unitHome()">다른 단원</button><button class="ut-btn ut-primary" onclick="unitReview()">문제별 해설</button></div></section><div id="reviewMount"></div></div>`;
  }

  function review(){
    const u=unit(), m=$('reviewMount'); if(!m)return;
    m.innerHTML=`<section class="ut-review"><h2>정답 및 해설</h2>${u.questions.map((q,i)=>{const ok=state.answers[i]===q[2],mine=state.answers[i]===null?'미응답':q[1][state.answers[i]];return `<div class="ut-review-item"><strong>${i+1}. ${esc(q[0])}</strong><div class="${ok?'ok':'bad'}">${ok?'정답':'오답'}</div><div class="muted">내 답: ${esc(mine)} · 정답: ${esc(q[1][q[2]])}<br>해설: ${esc(q[3])}</div></div>`}).join('')}</section>`;
    m.scrollIntoView({behavior:'smooth'});
  }

  window.unitStart=start; window.unitPick=pick; window.unitNext=next; window.unitPrev=prev; window.unitGoto=gotoQ; window.unitHome=home; window.unitSubmit=submitAsk; window.unitReview=review;

  document.addEventListener('DOMContentLoaded', async ()=>{
    if(window.initSharedTheme) window.initSharedTheme();
    try{ await loadData(); home(); }
    catch(err){ console.error(err); app().innerHTML=`<div class="ut-wrap"><section class="ut-result"><h1>단원평가를 불러올 수 없습니다.</h1><p class="muted">${esc(err.message||err)}</p><button class="ut-btn ut-primary" onclick="location.reload()">다시 시도</button></section></div>`; }
  });
})();
