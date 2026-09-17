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
  const esc = s => String(s).replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
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
    const data = Function(`\"use strict\"; return (${match[1]});`)();
    if(!data || !Array.isArray(data.units)) throw new Error('단원평가 데이터가 올바르지 않습니다.');
    state.data = data;
    setTemplateTitle(data.title);
  }

  function unit(){ return state.data.units.find(u => u.id === state.unit); }
  function stop(){ if(state.timer){ clearInterval(state.timer); state.timer=null; } }
  function updateTimer(){ const e=$('utTimer'); if(e){ e.textContent=timeText(state.left); e.classList.toggle('warn',state.left<=180); } }

  function styles(){
    if($('physicsDiagramStyles')) return;
    const s=document.createElement('style');
    s.id='physicsDiagramStyles';
    s.textContent=`
      .ut-diagram{margin:4px 0 26px;padding:14px 12px;border:1px solid #e5e7eb;border-radius:16px;background:linear-gradient(180deg,#f8fafc,#fff);overflow:hidden}
      .dark .ut-diagram{border-color:#334155;background:linear-gradient(180deg,#0b1220,#111827)}
      .ut-diagram svg{display:block;width:100%;height:auto;max-height:300px;color:#334155}
      .dark .ut-diagram svg{color:#cbd5e1}
      .ut-diagram .fig-title{font-size:11px;font-weight:900;letter-spacing:.08em;fill:#64748b}
      .dark .ut-diagram .fig-title{fill:#94a3b8}
      .ut-diagram .accent{stroke:#2563eb;fill:none}
      .ut-diagram .accent2{stroke:#16a34a;fill:none}
      .ut-diagram .danger{stroke:#dc2626;fill:none}
      .ut-diagram .soft{stroke:#94a3b8;fill:none}
      .ut-diagram .fill-soft{fill:#e2e8f0;stroke:#64748b}
      .dark .ut-diagram .fill-soft{fill:#1e293b;stroke:#94a3b8}
      .ut-diagram text{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
      @media(max-width:600px){.ut-diagram{padding:8px}.ut-diagram svg{max-height:230px}}
    `;
    document.head.appendChild(s);
  }

  const ARROW = '<defs><marker id="uArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"/></marker><marker id="uArrowBlue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#2563eb"/></marker><marker id="uArrowRed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>';

  function diagramIncline(){
    return `<div class="ut-diagram" aria-label="두 빗면에서 장력과 중력 성분의 평형 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">힘의 평형 · 비탈면 + 도르래</text><path d="M55 205 L300 90 L415 205 Z" fill="#f1f5f9" stroke="currentColor" stroke-width="2"/><path d="M665 205 L420 90 L305 205 Z" fill="#f1f5f9" stroke="currentColor" stroke-width="2"/><circle cx="360" cy="76" r="15" fill="none" stroke="currentColor" stroke-width="2"/><line x1="270" y1="118" x2="347" y2="78" stroke="currentColor" stroke-width="3"/><line x1="373" y1="78" x2="450" y2="119" stroke="currentColor" stroke-width="3"/><rect x="235" y="128" width="54" height="34" rx="5" class="fill-soft" transform="rotate(-25 262 145)"/><rect x="431" y="128" width="54" height="34" rx="5" class="fill-soft" transform="rotate(25 458 145)"/><line x1="260" y1="145" x2="305" y2="124" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><line x1="460" y1="145" x2="415" y2="124" class="accent2" stroke-width="3" marker-end="url(#uArrow)"/><line x1="260" y1="145" x2="230" y2="190" class="danger" stroke-width="3" marker-end="url(#uArrowRed)"/><line x1="460" y1="145" x2="490" y2="190" class="danger" stroke-width="3" marker-end="url(#uArrowRed)"/><text x="230" y="116" fill="#2563eb" font-size="13" font-weight="800">T</text><text x="478" y="116" fill="#16a34a" font-size="13" font-weight="800">T</text><text x="212" y="202" fill="#dc2626" font-size="13" font-weight="800">m₁g sinθ₁</text><text x="486" y="202" fill="#dc2626" font-size="13" font-weight="800">m₂g sinθ₂</text><text x="152" y="190" font-size="12">θ₁</text><text x="557" y="190" font-size="12">θ₂</text></svg></div>`;
  }

  function diagramCeiling(){
    return `<div class="ut-diagram" aria-label="두 장력이 질량을 매다는 힘의 평형 그림"><svg viewBox="0 0 720 230" role="img">${ARROW}<text x="18" y="22" class="fig-title">힘의 평형 · 두 장력</text><line x1="70" y1="55" x2="650" y2="55" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><line x1="340" y1="55" x2="255" y2="145" stroke="#2563eb" stroke-width="4" marker-end="url(#uArrowBlue)"/><line x1="380" y1="55" x2="465" y2="145" stroke="#16a34a" stroke-width="4" marker-end="url(#uArrow)"/><circle cx="360" cy="165" r="28" class="fill-soft"/><line x1="360" y1="193" x2="360" y2="218" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><text x="228" y="125" fill="#2563eb" font-size="13" font-weight="800">T_A</text><text x="463" y="125" fill="#16a34a" font-size="13" font-weight="800">T_B</text><text x="369" y="216" fill="#dc2626" font-size="13" font-weight="800">Mg</text><text x="296" y="84" font-size="12">60°</text><text x="419" y="84" font-size="12">30°</text></svg></div>`;
  }

  function diagramRod(){
    return `<div class="ut-diagram" aria-label="두 받침대 위 균일한 막대와 오른쪽 끝 질량의 돌림힘 그림"><svg viewBox="0 0 720 230" role="img">${ARROW}<text x="18" y="22" class="fig-title">돌림힘 평형 · 받침대 반력</text><line x1="90" y1="105" x2="630" y2="105" stroke="currentColor" stroke-width="10" stroke-linecap="round"/><path d="M160 105 l-22 38 h44 z" class="fill-soft"/><path d="M570 105 l-22 38 h44 z" class="fill-soft"/><line x1="250" y1="105" x2="250" y2="45" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><line x1="630" y1="105" x2="630" y2="45" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><line x1="160" y1="171" x2="570" y2="171" stroke="#94a3b8" stroke-width="2"/><line x1="160" y1="166" x2="160" y2="176" stroke="#94a3b8" stroke-width="2"/><line x1="570" y1="166" x2="570" y2="176" stroke="#94a3b8" stroke-width="2"/><text x="365" y="190" font-size="12">P–Q = 7L/12</text><text x="232" y="40" fill="#dc2626" font-size="13" font-weight="800">Mg</text><text x="635" y="40" fill="#dc2626" font-size="13" font-weight="800">mg</text><text x="150" y="162" font-size="12">P</text><text x="560" y="162" font-size="12">Q</text><text x="88" y="94" font-size="12">L</text><circle cx="360" cy="105" r="4" fill="currentColor"/><text x="370" y="96" font-size="12">무게중심</text></svg></div>`;
  }

  function diagramSlopeProjectile(){
    return `<div class="ut-diagram" aria-label="경사면 하단에서 발사된 물체와 경사면 충돌 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">포물선 운동 · 경사면 충돌</text><line x1="70" y1="205" x2="650" y2="205" stroke="#94a3b8" stroke-width="2"/><line x1="80" y1="205" x2="600" y2="72" stroke="currentColor" stroke-width="4"/><path d="M110 200 Q275 25 500 143" class="accent" stroke-width="3"/><circle cx="500" cy="143" r="6" fill="#2563eb"/><circle cx="110" cy="200" r="6" fill="#2563eb"/><line x1="110" y1="200" x2="230" y2="133" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><path d="M130 195 A40 40 0 0 1 169 179" fill="none" stroke="currentColor" stroke-width="2"/><text x="168" y="184" font-size="12">30°</text><text x="238" y="130" fill="#2563eb" font-size="13" font-weight="800">v₀</text><text x="486" y="132" fill="#2563eb" font-size="13" font-weight="800">충돌점</text><line x1="535" y1="143" x2="535" y2="205" stroke="#94a3b8" stroke-dasharray="5 5"/><text x="542" y="175" font-size="12">y=0</text></svg></div>`;
  }

  function diagramTwoProjectile(){
    return `<div class="ut-diagram" aria-label="절벽에서 수평 발사된 A와 지면에서 발사된 B의 충돌 그림"><svg viewBox="0 0 720 270" role="img">${ARROW}<text x="18" y="22" class="fig-title">두 물체의 충돌 · 상대운동</text><line x1="90" y1="55" x2="90" y2="220" stroke="currentColor" stroke-width="5"/><line x1="90" y1="220" x2="650" y2="220" stroke="currentColor" stroke-width="3"/><path d="M95 75 Q260 92 430 160" class="accent" stroke-width="3"/><path d="M570 214 Q470 165 350 125" class="accent2" stroke-width="3"/><circle cx="95" cy="75" r="7" fill="#2563eb"/><circle cx="350" cy="125" r="8" fill="#16a34a"/><line x1="95" y1="75" x2="170" y2="75" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><line x1="570" y1="214" x2="500" y2="190" class="accent2" stroke-width="3" marker-end="url(#uArrow)"/><text x="76" y="66" font-size="13" font-weight="800">A</text><text x="580" y="225" font-size="13" font-weight="800">B</text><text x="356" y="116" font-size="12">충돌 가능 지점</text><text x="45" y="140" font-size="12">H</text><text x="360" y="245" font-size="12">L</text></svg></div>`;
  }

  function diagramTarget(){
    return `<div class="ut-diagram" aria-label="초기속력이 일정한 포물선들의 포락선과 목표점 그림"><svg viewBox="0 0 720 260" role="img">${ARROW}<text x="18" y="22" class="fig-title">포물선 포락선 · 발사각의 경계</text><line x1="70" y1="215" x2="660" y2="215" stroke="#94a3b8" stroke-width="2"/><path d="M80 215 Q250 70 520 198" class="soft" stroke-width="2"/><path d="M80 215 Q300 40 585 205" class="soft" stroke-width="2"/><path d="M80 215 Q350 25 640 215" class="accent" stroke-width="4"/><circle cx="455" cy="108" r="7" fill="#2563eb"/><line x1="455" y1="108" x2="455" y2="215" stroke="#94a3b8" stroke-dasharray="5 5"/><text x="465" y="104" font-size="12">경계 목표점</text><text x="58" y="236" font-size="12">발사점</text><text x="470" y="232" font-size="12">x</text><text x="38" y="112" font-size="12">y</text><text x="520" y="75" fill="#2563eb" font-size="13" font-weight="800">포락선</text></svg></div>`;
  }

  function diagramConical(){
    return `<div class="ut-diagram" aria-label="원뿔진자의 장력과 구심력 성분 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">원뿔진자 · 장력 성분 분해</text><circle cx="360" cy="52" r="7" fill="currentColor"/><line x1="360" y1="52" x2="505" y2="175" stroke="#2563eb" stroke-width="4"/><circle cx="505" cy="175" r="18" class="fill-soft"/><line x1="505" y1="175" x2="505" y2="225" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><line x1="505" y1="175" x2="570" y2="175" class="accent2" stroke-width="4" marker-end="url(#uArrow)"/><line x1="505" y1="175" x2="430" y2="112" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><path d="M360 52 A55 55 0 0 1 394 93" fill="none" stroke="currentColor" stroke-width="2"/><text x="392" y="88" font-size="12">θ</text><text x="446" y="105" fill="#2563eb" font-size="13" font-weight="800">T′</text><text x="578" y="178" fill="#16a34a" font-size="13" font-weight="800">T′sinθ</text><text x="510" y="242" fill="#dc2626" font-size="13" font-weight="800">mg</text><text x="386" y="128" font-size="12">연직 성분: T′cosθ=mg</text><circle cx="505" cy="175" r="58" fill="none" stroke="#94a3b8" stroke-dasharray="5 5"/></svg></div>`;
  }

  function diagramSpring(){
    return `<div class="ut-diagram" aria-label="용수철 단진동에서 진폭과 변위 그림"><svg viewBox="0 0 720 220" role="img">${ARROW}<text x="18" y="22" class="fig-title">단진동 · 에너지 보존</text><line x1="70" y1="142" x2="650" y2="142" stroke="#94a3b8" stroke-width="2"/><path d="M95 142 q20 -35 40 0 t40 0 t40 0 t40 0" fill="none" stroke="currentColor" stroke-width="3"/><rect x="255" y="118" width="70" height="48" rx="8" class="fill-soft"/><line x1="360" y1="142" x2="590" y2="142" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"/><line x1="360" y1="95" x2="360" y2="190" stroke="#64748b" stroke-width="2"/><line x1="360" y1="105" x2="430" y2="105" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><line x1="360" y1="180" x2="395" y2="180" class="accent2" stroke-width="3" marker-end="url(#uArrow)"/><text x="405" y="100" fill="#2563eb" font-size="12">A</text><text x="407" y="176" fill="#16a34a" font-size="12">x=A/2</text><text x="347" y="214" font-size="12">평형점</text></svg></div>`;
  }

  function diagramPhase(){
    return `<div class="ut-diagram" aria-label="두 단진동의 위상차를 나타낸 위상자 그림"><svg viewBox="0 0 720 240" role="img">${ARROW}<text x="18" y="22" class="fig-title">단진동 · 위상차와 합성</text><circle cx="200" cy="135" r="72" fill="none" stroke="#94a3b8" stroke-width="2"/><line x1="200" y1="135" x2="272" y2="135" class="accent" stroke-width="4" marker-end="url(#uArrowBlue)"/><line x1="200" y1="135" x2="236" y2="73" class="accent2" stroke-width="4" marker-end="url(#uArrow)"/><path d="M230 135 A30 30 0 0 0 215 109" fill="none" stroke="currentColor" stroke-width="2"/><text x="236" y="119" font-size="12">60°</text><text x="278" y="139" fill="#2563eb" font-size="13" font-weight="800">A</text><text x="240" y="68" fill="#16a34a" font-size="13" font-weight="800">A</text><line x1="420" y1="80" x2="610" y2="80" stroke="#94a3b8" stroke-width="2"/><path d="M430 150 Q500 45 610 150" class="accent" stroke-width="3"/><path d="M430 150 Q510 55 600 150" class="accent2" stroke-width="3"/><text x="455" y="182" font-size="12">두 진동의 위상차</text><text x="476" y="56" font-size="12">합성 진폭</text></svg></div>`;
  }

  function diagramOrbit(){
    return `<div class="ut-diagram" aria-label="타원 궤도의 근지점과 원지점, 각운동량 보존 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">타원 궤도 · 근지점 / 원지점</text><ellipse cx="360" cy="140" rx="250" ry="92" fill="none" stroke="#2563eb" stroke-width="3"/><circle cx="240" cy="140" r="7" fill="#dc2626"/><circle cx="610" cy="140" r="7" fill="#16a34a"/><circle cx="425" cy="140" r="9" class="fill-soft"/><line x1="240" y1="140" x2="425" y2="140" stroke="#94a3b8" stroke-dasharray="5 5"/><line x1="425" y1="140" x2="610" y2="140" stroke="#94a3b8" stroke-dasharray="5 5"/><text x="207" y="122" fill="#dc2626" font-size="13" font-weight="800">근지점 R</text><text x="560" y="122" fill="#16a34a" font-size="13" font-weight="800">원지점 3R</text><text x="392" y="126" font-size="12">행성</text><line x1="240" y1="140" x2="300" y2="90" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><line x1="610" y1="140" x2="550" y2="190" class="accent2" stroke-width="3" marker-end="url(#uArrow)"/><text x="286" y="83" fill="#2563eb" font-size="12">v</text><text x="531" y="204" fill="#16a34a" font-size="12">v/3</text></svg></div>`;
  }

  function diagramPlanet(){
    return `<div class="ut-diagram" aria-label="행성 표면에서의 탈출속도와 중력 퍼텐셜 에너지 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">탈출 속도 · 역학적 에너지 보존</text><circle cx="360" cy="230" r="130" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/><circle cx="360" cy="230" r="75" fill="none" stroke="#94a3b8" stroke-dasharray="5 5"/><circle cx="360" cy="105" r="6" fill="#dc2626"/><line x1="360" y1="105" x2="360" y2="28" stroke="#2563eb" stroke-width="4" marker-end="url(#uArrowBlue)"/><text x="370" y="36" fill="#2563eb" font-size="13" font-weight="800">vₑ</text><text x="372" y="108" font-size="12">질량 m</text><text x="500" y="168" font-size="13">행성 질량 M</text><text x="488" y="186" font-size="12">반지름 R</text><text x="585" y="45" font-size="12">무한대: U→0, K→0</text></svg></div>`;
  }

  function diagramRelativity(){
    return `<div class="ut-diagram" aria-label="관성 우주선과 가속 우주선의 등가원리 비교 그림"><svg viewBox="0 0 720 245" role="img">${ARROW}<text x="18" y="22" class="fig-title">일반 상대성 · 등가원리</text><rect x="65" y="65" width="250" height="145" rx="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="190" y1="65" x2="190" y2="28" class="accent" stroke-width="4" marker-end="url(#uArrowBlue)"/><circle cx="190" cy="112" r="10" class="fill-soft"/><line x1="190" y1="122" x2="190" y2="175" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><text x="78" y="88" font-size="12">가속 우주선</text><text x="214" y="36" fill="#2563eb" font-size="12">a=9.8 m/s²</text><text x="208" y="174" fill="#dc2626" font-size="12">관찰자 기준 아래로</text><rect x="405" y="65" width="250" height="145" rx="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="530" y1="65" x2="530" y2="118" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><circle cx="530" cy="105" r="10" class="fill-soft"/><path d="M420 175 Q530 142 640 175" fill="none" stroke="#94a3b8" stroke-width="4"/><text x="418" y="88" font-size="12">지표면의 국소 영역</text><text x="547" y="118" fill="#dc2626" font-size="12">g</text><text x="329" y="230" font-size="12">국소적으로 같은 낙하 효과 → 등가원리</text></svg></div>`;
  }

  function diagramLightBend(){
    return `<div class="ut-diagram" aria-label="질량이 큰 천체 주변에서 빛의 경로가 휘어지는 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">일반 상대성 · 중력에 의한 빛의 휘어짐</text><circle cx="360" cy="135" r="68" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/><circle cx="360" cy="135" r="94" fill="none" stroke="#94a3b8" stroke-dasharray="5 5"/><path d="M70 65 Q290 72 470 118 Q560 140 650 76" class="accent" stroke-width="4"/><path d="M70 92 Q295 96 470 118" class="soft" stroke-width="2"/><path d="M470 118 Q565 145 650 118" class="soft" stroke-width="2"/><text x="303" y="139" font-size="13">질량 M</text><text x="78" y="56" fill="#2563eb" font-size="13" font-weight="800">빛 입사</text><text x="545" y="70" fill="#2563eb" font-size="13" font-weight="800">휘어진 경로</text><text x="262" y="218" font-size="12">시공간 곡률</text></svg></div>`;
  }

  function diagramRedshift(){
    return `<div class="ut-diagram" aria-label="강한 중력장에서 나온 빛의 중력 적색편이 그림"><svg viewBox="0 0 720 250" role="img">${ARROW}<text x="18" y="22" class="fig-title">중력 시간 지연 · 적색 편이</text><circle cx="190" cy="145" r="75" fill="#0f172a" stroke="#64748b" stroke-width="3"/><circle cx="190" cy="145" r="30" fill="#020617"/><text x="160" y="150" fill="white" font-size="12">강한 중력</text><circle cx="245" cy="88" r="6" fill="#dc2626"/><line x1="245" y1="88" x2="630" y2="88" class="danger" stroke-width="4" marker-end="url(#uArrowRed)"/><line x1="245" y1="110" x2="330" y2="110" stroke="#dc2626" stroke-width="4"/><line x1="345" y1="110" x2="430" y2="110" stroke="#dc2626" stroke-width="2"/><line x1="445" y1="110" x2="530" y2="110" stroke="#dc2626" stroke-width="2"/><text x="265" y="75" fill="#dc2626" font-size="12">빛 방출</text><text x="545" y="78" fill="#dc2626" font-size="12">지구 관측: 더 긴 파장</text><text x="285" y="176" font-size="12">시계도 더 느리게 진행</text></svg></div>`;
  }

  function physicsDiagram(unitId, i){
    if(info.label!=='물리학') return '';
    if(unitId==='unit1'){
      if(i===0) return diagramIncline();
      if(i===1) return diagramCeiling();
      if(i>=2) return diagramRod();
    }
    if(unitId==='unit2'){
      if(i===0) return diagramSlopeProjectile();
      if(i===1) return diagramTwoProjectile();
      if(i>=2) return diagramTarget();
    }
    if(unitId==='unit3'){
      if(i===0 || i===4) return diagramConical();
      if(i===1) return diagramSpring();
      if(i===2 || i===3) return diagramPhase();
    }
    if(unitId==='unit4'){
      if(i===0) return diagramOrbit();
      if(i===2) return diagramPlanet();
    }
    if(unitId==='unit5'){
      if(i===0) return `<div class="ut-diagram" aria-label="기차 안 광원과 앞뒤 벽의 동시성 사고실험 그림"><svg viewBox="0 0 720 235" role="img">${ARROW}<text x="18" y="22" class="fig-title">특수 상대성 · 동시성의 상대성</text><rect x="105" y="70" width="510" height="120" rx="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="360" y1="70" x2="360" y2="185" stroke="#94a3b8" stroke-dasharray="5 5"/><circle cx="360" cy="130" r="8" fill="#2563eb"/><path d="M360 130 L120 130" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><path d="M360 130 L600 130" class="accent" stroke-width="3" marker-end="url(#uArrowBlue)"/><line x1="75" y1="205" x2="645" y2="205" stroke="#94a3b8" stroke-width="2"/><text x="330" y="116" font-size="12">광원</text><text x="114" y="60" font-size="12">뒤쪽 벽</text><text x="555" y="60" font-size="12">앞쪽 벽</text><text x="220" y="225" font-size="12">우주선 운동 방향 →</text></svg></div>`;
      if(i===1) return `<div class="ut-diagram" aria-label="뮤온의 고유시간과 지상 관측 시간 그림"><svg viewBox="0 0 720 230" role="img">${ARROW}<text x="18" y="22" class="fig-title">시간 팽창 · 고유시간과 관측시간</text><line x1="90" y1="185" x2="650" y2="185" stroke="#94a3b8" stroke-width="2"/><path d="M110 175 Q360 50 610 175" class="accent" stroke-width="4"/><circle cx="110" cy="175" r="7" fill="#2563eb"/><circle cx="610" cy="175" r="7" fill="#2563eb"/><text x="88" y="204" font-size="12">생성</text><text x="590" y="204" font-size="12">붕괴</text><text x="285" y="100" fill="#2563eb" font-size="13" font-weight="800">지상에서 측정: Δt=γΔt₀</text><text x="320" y="160" font-size="12">Δt₀ = 고유시간</text></svg></div>`;
      if(i===2) return `<div class="ut-diagram" aria-label="운동 방향의 길이 수축 그림"><svg viewBox="0 0 720 220" role="img">${ARROW}<text x="18" y="22" class="fig-title">길이 수축 · 운동 방향</text><line x1="100" y1="105" x2="360" y2="105" stroke="#16a34a" stroke-width="8" stroke-linecap="round"/><line x1="405" y1="105" x2="610" y2="105" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/><line x1="100" y1="140" x2="360" y2="140" stroke="#94a3b8" stroke-width="2"/><line x1="405" y1="140" x2="610" y2="140" stroke="#94a3b8" stroke-width="2"/><text x="170" y="94" fill="#16a34a" font-size="13" font-weight="800">L₀</text><text x="485" y="94" fill="#2563eb" font-size="13" font-weight="800">L=0.8L₀</text><line x1="150" y1="185" x2="560" y2="185" class="soft" stroke-width="2" marker-end="url(#uArrow)"/><text x="285" y="210" font-size="12">운동 방향 →</text></svg></div>`;
    }
    if(unitId==='unit6'){
      if(i===0) return diagramRelativity();
      if(i===1) return diagramLightBend();
      if(i===2) return diagramRedshift();
    }
    return '';
  }

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
    const u=unit(), q=u.questions[state.i], fig=physicsDiagram(u.id,state.i);
    app().innerHTML=`<div class="ut-wrap"><div class="ut-top"><span class="ut-sub">${esc(info.label)}</span><span class="ut-unit">${esc(u.title)}</span><button class="ut-btn ut-outline" onclick="unitHome()">단원 선택</button><div><div class="ut-kicker">남은 시간</div><div id="utTimer" class="ut-timer">${timeText(state.left)}</div></div></div><div class="ut-shell">${map(u)}<main class="ut-panel"><div class="ut-num">QUESTION ${String(state.i+1).padStart(2,'0')} / 05</div><span class="ut-type">${esc(q[4])}</span><h2>${esc(q[0])}</h2>${fig}<div class="ut-choices">${q[1].map((c,j)=>`<label class="ut-choice ${state.answers[state.i]===j?'selected':''}" onclick="unitPick(${j})"><input type="radio" name="choice" ${state.answers[state.i]===j?'checked':''}><span class="ut-key">${String.fromCharCode(65+j)}</span><span>${esc(c)}</span></label>`).join('')}</div><div class="ut-actions"><button class="ut-btn ut-outline" onclick="unitPrev()" ${state.i===0?'disabled':''}>← 이전</button>${state.i===4?'<button class="ut-btn ut-primary" onclick="unitSubmit()">답안 제출</button>':'<button class="ut-btn ut-primary" onclick="unitNext()">다음 →</button>'}</div></main></div></div>`;
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
    styles();
    if(window.initSharedTheme) window.initSharedTheme();
    try{ await loadData(); home(); }
    catch(err){ console.error(err); app().innerHTML=`<div class="ut-wrap"><section class="ut-result"><h1>단원평가를 불러올 수 없습니다.</h1><p class="muted">${esc(err.message||err)}</p><button class="ut-btn ut-primary" onclick="location.reload()">다시 시도</button></section></div>`; }
  });
})();