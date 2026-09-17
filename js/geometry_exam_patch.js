(() => {
  'use strict';

  const Q = [
    ['y²=20x의 기울기 2인 접선의 방정식은?', ['y=2x+5/2','y=2x+10','y=2x-5/2','y=2x+4'], 0, 'y²=4px에서 p=5이므로 접선은 y=2x+5/2이다.'],
    ['x²/25+y²/9=1의 장축 길이는?', ['5','6','10','18'], 2, 'a=5이므로 장축 길이는 2a=10이다.'],
    ['타원의 두 초점까지 거리의 합이 16이고 단축의 길이가 12일 때 a,b는?', ['a=8,b=6','a=16,b=12','a=6,b=8','a=8,b=12'], 0, '2a=16, 2b=12이므로 a=8,b=6이다.'],
    ['x²/16-y²/9=1의 점근선 기울기 절댓값은?', ['3/4','4/3','7/4','12'], 0, 'a=4,b=3이므로 점근선은 y=±(b/a)x이다.'],
    ['타원과 쌍곡선의 초점까지 거리 조건을 비교한 설명으로 옳은 것은?', ['타원은 거리의 합, 쌍곡선은 거리의 차가 일정하다.','둘 다 거리의 합이 일정하다.','타원은 거리의 차, 쌍곡선은 거리의 합이 일정하다.','둘 다 거리의 차가 일정하다.'], 0, '타원은 두 초점까지 거리의 합, 쌍곡선은 거리의 차가 일정하다.'],
    ['이차곡선에 접하는 직선을 판별식으로 구할 때 조건은?', ['D<0','D=0','D>0','D=1'], 1, '접선에서는 교점이 중근이 되므로 판별식 D=0이다.'],
    ['정사영 넓이가 원래 넓이의 1/2가 되려면 θ는? (0°≤θ≤90°)', ['30°','45°','60°','90°'], 2, 'cosθ=1/2이므로 θ=60°이다.'],
    ['원래 넓이가 72이고 두 평면의 각이 60°일 때 정사영 넓이는?', ['18','36','36√3','72'], 1, '72cos60°=36이다.'],
    ['정사영 넓이를 가장 작게 만드는 각은?', ['0°','30°','60°','90°'], 3, 'S cosθ는 90°에서 0으로 최소이다.'],
    ['원점과 P(3,4,z)의 거리가 13일 때 z의 가능한 값은?', ['0','±12','±10','12'], 1, '169=9+16+z²이므로 z=±12이다.'],
    ['P(1,-2,3), Q(5,1,-1)의 거리는?', ['√29','√32','√41','7'], 2, '거리=√(4²+3²+(-4)²)=√41이다.'],
    ['두 점의 거리 계산에서 z성분을 빼먹으면?', ['항상 실제보다 크다.','항상 실제와 같다.','실제 거리보다 작거나 같고 z차가 0일 때만 같다.','항상 두 배다.'], 2, '빠진 제곱항은 음수가 아니므로 계산값은 실제 거리보다 작거나 같다.'],
    ['포물선 y²=12x의 초점과 준선의 x좌표 합은?', ['-6','0','3','6'], 1, 'p=3, 초점 x=3, 준선 x=-3이므로 합은 0이다.'],
    ['y²=16x의 기울기 -2인 접선의 y절편은?', ['-4','-2','2','4'], 1, 'p=4이고 p/m=4/(-2)=-2이다.'],
    ['타원의 장축 길이가 18, 단축 길이가 10일 때 a+b는?', ['9','14','18','28'], 1, 'a=9,b=5이므로 a+b=14이다.'],
    ['쌍곡선 x²/36-y²/64=1의 점근선 기울기 절댓값은?', ['3/4','4/3','8/6','6/8'], 1, 'a=6,b=8이므로 |m|=b/a=4/3이다.'],
    ['정사영 넓이가 원래 넓이의 √3/2라면 θ는?', ['30°','45°','60°','90°'], 0, 'cosθ=√3/2이므로 θ=30°이다.'],
    ['삼수선의 정리와 가장 직접적으로 관련된 것은?', ['공간상의 수직 관계','용액의 농도','등가속도 운동','반응 엔탈피'], 0, '삼수선의 정리는 공간에서 수직 관계를 다룬다.'],
    ['공간좌표에서 두 점의 x,y,z가 모두 다르면 거리 공식에 제곱항은 몇 개인가?', ['1개','2개','3개','6개'], 2, '세 좌표 차이 각각을 제곱하므로 세 항이다.'],
    ['다음 중 단순 암기보다 조건 해석이 가장 중요한 문제는?', ['포물선의 준선 위치','정사영 비율로 θ 역산','x,y,z의 기호 읽기','타원의 장축 이름'], 1, '정사영 비율을 이용해 각도를 역산하려면 공식과 조건을 함께 해석해야 한다.']
  ];

  const originalMockStart = window.mockStart;
  const st = { i:0, a:Array(20).fill(null), left:2700, timer:null };
  const app = () => document.getElementById('app');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tm = n => String(Math.max(0,Math.floor(n/60))).padStart(2,'0') + ':' + String(Math.max(0,n)%60).padStart(2,'0');

  function render(){
    const q=Q[st.i];
    app().innerHTML=`<div class="mock-exam-wrap"><div class="mock-top"><div class="mock-top-main"><small>기하 모의고사</small><strong>고난도 유형 혼합 · 20문제</strong></div><div><div class="mock-badge">남은 시간</div><div class="mock-timer ${st.left<=300?'warn':''}" id="gpatchTimer">${tm(st.left)}</div></div><button class="mock-exit" onclick="gpatchExit()">시험 종료</button></div><div class="mock-shell"><aside class="mock-qmap"><h3>문제 번호</h3><div class="mock-qgrid">${Q.map((_,i)=>`<button class="mock-q ${i===st.i?'current':''} ${st.a[i]!==null?'done':''}" onclick="gpatchGo(${i})">${i+1}</button>`).join('')}</div><div class="mock-note">총 20문제 · 제한시간 45분<br>선택한 답안은 자동 저장됩니다.</div></aside><main class="mock-question"><div class="mock-num">QUESTION ${String(st.i+1).padStart(2,'0')} / 20</div><span class="mock-type">기하 · 고난도</span><h2>${esc(q[0])}</h2><div class="mock-choices">${q[1].map((c,i)=>`<label class="mock-choice ${st.a[st.i]===i?'selected':''}" onclick="gpatchPick(${i})"><input type="radio" name="gpc" ${st.a[st.i]===i?'checked':''}><span class="mock-key">${String.fromCharCode(65+i)}</span><span>${esc(c)}</span></label>`).join('')}</div><div class="mock-actions"><button class="mock-btn outline" onclick="gpatchPrev()" ${st.i===0?'disabled':''}>← 이전</button>${st.i===19?'<button class="mock-btn primary" onclick="gpatchSubmit(false)">답안 제출</button>':'<button class="mock-btn primary" onclick="gpatchNext()">다음 문제 →</button>'}</div></main></div></div>`;
  }

  function start(){
    clearInterval(st.timer); st.i=0; st.a=Array(20).fill(null); st.left=2700; render();
    st.timer=setInterval(()=>{st.left--; const e=document.getElementById('gpatchTimer'); if(e)e.textContent=tm(st.left); if(st.left<=0)submit(true);},1000);
  }
  function pick(i){st.a[st.i]=i;render();}
  function next(){if(st.i<19){st.i++;render();}}
  function prev(){if(st.i>0){st.i--;render();}}
  function go(i){if(i>=0&&i<20){st.i=i;render();}}
  function exit(){clearInterval(st.timer);window.location.href='mock_exam.html';}
  function submit(auto){clearInterval(st.timer);const n=Q.reduce((s,q,i)=>s+(st.a[i]===q[2]?1:0),0);app().innerHTML=`<div class="mock-exam-wrap"><section class="mock-result"><span class="mock-badge">${auto?'TIME LIMIT REACHED':'EXAM COMPLETE'}</span><h1>기하 모의고사</h1><div class="mock-score"><strong>${n*5}</strong><span>점 / 100</span></div><p>20문제 중 ${n}문제 정답 · ${st.a.filter(v=>v!==null).length}문제 응답</p><div class="mock-result-actions"><button class="mock-btn outline" onclick="window.location.href='mock_exam.html'">다른 모의고사</button><button class="mock-btn primary" onclick="gpatchReview()">문제별 해설</button></div></section><div id="gpatchReview"></div></div>`;}
  function review(){const m=document.getElementById('gpatchReview');if(!m)return;m.innerHTML=`<section class="mock-review"><div class="mock-review-head"><h2>정답 및 해설</h2><span>기하 20문제</span></div>${Q.map((q,i)=>{const ok=st.a[i]===q[2];return `<div class="mock-review-item"><strong>${i+1}. ${esc(q[0])}</strong><div class="${ok?'correct-mark':'wrong-mark'}">${ok?'정답':'오답'} · 내 답 ${st.a[i]===null?'미응답':String.fromCharCode(65+st.a[i])} · 정답 ${String.fromCharCode(65+q[2])}</div><small>${esc(q[3])}</small></div>`;}).join('')}</section>`;}

  window.gpatchPick=pick;window.gpatchNext=next;window.gpatchPrev=prev;window.gpatchGo=go;window.gpatchExit=exit;window.gpatchSubmit=submit;window.gpatchReview=review;
  window.mockStart=key=>{if(key==='geometry')start();else if(typeof originalMockStart==='function')originalMockStart(key);};
})();