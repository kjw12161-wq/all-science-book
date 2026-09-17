(() => {
  'use strict';

  const QUESTIONS = [
    ['y²=20x의 기울기 2인 접선의 방정식은?', ['y=2x+5/2','y=2x+10','y=2x-5/2','y=2x+4'], 0, 'y²=4px에서 p=5이고 접선은 y=mx+p/m이므로 y=2x+5/2이다.', '계산형'],
    ['x²/25+y²/9=1의 장축 길이는?', ['5','6','10','18'], 2, 'a=5이므로 장축의 길이는 2a=10이다.', '기본 계산'],
    ['타원의 두 초점까지 거리의 합이 16이고 단축의 길이가 12일 때 a,b는?', ['a=8,b=6','a=16,b=12','a=6,b=8','a=8,b=12'], 0, '2a=16, 2b=12이므로 a=8,b=6이다.', '조건 추론'],
    ['x²/16-y²/9=1의 점근선 기울기 절댓값은?', ['3/4','4/3','7/4','12'], 0, 'a=4,b=3이므로 점근선은 y=±(b/a)x, 기울기 절댓값은 3/4이다.', '공식 적용'],
    ['타원과 쌍곡선을 두 초점까지의 거리 조건으로 비교한 설명 중 옳은 것은?', ['타원은 거리의 합, 쌍곡선은 거리의 차가 일정하다.','둘 다 거리의 합이 일정하다.','타원은 거리의 차, 쌍곡선은 거리의 합이 일정하다.','둘 다 거리의 차가 일정하다.'], 0, '타원은 두 초점까지 거리의 합, 쌍곡선은 거리의 차가 일정하다.', '개념 비교'],
    ['이차곡선에 접하는 직선을 판별식으로 구할 때 교점이 중근이 되는 조건은?', ['D<0','D=0','D>0','D=1'], 1, '접선에서는 두 교점이 하나로 겹치므로 판별식 D=0이다.', '오류 판별'],
    ['정사영 넓이가 S cosθ일 때 원래 넓이의 1/2가 되려면 θ는?', ['30°','45°','60°','90°'], 2, 'cosθ=1/2이므로 0°~90°에서 θ=60°이다.', '역산형'],
    ['원래 넓이가 72이고 두 평면의 각이 60°일 때 정사영 넓이는?', ['18','36','36√3','72'], 1, '72×cos60°=36이다.', '계산형'],
    ['정사영 넓이를 가장 작게 만드는 각은?', ['0°','30°','60°','90°'], 3, 'S cosθ에서 0°~90° 범위의 최솟값은 θ=90°일 때 0이다.', '함수 해석'],
    ['원점과 P(3,4,z)의 거리가 13일 때 z의 가능한 값은?', ['0','±12','±10','12'], 1, '169=9+16+z²이므로 z²=144, z=±12이다.', '공간좌표'],
    ['P(1,-2,3), Q(5,1,-1)의 거리는?', ['√29','√32','√41','7'], 2, '√(4²+3²+(-4)²)=√41이다.', '3차원 계산'],
    ['두 점의 거리 계산에서 z성분을 빼먹었을 때의 결과는?', ['항상 실제보다 크다.','항상 실제와 같다.','실제 거리보다 작거나 같고 z차가 0일 때만 같다.','항상 두 배다.'], 2, '빠진 제곱항이 음수가 아니므로 계산값은 실제 거리보다 작거나 같다.', '오류 분석'],
    ['포물선 y²=12x의 초점과 준선의 x좌표 합은?', ['-6','0','3','6'], 1, 'p=3, 초점 x=3, 준선 x=-3이므로 합은 0이다.', '구조 추론'],
    ['y²=16x의 기울기 -2인 접선의 y절편은?', ['-4','-2','2','4'], 1, 'p=4이고 p/m=4/(-2)=-2이다.', '계산형'],
    ['타원의 장축 길이가 18, 단축 길이가 10일 때 a+b는?', ['9','14','18','28'], 1, '2a=18→a=9, 2b=10→b=5이므로 a+b=14이다.', '복합 계산'],
    ['쌍곡선 x²/36-y²/64=1의 점근선 기울기 절댓값은?', ['3/4','4/3','8/6','6/8'], 1, 'a=6,b=8이므로 |m|=b/a=4/3이다.', '공식 적용'],
    ['정사영 넓이가 원래 넓이의 √3/2라면 θ는?', ['30°','45°','60°','90°'], 0, 'cosθ=√3/2이므로 θ=30°이다.', '역산형'],
    ['삼수선의 정리와 가장 직접적으로 관련된 것은?', ['공간상의 수직 관계','용액의 농도','등가속도 운동','반응 엔탈피'], 0, '삼수선의 정리는 공간에서 수선과 정사영의 수직 관계를 다룬다.', '개념 판별'],
    ['공간좌표에서 x,y,z 세 좌표가 모두 바뀌면 거리 계산에서 필요한 항의 수는?', ['1개','2개','3개','6개'], 2, '각 좌표 차이의 제곱 세 항을 더한다.', '구조 이해'],
    ['다음 중 단순 암기보다 조건 해석이 가장 중요한 문제는?', ['포물선의 준선 위치','정사영 비율로 θ 역산','x,y,z의 기호 읽기','타원의 장축 이름'], 1, '정사영 값을 이용해 각도를 역산하는 문제는 공식과 조건을 함께 해석해야 한다.', '유형 판단']
  ];

  const state = { index: 0, answers: Array(20).fill(null), left: 2700, timer: null };
  const app = () => document.getElementById('app');
  const fmt = s => String(Math.max(0, Math.floor(s / 60))).padStart(2, '0') + ':' + String(Math.max(0, s) % 60).padStart(2, '0');
  const safe = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function addStyle() {
    if (document.getElementById('geometry-fix-style')) return;
    const style = document.createElement('style');
    style.id = 'geometry-fix-style';
    style.textContent = `
      .gf-shell{max-width:1180px;margin:0 auto;padding:24px 18px 70px}
      .gf-top{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:14px 18px;margin-bottom:18px}
      .dark .gf-top{background:#0f172a;border-color:#334155}
      .gf-sub{font-weight:900;color:#6d28d9}.gf-timer{margin-left:auto;font-size:24px;font-weight:900}.gf-timer.warn{color:#dc2626}
      .gf-layout{display:grid;grid-template-columns:220px 1fr;gap:18px}.gf-map,.gf-panel{background:#fff;border:1px solid #e5e7eb;border-radius:20px}.dark .gf-map,.dark .gf-panel{background:#0f172a;border-color:#334155}
      .gf-map{padding:18px;height:max-content;position:sticky;top:88px}.gf-map h3{margin:0 0 12px}.gf-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
      .gf-dot{border:1px solid #d1d5db;background:#fff;border-radius:9px;padding:8px 0;font-size:11px;font-weight:800;cursor:pointer}.dark .gf-dot{background:#111827;color:#e2e8f0;border-color:#475569}.gf-dot.current{background:#111827;color:#fff}.gf-dot.answered:not(.current){background:#eff6ff;color:#1d4ed8}
      .gf-panel{padding:32px;min-height:500px}.gf-no{font-size:11px;font-weight:900;color:#94a3b8;letter-spacing:.12em}.gf-panel h2{font-size:24px;line-height:1.65;margin:10px 0 28px}.gf-choices{display:grid;gap:11px}
      .gf-choice{display:flex;gap:12px;padding:15px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;cursor:pointer}.dark .gf-choice{background:#0b1220;border-color:#334155}.gf-choice.sel{border-color:#2563eb;background:#eff6ff}.dark .gf-choice.sel{background:#172554;border-color:#3b82f6}.gf-key{font-weight:900;min-width:22px}
      .gf-actions{display:flex;justify-content:space-between;margin-top:30px}.gf-btn{border-radius:10px;padding:10px 17px;font-weight:900;cursor:pointer}.gf-prev{background:#fff;color:#111;border:1px solid #d1d5db}.dark .gf-prev{background:#0f172a;color:#e2e8f0;border-color:#475569}.gf-next{background:#111827;color:#fff;border:1px solid #111827}.dark .gf-next{background:#f8fafc;color:#0f172a}
      .gf-result{text-align:center}.gf-score{font-size:56px;font-weight:950;margin:18px 0}.gf-review{margin-top:18px;text-align:left}.gf-item{padding:14px 0;border-bottom:1px solid #e5e7eb}.dark .gf-item{border-color:#334155}.gf-ok{color:#047857;font-weight:900}.gf-bad{color:#b91c1c;font-weight:900}.gf-answer{font-size:12px;margin-top:5px;color:#64748b}.dark .gf-answer{color:#94a3b8}
      @media(max-width:900px){.gf-layout{grid-template-columns:1fr}.gf-map{position:static}.gf-panel{padding:22px}}
    `;
    document.head.appendChild(style);
  }

  function mapHtml() {
    return `<aside class="gf-map"><h3>문제 번호</h3><div class="gf-grid">${QUESTIONS.map((_,i) => `<button class="gf-dot ${i===state.index?'current ':''}${state.answers[i]!==null?'answered':''}" onclick="gfGo(${i})">${i+1}</button>`).join('')}</div><div style="font-size:11px;color:#94a3b8;line-height:1.7;margin-top:14px">총 20문제 · 제한시간 45분<br>선택한 답은 자동으로 저장됩니다.</div></aside>`;
  }

  function render() {
    const q = QUESTIONS[state.index];
    app().innerHTML = `<div class="gf-shell"><div class="gf-top"><span class="gf-sub">기하</span><strong>고난도 모의고사</strong><button class="gf-btn gf-prev" style="margin-left:12px" onclick="gfLeave()">나가기</button><div class="gf-timer ${state.left<=300?'warn':''}">${fmt(state.left)}</div></div><div class="gf-layout">${mapHtml()}<section class="gf-panel"><div class="gf-no">QUESTION ${state.index+1} / 20 · ${safe(q[4])}</div><h2>${safe(q[0])}</h2><div class="gf-choices">${q[1].map((choice,i)=>`<label class="gf-choice ${state.answers[state.index]===i?'sel':''}"><input type="radio" name="gfq" ${state.answers[state.index]===i?'checked':''} onchange="gfPick(${i})"><span class="gf-key">${String.fromCharCode(9312+i)}</span><span>${safe(choice)}</span></label>`).join('')}</div><div class="gf-actions"><button class="gf-btn gf-prev" onclick="gfPrev()" ${state.index===0?'disabled':''}>← 이전</button>${state.index===19?'<button class="gf-btn gf-next" onclick="gfSubmit()">제출하고 채점</button>':'<button class="gf-btn gf-next" onclick="gfNext()">다음 →</button>'}</div></section></div></div>`;
  }

  function startGeometry() {
    clearInterval(state.timer);
    state.index = 0; state.answers = Array(20).fill(null); state.left = 2700;
    addStyle(); render();
    state.timer = setInterval(() => {
      state.left -= 1;
      const timer = document.querySelector('.gf-timer');
      if (timer) { timer.textContent = fmt(state.left); timer.classList.toggle('warn', state.left <= 300); }
      if (state.left <= 0) submit(true);
    }, 1000);
  }

  function pick(i) { state.answers[state.index] = i; render(); }
  function next() { if (state.index < 19) { state.index += 1; render(); } }
  function prev() { if (state.index > 0) { state.index -= 1; render(); } }
  function go(i) { if (i >= 0 && i < 20) { state.index = i; render(); } }
  function leave() { clearInterval(state.timer); window.location.href = 'mock_exam.html'; }

  function submit(auto = false) {
    clearInterval(state.timer);
    const correct = QUESTIONS.reduce((sum,q,i) => sum + (state.answers[i] === q[2] ? 1 : 0), 0);
    app().innerHTML = `<div class="gf-shell"><section class="gf-panel gf-result"><div style="font-size:12px;color:#94a3b8;font-weight:900">기하 모의고사${auto?' · 시간 종료':''}</div><h1>채점 결과</h1><div class="gf-score">${correct*5}<span style="font-size:20px">점</span></div><p style="color:#64748b">20문제 중 ${correct}문제를 맞혔습니다.</p><div style="margin-top:22px"><button class="gf-btn gf-prev" onclick="gfLeave()">모의고사 선택으로</button></div><div class="gf-review"><h2>문제별 해설</h2>${QUESTIONS.map((q,i)=>{const ok=state.answers[i]===q[2];const mine=state.answers[i]===null?'미응답':q[1][state.answers[i]];return `<div class="gf-item"><div><b>${i+1}. ${safe(q[0])}</b> <span class="${ok?'gf-ok':'gf-bad'}">${ok?'정답':'오답'}</span></div><div class="gf-answer">내 답: ${safe(mine)} · 정답: ${safe(q[1][q[2]])}</div><div class="gf-answer">해설: ${safe(q[3])}</div></div>`;}).join('')}</div></section></div>`;
  }

  window.gfPick = pick; window.gfNext = next; window.gfPrev = prev; window.gfGo = go; window.gfLeave = leave; window.gfSubmit = submit;

  const originalStartExam = window.startExam;
  window.startExam = key => {
    if (key === 'geometry') startGeometry();
    else if (typeof originalStartExam === 'function') originalStartExam(key);
  };
})();