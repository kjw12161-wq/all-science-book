(() => {
  'use strict';

  const SOURCES = {
    chemistry: { label: '화학', icon: '⚗', file: 'chemistry_test.html' },
    geometry: { label: '기하', icon: '◇', file: 'geometry_test.html' },
    physics: { label: '물리학', icon: '⚡', file: 'physics_test.html' }
  };

  const subject = new URLSearchParams(location.search).get('subject') || 'chemistry';
  const info = SOURCES[subject] || SOURCES.chemistry;
  const state = { data: null, unit: null, i: 0, answers: [], left: 900, timer: null, score: 0 };

  const $ = id => document.getElementById(id);
  const app = () => $('unitTestApp');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const timeText = s => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0')}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

  function setTemplateTitle(text) {
    document.title = `${text} · 통합 과학 정리 노트`;
    const title = $('assessmentTitle');
    if (title) title.textContent = `${info.icon} ${text}`;
  }

  async function loadData() {
    const res = await fetch(info.file, { cache: 'no-store' });
    if (!res.ok) throw new Error(`자료를 불러오지 못했습니다 (${res.status})`);
    const html = await res.text();
    const match = html.match(/<script>window\.UNIT_DATA=([\s\S]*?);<\/script>/i);
    if (!match) throw new Error('단원평가 자료 형식을 찾지 못했습니다.');
    const data = Function(`"use strict"; return (${match[1]});`)();
    if (!data || !Array.isArray(data.units)) throw new Error('단원평가 데이터가 올바르지 않습니다.');
    state.data = data;
    setTemplateTitle(data.title);
  }

  function unit() {
    return state.data.units.find(u => u.id === state.unit);
  }

  function stop() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  function updateTimer() {
    const e = $('utTimer');
    if (e) {
      e.textContent = timeText(state.left);
      e.classList.toggle('warn', state.left <= 180);
    }
  }

  function styles() {
    if ($('physicsDiagramStyles')) return;
    const s = document.createElement('style');
    s.id = 'physicsDiagramStyles';
    s.textContent = `
      .ut-diagram{margin:2px 0 28px;padding:14px 14px 10px;border:1px solid var(--theme-border);border-radius:16px;background:var(--theme-surface-soft);overflow:hidden}
      .ut-diagram img{display:block;width:100%;height:auto;max-height:330px;object-fit:contain;border-radius:10px;background:#fff}
      .ut-diagram figcaption{margin-top:8px;text-align:center;color:var(--theme-muted);font-size:11px;font-weight:800}
      @media(max-width:600px){.ut-diagram{padding:8px 8px 7px}.ut-diagram img{max-height:250px}}
    `;
    document.head.appendChild(s);
  }

  function svgImage(title, width, height, body) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" rx="18" fill="#ffffff"/><text x="24" y="30" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#334155">${esc(title)}</text>${body}</svg>`;
    const src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    return `<figure class="ut-diagram"><img src="${src}" alt="${esc(title)} 그림" loading="lazy"><figcaption>${esc(title)}</figcaption></figure>`;
  }

  const blue = '#2563eb';
  const red = '#dc2626';
  const green = '#16a34a';
  const gray = '#64748b';
  const light = '#e2e8f0';
  const marker = id => `<defs><marker id="${id}" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${id.includes('r') ? red : blue}"/></marker></defs>`;

  function physicsFigure(unitId, i) {
    if (info.label !== '물리학') return '';

    if (unitId === 'unit1') {
      if (i === 0) return svgImage('힘의 평형 · 비탈면과 도르래', 760, 290,
        marker('u1b') +
        `<path d="M85 245 L315 105 L430 245 Z" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><path d="M675 245 L445 105 L330 245 Z" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><circle cx="380" cy="92" r="18" fill="white" stroke="${gray}" stroke-width="3"/><line x1="290" y1="135" x2="362" y2="95" stroke="${blue}" stroke-width="4"/><line x1="398" y1="95" x2="470" y2="135" stroke="${blue}" stroke-width="4"/><rect x="235" y="145" width="62" height="38" rx="6" transform="rotate(-31 266 164)" fill="${light}" stroke="${gray}" stroke-width="2"/><rect x="464" y="145" width="62" height="38" rx="6" transform="rotate(31 495 164)" fill="${light}" stroke="${gray}" stroke-width="2"/><line x1="266" y1="164" x2="318" y2="133" stroke="${blue}" stroke-width="4" marker-end="url(#u1b)"/><line x1="494" y1="164" x2="442" y2="133" stroke="${green}" stroke-width="4" marker-end="url(#u1b)"/><line x1="266" y1="164" x2="231" y2="214" stroke="${red}" stroke-width="4"/><line x1="494" y1="164" x2="529" y2="214" stroke="${red}" stroke-width="4"/><text x="221" y="232" font-family="Arial" font-size="13" fill="${red}">m₁g sinθ₁</text><text x="532" y="232" font-family="Arial" font-size="13" fill="${red}">m₂g sinθ₂</text><text x="218" y="130" font-family="Arial" font-size="13" fill="${blue}">T</text><text x="500" y="130" font-family="Arial" font-size="13" fill="${green}">T</text>`);
      if (i === 1) return svgImage('힘의 평형 · 두 장력', 760, 270,
        `<line x1="90" y1="68" x2="670" y2="68" stroke="${gray}" stroke-width="9" stroke-linecap="round"/><line x1="360" y1="68" x2="260" y2="170" stroke="${blue}" stroke-width="5"/><line x1="400" y1="68" x2="500" y2="170" stroke="${green}" stroke-width="5"/><circle cx="380" cy="192" r="30" fill="${light}" stroke="${gray}" stroke-width="3"/><line x1="380" y1="222" x2="380" y2="258" stroke="${red}" stroke-width="5"/><text x="236" y="154" font-family="Arial" font-size="14" fill="${blue}">T_A</text><text x="504" y="154" font-family="Arial" font-size="14" fill="${green}">T_B</text><text x="389" y="256" font-family="Arial" font-size="14" fill="${red}">Mg</text><text x="290" y="91" font-family="Arial" font-size="13" fill="${gray}">60°</text><text x="448" y="91" font-family="Arial" font-size="13" fill="${gray}">30°</text>`);
      return svgImage('돌림힘 평형 · 막대와 받침대', 760, 270,
        `<line x1="85" y1="125" x2="675" y2="125" stroke="${gray}" stroke-width="11" stroke-linecap="round"/><path d="M180 125 l-28 48 h56 z" fill="${light}" stroke="${gray}" stroke-width="2"/><path d="M585 125 l-28 48 h56 z" fill="${light}" stroke="${gray}" stroke-width="2"/><line x1="300" y1="125" x2="300" y2="55" stroke="${red}" stroke-width="5"/><line x1="675" y1="125" x2="675" y2="55" stroke="${red}" stroke-width="5"/><text x="282" y="48" font-family="Arial" font-size="14" fill="${red}">Mg</text><text x="679" y="48" font-family="Arial" font-size="14" fill="${red}">mg</text><text x="168" y="196" font-family="Arial" font-size="13" fill="${gray}">P</text><text x="578" y="196" font-family="Arial" font-size="13" fill="${gray}">Q</text><text x="342" y="205" font-family="Arial" font-size="13" fill="${gray}">P–Q = 7L/12</text>`);
    }

    if (unitId === 'unit2') {
      if (i === 0) return svgImage('포물선 운동 · 경사면 충돌', 760, 290,
        `<line x1="80" y1="245" x2="690" y2="245" stroke="${gray}" stroke-width="2"/><line x1="95" y1="245" x2="620" y2="95" stroke="${gray}" stroke-width="5"/><path d="M125 240 Q300 35 535 145" fill="none" stroke="${blue}" stroke-width="4"/><circle cx="125" cy="240" r="7" fill="${blue}"/><circle cx="535" cy="145" r="7" fill="${blue}"/><line x1="125" y1="240" x2="225" y2="180" stroke="${blue}" stroke-width="4"/><text x="232" y="177" font-family="Arial" font-size="14" fill="${blue}">v₀</text><text x="510" y="132" font-family="Arial" font-size="13" fill="${blue}">충돌점</text><text x="165" y="220" font-family="Arial" font-size="13" fill="${gray}">30°</text>`);
      if (i === 1) return svgImage('두 물체의 충돌 · 상대운동', 760, 300,
        `<line x1="110" y1="70" x2="110" y2="250" stroke="${gray}" stroke-width="6"/><line x1="110" y1="250" x2="680" y2="250" stroke="${gray}" stroke-width="3"/><path d="M118 92 Q300 110 470 170" fill="none" stroke="${blue}" stroke-width="4"/><path d="M615 245 Q510 195 390 155" fill="none" stroke="${green}" stroke-width="4"/><circle cx="118" cy="92" r="8" fill="${blue}"/><circle cx="390" cy="155" r="8" fill="${green}"/><text x="96" y="82" font-family="Arial" font-size="14" font-weight="700">A</text><text x="626" y="243" font-family="Arial" font-size="14" font-weight="700">B</text><text x="395" y="146" font-family="Arial" font-size="13" fill="${gray}">충돌 가능 지점</text><text x="72" y="160" font-family="Arial" font-size="13" fill="${gray}">H</text><text x="390" y="272" font-family="Arial" font-size="13" fill="${gray}">L</text>`);
      return svgImage('포물선 포락선 · 발사각의 경계', 760, 290,
        `<line x1="80" y1="245" x2="680" y2="245" stroke="${gray}" stroke-width="2"/><path d="M95 245 Q330 55 635 245" fill="none" stroke="${blue}" stroke-width="4"/><path d="M95 245 Q270 95 520 200" fill="none" stroke="${gray}" stroke-width="2"/><circle cx="485" cy="112" r="8" fill="${red}"/><line x1="485" y1="112" x2="485" y2="245" stroke="${gray}" stroke-dasharray="6 6"/><text x="498" y="109" font-family="Arial" font-size="13" fill="${red}">경계 목표점</text><text x="98" y="268" font-family="Arial" font-size="13" fill="${gray}">발사점</text>`);
    }

    if (unitId === 'unit3') {
      if (i === 0 || i === 4) return svgImage('원뿔진자 · 장력 성분 분해', 760, 290,
        `<circle cx="370" cy="72" r="8" fill="${gray}"/><line x1="370" y1="72" x2="525" y2="205" stroke="${blue}" stroke-width="5"/><circle cx="525" cy="205" r="23" fill="${light}" stroke="${gray}" stroke-width="3"/><line x1="525" y1="205" x2="525" y2="266" stroke="${red}" stroke-width="5"/><line x1="525" y1="205" x2="620" y2="205" stroke="${green}" stroke-width="5"/><path d="M370 72 A65 65 0 0 1 414 125" fill="none" stroke="${gray}" stroke-width="2"/><text x="415" y="112" font-family="Arial" font-size="14" fill="${gray}">θ</text><text x="629" y="209" font-family="Arial" font-size="13" fill="${green}">구심력</text><text x="536" y="267" font-family="Arial" font-size="13" fill="${red}">mg</text><text x="460" y="118" font-family="Arial" font-size="13" fill="${blue}">T′</text>`);
      if (i === 1) return svgImage('단진동 · 용수철 에너지', 760, 250,
        `<line x1="80" y1="140" x2="680" y2="140" stroke="${gray}" stroke-width="2"/><path d="M90 140 q18 -38 36 0 t36 0 t36 0 t36 0" fill="none" stroke="${gray}" stroke-width="4"/><rect x="230" y="112" width="72" height="56" rx="8" fill="${light}" stroke="${gray}" stroke-width="3"/><line x1="385" y1="92" x2="385" y2="188" stroke="${gray}" stroke-width="2"/><line x1="385" y1="92" x2="455" y2="92" stroke="${blue}" stroke-width="4"/><line x1="385" y1="188" x2="420" y2="188" stroke="${green}" stroke-width="4"/><text x="462" y="96" font-family="Arial" font-size="13" fill="${blue}">A</text><text x="426" y="192" font-family="Arial" font-size="13" fill="${green}">x=A/2</text><text x="330" y="213" font-family="Arial" font-size="13" fill="${gray}">평형점</text>`);
      return svgImage('단진동 · 위상차와 합성', 760, 270,
        `<circle cx="195" cy="150" r="75" fill="none" stroke="${gray}" stroke-width="2"/><line x1="195" y1="150" x2="270" y2="150" stroke="${blue}" stroke-width="5"/><line x1="195" y1="150" x2="233" y2="85" stroke="${green}" stroke-width="5"/><path d="M248 150 A53 53 0 0 0 220 105" fill="none" stroke="${gray}" stroke-width="2"/><text x="235" y="121" font-family="Arial" font-size="13" fill="${gray}">60°</text><text x="278" y="154" font-family="Arial" font-size="13" fill="${blue}">A</text><text x="239" y="80" font-family="Arial" font-size="13" fill="${green}">A</text><path d="M420 195 Q520 65 640 195" fill="none" stroke="${blue}" stroke-width="4"/><path d="M435 195 Q525 88 615 195" fill="none" stroke="${green}" stroke-width="4"/><text x="470" y="220" font-family="Arial" font-size="13" fill="${gray}">합성 운동</text>`);
    }

    if (unitId === 'unit4') {
      if (i === 0 || i === 3) return svgImage('타원 궤도 · 근지점 / 원지점', 760, 290,
        `<ellipse cx="380" cy="155" rx="285" ry="100" fill="none" stroke="${blue}" stroke-width="4"/><circle cx="255" cy="155" r="8" fill="${red}"/><circle cx="630" cy="155" r="8" fill="${green}"/><circle cx="380" cy="155" r="10" fill="${light}" stroke="${gray}" stroke-width="2"/><line x1="255" y1="155" x2="380" y2="155" stroke="${gray}" stroke-dasharray="6 6"/><line x1="380" y1="155" x2="630" y2="155" stroke="${gray}" stroke-dasharray="6 6"/><text x="206" y="132" font-family="Arial" font-size="13" fill="${red}">근지점 R</text><text x="570" y="132" font-family="Arial" font-size="13" fill="${green}">원지점 3R</text><text x="387" y="145" font-family="Arial" font-size="13" fill="${gray}">행성</text><text x="280" y="99" font-family="Arial" font-size="13" fill="${blue}">v</text><text x="574" y="201" font-family="Arial" font-size="13" fill="${green}">v/3</text>`);
      if (i === 1) return svgImage('케플러 제3법칙 · 궤도 크기와 주기', 760, 250,
        `<circle cx="175" cy="155" r="22" fill="${light}" stroke="${gray}" stroke-width="3"/><ellipse cx="430" cy="155" rx="185" ry="75" fill="none" stroke="${blue}" stroke-width="4"/><line x1="245" y1="155" x2="615" y2="155" stroke="${gray}" stroke-dasharray="6 6"/><text x="130" y="198" font-family="Arial" font-size="13" fill="${gray}">행성 중심</text><text x="340" y="245" font-family="Arial" font-size="13" fill="${gray}">a 증가 → T² ∝ a³</text>`);
      if (i === 2) return svgImage('탈출 속도 · 에너지 보존', 760, 290,
        `<circle cx="380" cy="245" r="135" fill="#e2e8f0" stroke="${gray}" stroke-width="3"/><circle cx="380" cy="112" r="8" fill="${red}"/><line x1="380" y1="112" x2="380" y2="40" stroke="${blue}" stroke-width="5"/><text x="391" y="49" font-family="Arial" font-size="14" fill="${blue}">vₑ</text><text x="500" y="170" font-family="Arial" font-size="13" fill="${gray}">질량 M</text><text x="500" y="190" font-family="Arial" font-size="13" fill="${gray}">반지름 R</text><text x="460" y="70" font-family="Arial" font-size="13" fill="${gray}">무한대에서 속도 → 0</text>`);
      return svgImage('중력장과 궤도 에너지', 760, 270,
        `<ellipse cx="380" cy="150" rx="285" ry="90" fill="none" stroke="${blue}" stroke-width="4"/><circle cx="255" cy="150" r="9" fill="${red}"/><circle cx="510" cy="85" r="9" fill="${green}"/><path d="M255 150 Q380 85 510 85" fill="none" stroke="${gray}" stroke-dasharray="6 6"/><text x="214" y="132" font-family="Arial" font-size="13" fill="${red}">빠른 구간</text><text x="520" y="78" font-family="Arial" font-size="13" fill="${green}">느린 구간</text><text x="315" y="235" font-family="Arial" font-size="13" fill="${gray}">역학적 에너지 보존</text>`);
    }

    if (unitId === 'unit5') {
      if (i === 0) return svgImage('특수 상대성 · 동시성 사고실험', 760, 270,
        `<rect x="90" y="72" width="580" height="125" rx="14" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><circle cx="380" cy="135" r="9" fill="${blue}"/><line x1="380" y1="135" x2="125" y2="135" stroke="${blue}" stroke-width="4"/><line x1="380" y1="135" x2="635" y2="135" stroke="${blue}" stroke-width="4"/><text x="355" y="112" font-family="Arial" font-size="13" fill="${blue}">광원</text><text x="96" y="58" font-family="Arial" font-size="13" fill="${gray}">뒤쪽 벽</text><text x="575" y="58" font-family="Arial" font-size="13" fill="${gray}">앞쪽 벽</text><text x="286" y="228" font-family="Arial" font-size="13" fill="${gray}">우주선 운동 방향 →</text>`);
      if (i === 1) return svgImage('시간 팽창 · 뮤온', 760, 250,
        `<line x1="85" y1="190" x2="675" y2="190" stroke="${gray}" stroke-width="2"/><path d="M105 180 Q380 45 655 180" fill="none" stroke="${blue}" stroke-width="5"/><circle cx="105" cy="180" r="8" fill="${blue}"/><circle cx="655" cy="180" r="8" fill="${red}"/><text x="88" y="216" font-family="Arial" font-size="13" fill="${gray}">생성</text><text x="640" y="216" font-family="Arial" font-size="13" fill="${gray}">붕괴</text><text x="275" y="92" font-family="Arial" font-size="13" fill="${blue}">Δt = γΔt₀</text>`);
      if (i === 2) return svgImage('길이 수축 · 운동 방향', 760, 240,
        `<line x1="90" y1="115" x2="360" y2="115" stroke="${green}" stroke-width="10" stroke-linecap="round"/><line x1="420" y1="115" x2="630" y2="115" stroke="${blue}" stroke-width="10" stroke-linecap="round"/><text x="205" y="94" font-family="Arial" font-size="14" fill="${green}">고유길이 L₀</text><text x="462" y="94" font-family="Arial" font-size="14" fill="${blue}">수축된 L</text><text x="302" y="190" font-family="Arial" font-size="13" fill="${gray}">운동 방향 →</text>`);
      return svgImage('상대성 · 관측자와 시계', 760, 270,
        `<rect x="85" y="75" width="250" height="120" rx="12" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><rect x="425" y="75" width="250" height="120" rx="12" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><circle cx="210" cy="135" r="24" fill="${light}" stroke="${gray}" stroke-width="3"/><circle cx="550" cy="135" r="24" fill="${light}" stroke="${gray}" stroke-width="3"/><line x1="210" y1="135" x2="210" y2="117" stroke="${red}" stroke-width="3"/><line x1="550" y1="135" x2="566" y2="125" stroke="${blue}" stroke-width="3"/><text x="120" y="217" font-family="Arial" font-size="13" fill="${gray}">정지한 기준계</text><text x="474" y="217" font-family="Arial" font-size="13" fill="${gray}">운동하는 기준계</text>`);
    }

    if (unitId === 'unit6') {
      if (i === 0) return svgImage('일반 상대성 · 등가원리', 760, 270,
        `<rect x="75" y="70" width="250" height="135" rx="12" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><rect x="435" y="70" width="250" height="135" rx="12" fill="#f8fafc" stroke="${gray}" stroke-width="3"/><line x1="200" y1="70" x2="200" y2="28" stroke="${blue}" stroke-width="5"/><line x1="200" y1="115" x2="200" y2="180" stroke="${red}" stroke-width="5"/><line x1="560" y1="70" x2="560" y2="115" stroke="${red}" stroke-width="5"/><text x="125" y="90" font-family="Arial" font-size="13" fill="${gray}">가속 우주선</text><text x="487" y="90" font-family="Arial" font-size="13" fill="${gray}">중력장</text><text x="290" y="241" font-family="Arial" font-size="13" fill="${gray}">국소적으로 같은 낙하 효과</text>`);
      if (i === 1) return svgImage('일반 상대성 · 중력에 의한 빛의 휘어짐', 760, 290,
        `<circle cx="380" cy="160" r="78" fill="#e2e8f0" stroke="${gray}" stroke-width="3"/><path d="M70 75 Q285 80 470 135 Q555 160 680 90" fill="none" stroke="${blue}" stroke-width="5"/><path d="M70 103 Q300 105 470 135" fill="none" stroke="${gray}" stroke-width="2"/><text x="315" y="165" font-family="Arial" font-size="14" fill="${gray}">질량 M</text><text x="542" y="72" font-family="Arial" font-size="13" fill="${blue}">휘어진 빛</text><text x="261" y="245" font-family="Arial" font-size="13" fill="${gray}">시공간 곡률</text>`);
      if (i === 2) return svgImage('중력 시간 지연 · 적색편이', 760, 270,
        `<circle cx="190" cy="150" r="78" fill="#0f172a" stroke="${gray}" stroke-width="3"/><circle cx="190" cy="150" r="28" fill="#020617"/><line x1="250" y1="90" x2="660" y2="90" stroke="${red}" stroke-width="5"/><line x1="250" y1="120" x2="335" y2="120" stroke="${red}" stroke-width="4"/><line x1="350" y1="120" x2="450" y2="120" stroke="${red}" stroke-width="2"/><line x1="470" y1="120" x2="575" y2="120" stroke="${red}" stroke-width="1"/><text x="130" y="154" font-family="Arial" font-size="13" fill="white">강한 중력</text><text x="550" y="78" font-family="Arial" font-size="13" fill="${red}">더 긴 파장</text><text x="270" y="180" font-family="Arial" font-size="13" fill="${gray}">중력 시간 지연</text>`);
      return svgImage('시공간 · 중력과 빛', 760, 270,
        `<path d="M80 190 Q170 110 260 190 T440 190 T620 190" fill="none" stroke="${gray}" stroke-width="3"/><path d="M90 80 Q180 20 270 80 T450 80 T630 80" fill="none" stroke="${gray}" stroke-width="3"/><path d="M90 80 L90 190 M180 50 L180 160 M270 80 L270 190 M360 40 L360 190 M450 80 L450 190 M540 50 L540 160 M630 80 L630 190" fill="none" stroke="#cbd5e1" stroke-width="2"/><circle cx="360" cy="130" r="34" fill="#e2e8f0" stroke="${gray}" stroke-width="3"/><path d="M70 130 Q250 80 360 130 Q470 180 690 130" fill="none" stroke="${blue}" stroke-width="5"/><text x="293" y="235" font-family="Arial" font-size="13" fill="${gray}">곡률이 있는 시공간에서의 빛의 경로</text>`);
    }

    return '';
  }

  function home() {
    stop();
    state.unit = null;
    state.i = 0;
    state.answers = [];
    state.left = 900;
    app().innerHTML = `<div class="ut-wrap"><section class="ut-hero"><div class="ut-kicker">SHARED UNIT TEST TEMPLATE · ${esc(info.label.toUpperCase())}</div><h1>${esc(state.data.title)}</h1><p>공통 템플릿을 사용해 ${esc(info.label)}의 한 단원만 집중적으로 평가합니다. 단원별 5문제 · 15분 · 제출 후 채점과 해설을 제공합니다.</p></section><div class="ut-grid">${state.data.units.map(u => `<button class="ut-card" onclick="unitStart('${u.id}')"><div class="ut-tag">5 QUESTIONS · 15 MIN</div><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></button>`).join('')}</div></div>`;
  }

  function start(id) {
    const u = state.data.units.find(x => x.id === id);
    if (!u || u.questions.length !== 5) {
      alert('단원평가 데이터 오류가 있습니다.');
      return;
    }
    stop();
    state.unit = id;
    state.i = 0;
    state.answers = Array(5).fill(null);
    state.left = 900;
    render();
    state.timer = setInterval(() => {
      state.left--;
      updateTimer();
      if (state.left <= 0) submit(true);
    }, 1000);
  }

  function map(u) {
    return `<aside class="ut-map"><h3>문제 번호</h3><div class="ut-qgrid">${u.questions.map((_, i) => `<button class="ut-q ${i === state.i ? 'current ' : ''}${state.answers[i] !== null ? 'done' : ''}" onclick="unitGoto(${i})">${i + 1}</button>`).join('')}</div><div class="ut-note">진한색: 현재 문제<br>파란색: 답안 선택<br>3분 전부터 시간 경고</div></aside>`;
  }

  function render() {
    const u = unit();
    const q = u.questions[state.i];
    const fig = physicsFigure(u.id, state.i);
    app().innerHTML = `<div class="ut-wrap"><div class="ut-top"><span class="ut-sub">${esc(info.label)}</span><span class="ut-unit">${esc(u.title)}</span><button class="ut-btn ut-outline" onclick="unitHome()">단원 선택</button><div><div class="ut-kicker">남은 시간</div><div id="utTimer" class="ut-timer">${timeText(state.left)}</div></div></div><div class="ut-shell">${map(u)}<main class="ut-panel"><div class="ut-num">QUESTION ${String(state.i + 1).padStart(2, '0')} / 05</div><span class="ut-type">${esc(q[4])}</span><h2>${esc(q[0])}</h2>${fig}<div class="ut-choices">${q[1].map((c, j) => `<label class="ut-choice ${state.answers[state.i] === j ? 'selected' : ''}" onclick="unitPick(${j})"><input type="radio" name="choice" ${state.answers[state.i] === j ? 'checked' : ''}><span class="ut-key">${String.fromCharCode(65 + j)}</span><span>${esc(c)}</span></label>`).join('')}</div><div class="ut-actions"><button class="ut-btn ut-outline" onclick="unitPrev()" ${state.i === 0 ? 'disabled' : ''}>← 이전</button>${state.i === 4 ? '<button class="ut-btn ut-primary" onclick="unitSubmit()">답안 제출</button>' : '<button class="ut-btn ut-primary" onclick="unitNext()">다음 →</button>'}</div></main></div></div>`;
    updateTimer();
  }

  function pick(j) {
    state.answers[state.i] = j;
    render();
  }

  function next() {
    if (state.i < 4) {
      state.i++;
      render();
    }
  }

  function prev() {
    if (state.i > 0) {
      state.i--;
      render();
    }
  }

  function gotoQ(i) {
    if (i >= 0 && i < 5) {
      state.i = i;
      render();
    }
  }

  function submitAsk() {
    if (confirm('답안을 제출하시겠습니까?')) submit(false);
  }

  function submit(auto) {
    if (!state.unit) return;
    stop();
    const u = unit();
    state.score = u.questions.reduce((n, q, i) => n + (state.answers[i] === q[2] ? 1 : 0), 0);
    const answered = state.answers.filter(v => v !== null).length;
    app().innerHTML = `<div class="ut-wrap"><section class="ut-result"><div class="ut-kicker">${auto ? 'TIME LIMIT REACHED' : 'UNIT TEST COMPLETE'}</div><h1>${esc(u.title)}</h1><div class="ut-score">${state.score * 20}점</div><p>5문제 중 ${state.score}문제 정답 · ${answered}문제 응답 · ${5 - answered}문제 미응답</p><div style="display:flex;justify-content:center;gap:10px;margin-top:22px"><button class="ut-btn ut-outline" onclick="unitHome()">다른 단원</button><button class="ut-btn ut-primary" onclick="unitReview()">문제별 해설</button></div></section><div id="reviewMount"></div></div>`;
  }

  function review() {
    const u = unit();
    const m = $('reviewMount');
    if (!m) return;
    m.innerHTML = `<section class="ut-review"><h2>정답 및 해설</h2>${u.questions.map((q, i) => { const ok = state.answers[i] === q[2]; const mine = state.answers[i] === null ? '미응답' : q[1][state.answers[i]]; return `<div class="ut-review-item"><strong>${i + 1}. ${esc(q[0])}</strong><div class="${ok ? 'ok' : 'bad'}">${ok ? '정답' : '오답'}</div><div class="muted">내 답: ${esc(mine)} · 정답: ${esc(q[1][q[2]])}<br>해설: ${esc(q[3])}</div></div>`; }).join('')}</section>`;
    m.scrollIntoView({ behavior: 'smooth' });
  }

  window.unitStart = start;
  window.unitPick = pick;
  window.unitNext = next;
  window.unitPrev = prev;
  window.unitGoto = gotoQ;
  window.unitHome = home;
  window.unitSubmit = submitAsk;
  window.unitReview = review;

  document.addEventListener('DOMContentLoaded', async () => {
    styles();
    if (window.initSharedTheme) window.initSharedTheme();
    try {
      await loadData();
      home();
    } catch (err) {
      console.error(err);
      app().innerHTML = `<div class="ut-wrap"><section class="ut-result"><h1>단원평가를 불러올 수 없습니다.</h1><p class="muted">${esc(err.message || err)}</p><button class="ut-btn ut-primary" onclick="location.reload()">다시 시도</button></section></div>`;
    }
  });
})();
