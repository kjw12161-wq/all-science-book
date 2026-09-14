const EXAMS = {
  geometry: {
    title:'기하 모의고사', color:'geometry', questions:[
      ['포물선 y²=4px에서 초점의 좌표는 무엇인가?',['(p,0)','(-p,0)','(0,p)','(0,-p)'],0,'정리노트는 초점 F를 (p,0), 준선을 x=-p로 제시한다.'],
      ['포물선 y²=12x의 p 값은?',['2','3','4','6'],1,'4p=12이므로 p=3이다.'],
      ['타원 x²/a²+y²/b²=1에서 2a가 의미하는 것은?',['단축의 길이','초점 사이 거리','장축의 길이','준선 사이 거리'],2,'정리노트에서 장축은 2a로 정의된다.'],
      ['타원의 정의에 대한 설명으로 옳은 것은?',['두 초점까지 거리의 차가 일정','두 초점까지 거리의 합이 일정','한 초점까지 거리만 일정','준선까지 거리가 일정'],1,'타원은 두 초점에서의 거리의 합이 일정한 점들의 자취이다.'],
      ['쌍곡선의 핵심 정의는?',['두 초점까지 거리의 합 일정','두 초점까지 거리의 차가 일정','원점까지 거리 일정','준선까지 거리 일정'],1,'정리노트는 쌍곡선을 두 초점으로부터의 거리의 차가 일정한 자취로 설명한다.'],
      ['x²/a²-y²/b²=1의 점근선 중 하나는?',['y=a/b x','y=b/a x','y=abx','y=x/(ab)'],1,'정리노트의 쌍곡선 공식에 따르면 점근선은 y=±(b/a)x이다.'],
      ['곡선 위의 한 점에서 접선이 곡선과 만나는 점의 수는 일반적으로?',['0개','1개','2개','무한개'],1,'정리노트는 접선을 곡선과 오직 한 점에서 만나는 직선으로 설명한다.'],
      ['이차곡선 접선을 구하는 방법으로 노트에 제시된 것은?',['판별식 D=0','판별식 D>0','적분만 사용','행렬식만 사용'],0,'접선은 D=0 또는 공식 치환으로 도출할 수 있다고 정리되어 있다.'],
      ['포물선 y²=4px의 기울기 m인 접선 공식은?',['y=mx-p/m','y=mx+p/m','y=mx+pm','y=mx+m/p'],1,'정리노트 공식 그대로 y=mx+p/m이다.'],
      ['타원 x²/a²+y²/b²=1에서 (x1,y1)의 접선은?',['x1x/a²+y1y/b²=1','xx1/(ab)+yy1/(ab)=0','x/a+y/b=1','x1x+y1y=0'],0,'정리노트의 접선 공식은 x1x/a²+y1y/b²=1이다.'],
      ['정사영 넓이 S′와 원래 넓이 S의 관계는?',['S′=S sinθ','S′=S tanθ','S′=S cosθ','S′=S/cosθ'],2,'정리노트에서 S′=S cosθ를 제시한다.'],
      ['θ=60°이고 원래 넓이가 20일 때 정사영 넓이는?',['5','10','10√3','20'],1,'20 cos60°=10이다.'],
      ['삼수선의 정리와 관련된 핵심 개념은?',['공간상의 수직 관계','원주각','등차수열','행렬 연산'],0,'정리노트는 삼수선의 정리를 공간상의 수직 관계를 파악하는 내용으로 제시한다.'],
      ['공간좌표에서 점 (x,y,z)를 나타내는 기본 좌표축은?',['x,y만','x,z만','y,z만','x,y,z'],3,'3차원 직교 좌표계는 x,y,z 세 축으로 구성된다.'],
      ['두 점 P1(x1,y1,z1), P2(x2,y2,z2)의 거리는?',['√((x2-x1)²+(y2-y1)²)','√((x2-x1)²+(y2-y1)²+(z2-z1)²)','|x2-x1|+|y2-y1|+|z2-z1|','x2x1+y2y1+z2z1'],1,'정리노트의 공간좌표 거리 공식이다.'],
      ['(0,0,0)과 (3,4,12)의 거리는?',['12','13','14','15'],1,'√(3²+4²+12²)=√169=13이다.'],
      ['공간에서 정사영은 무엇을 구하는 데 유용한가?',['평면에 비친 도형의 크기','원둘레만','점의 질량','방정식의 차수'],0,'정리노트는 빛이 수직으로 비칠 때의 그림자 면적을 시각화한다.'],
      ['쌍곡선에서 점근선은 곡선이 어떻게 접근하는 직선인가?',['수직으로 즉시 만나는 직선','무한히 가까워지는 직선','항상 평행한 직선','초점과 같은 직선'],1,'정리노트는 쌍곡선이 점근선을 무한히 가까이 따른다고 설명한다.'],
      ['포물선 y²=4px의 준선은?',['x=p','x=-p','y=p','y=-p'],1,'정리노트에서 준선은 x=-p로 제시된다.'],
      ['공간좌표 계산기 예시 P1=(0,0,0), P2=(3,4,12)의 결과는?',['5','12','13','15'],2,'노트의 예시 계산 결과가 13.00이다.']
    ]
  },
  chemistry: {
    title:'화학 모의고사', color:'chemistry', questions:[
      ['보일 법칙에서 온도가 일정할 때 부피 V와 압력 P의 관계는?',['V∝P','V∝1/P','V∝P²','V는 일정'],1,'정리노트에서 V∝1/P로 제시한다.'],
      ['샤를 법칙에서 압력이 일정할 때 부피 V는 무엇에 비례하는가?',['섭씨온도','절대온도 T','압력 P','몰수 n만'],1,'정리노트는 V∝T로 정리한다.'],
      ['아보가드로 법칙에서 같은 T,P일 때 V는 무엇에 비례하는가?',['몰수 n','압력 P','1/n','엔탈피'],0,'정리노트에서 V∝n으로 제시한다.'],
      ['이상 기체 상태 방정식은?',['PV=nRT','P=nR/V','PT=nRV','PV=R/T'],0,'핵심 공식 PV=nRT이다.'],
      ['n=1 mol, T=273 K, V=22.4 L일 때 P는 약 얼마인가? (R=0.0821)',['0.50 atm','1.00 atm','2.00 atm','22.4 atm'],1,'P=nRT/V≈1 atm이다.'],
      ['몰분율 XA의 의미는?',['성분 A의 질량/전체 질량','성분 A의 몰수/전체 몰수','전체 몰수/성분 A 몰수','성분 A의 압력/부피'],1,'정리노트는 전체 몰수에 대한 성분 A의 비율로 정의한다.'],
      ['돌턴의 부분 압력 법칙에서 PA는?',['XA/PTotal','XA×Ptotal','Ptotal/XA','XA+Ptotal'],1,'정리노트의 공식 PA=XA×Ptotal이다.'],
      ['몰랄 농도 m의 분모는?',['용액의 부피 L','용매의 질량 kg','용질의 질량 g','용액의 몰수'],1,'m=용질 몰수/용매 질량(kg)이다.'],
      ['끓는점 오름의 관계식은?',['ΔTb=Kb/m','ΔTb=Kb·m','ΔTb=m/Kb','ΔTb=Kb+m'],1,'정리노트의 공식은 ΔTb=Kb·m이다.'],
      ['삼투 현상에서 반투막을 통해 이동하는 것은?',['용질','용매(물)','기체만','전자'],1,'묽은 용액에서 진한 용액 쪽으로 용매가 이동한다.'],
      ['삼투압 공식은?',['Π=C/RT','Π=CRT','Π=R/(CT)','Π=C+RT'],1,'정리노트의 반트 호프 법칙이다.'],
      ['삼투압 Π가 비례하는 양은?',['몰농도 C와 절대온도 T','질량만','부피만','엔트로피만'],0,'정리노트는 Π가 몰농도와 절대온도에 비례한다고 강조한다.'],
      ['반응 엔탈피 ΔH는 어떻게 계산하는가?',['생성물−반응물의 엔탈피 합','반응물−생성물의 엔탈피 합','생성물×반응물','항상 0'],0,'ΔH=ΣH생성물−ΣH반응물이다.'],
      ['발열 반응에서 ΔH의 부호는?',['양수','음수','0만 가능','항상 1'],1,'발열은 열 방출이므로 ΔH<0이다.'],
      ['흡열 반응에서 ΔH의 부호는?',['양수','음수','항상 0','항상 음수'],0,'흡열은 열 흡수이므로 ΔH>0이다.'],
      ['헤스 법칙의 핵심은?',['반응 경로에 따라 총 엔탈피가 달라진다','처음과 나중 상태가 같으면 총 반응 엔탈피는 경로와 무관하다','엔탈피는 항상 0이다','온도가 바뀌면 법칙이 사라진다'],1,'정리노트의 헤스 법칙 설명이다.'],
      ['엔트로피 S를 노트에서는 무엇으로 설명하는가?',['질량','무질서도','압력','온도'],1,'노트는 엔트로피를 물질의 무질서도로 설명한다.'],
      ['깁스 자유 에너지 식은?',['ΔG=ΔH+TΔS','ΔG=ΔH−TΔS','ΔG=TΔH−ΔS','ΔG=ΔS−TΔH'],1,'정리노트의 핵심 공식이다.'],
      ['유효 충돌의 조건으로 노트에 제시된 것은?',['충돌 방향과 활성화 에너지 조건','질량이 같을 것','온도가 0 K일 것','압력이 반드시 1 atm일 것'],0,'올바른 충돌 방향과 Ea 이상의 에너지가 필요하다.'],
      ['촉매의 역할에 대한 설명으로 옳은 것은?',['반응 엔탈피를 바꾼다','새로운 반응 경로를 제공하여 Ea를 바꾼다','몰수를 바꾼다','평형 물질의 종류를 바꾼다'],1,'정리노트는 촉매가 새로운 경로를 제공해 Ea를 변경하지만 ΔH는 변하지 않는다고 정리한다.']
    ]
  },
  physics: {
    title:'물리학 모의고사', color:'physics', questions:[
      ['다음 중 스칼라인 물리량은?',['힘','가속도','질량','변위'],2,'정리노트는 질량을 스칼라의 예로 제시한다.'],
      ['다음 중 벡터인 물리량은?',['시간','온도','에너지','힘'],3,'정리노트는 힘을 벡터의 예로 제시한다.'],
      ['힘의 평형 상태에서 합력은?',['0','1 N','질량과 같다','항상 최대'],0,'합력이 0이면 정지 또는 등속 직선 운동을 유지한다.'],
      ['두 힘 F1,F2가 각 θ를 이룰 때 합력 크기 공식은?',['√(F1²+F2²−2F1F2cosθ)','√(F1²+F2²+2F1F2cosθ)','F1+F2cosθ','F1F2cosθ'],1,'정리노트의 두 힘 합성 공식이다.'],
      ['질량 10 kg, 가속도 9.8 m/s²일 때 알짜힘은?',['9.8 N','98 N','980 N','1.02 N'],1,'F=ma이므로 98 N이다.'],
      ['관성계에 대한 설명으로 노트의 내용과 맞는 것은?',['가속 운동을 하는 좌표계','물리 법칙이 동일하게 성립하는 관찰 좌표계','중력이 없는 좌표계','항상 정지한 좌표계'],1,'특수 상대성의 상대성 원리는 모든 관성계에서 물리 법칙이 동일하게 성립한다고 정리한다.'],
      ['특수 상대성 이론의 광속 불변 원리는?',['빛의 속력이 관찰자에 따라 변한다','진공 중 빛의 속력은 모든 관성계에서 일정하다','빛은 항상 정지한다','빛의 속력은 질량에 비례한다'],1,'노트의 광속 불변 원리 설명이다.'],
      ['동시성의 상대성이 의미하는 것은?',['모든 관찰자에게 두 사건이 항상 동시에 보인다','한 관찰자에게 동시에 일어난 사건이 다른 관찰자에게는 동시에 아닐 수 있다','시간은 존재하지 않는다','공간만 상대적이다'],1,'정리노트에 그대로 정리된 내용이다.'],
      ['시간 지연에 대한 설명으로 옳은 것은?',['빠르게 움직이는 관찰자의 시간이 더 느리게 간다','빠르게 움직일수록 시간이 빨라진다','시간은 절대적으로 같다','고유 시간이 가장 길다'],0,'노트는 빠르게 움직이는 관찰자의 시간이 느리게 가며 고유 시간이 가장 짧다고 정리한다.'],
      ['길이 수축은 운동 방향에서 물체의 길이가 어떻게 측정되는가?',['더 길게','더 짧게','항상 같다','무한대로'],1,'노트는 운동 방향으로 짧게 측정된다고 정리한다.'],
      ['질량-에너지 등가원리는?',['E=mv','E=mc²','E=ma','E=mc'],1,'정리노트의 공식이다.'],
      ['케플러 제3법칙은?',['T∝a','T²∝a³','T³∝a²','T∝1/a³'],1,'정리노트는 공전주기 T의 제곱이 긴반지름 a의 세제곱에 비례한다고 정리한다.'],
      ['만유인력의 크기 공식은?',['F=Gm1m2/r','F=Gm1m2/r²','F=Gm1m2r²','F=G/r²'],1,'노트의 뉴턴 만유인력 법칙이다.'],
      ['두 물체 사이 거리 r이 2배가 되면 만유인력은 어떻게 되는가?',['2배','4배','1/2배','1/4배'],3,'F∝1/r²이므로 거리 2배면 힘은 1/4배이다.'],
      ['중력장은 노트에서 어떻게 정의되는가?',['단위 부피당 질량','위치마다 질량 1 kg의 물체가 받는 중력의 크기','물체의 속력','지구의 반지름'],1,'정리노트의 정의를 적용한 것이다.'],
      ['가속계에서 도입하는 관성력은 가속도와 어떤 방향인가?',['같은 방향','반대 방향','항상 수직','항상 무관'],1,'노트는 관성력이 가속도와 반대 방향이라고 정리한다.'],
      ['일반 상대성 이론에서 중력은 무엇과 관련되는가?',['절대적인 힘 하나만','시공간의 곡률','질량의 색깔','전하량만'],1,'노트는 질량에 의해 시공간이 휘며 이것이 중력으로 나타난다고 설명한다.'],
      ['중력 렌즈 효과는 무엇을 의미하는가?',['빛이 중력 때문에 완전히 멈추는 현상','질량 주변의 시공간 곡률에 따라 빛의 경로가 휘는 현상','소리가 휘는 현상','온도가 낮아지는 현상'],1,'정리노트의 빛의 휘어짐 설명이다.'],
      ['중력에 의한 시간 지연은 중력이 강한 곳에서 시간이 어떻게 흐르는가?',['더 빠르게','더 느리게','항상 동일','주기적으로 멈춘다'],1,'노트는 중력이 강한 곳일수록 시간이 느리게 간다고 정리한다.'],
      ['중력파는 무엇의 출렁임인가?',['전자기장','시공간','물의 표면','온도장'],1,'정리노트는 중력파를 시공간의 출렁임으로 설명한다.']
    ]
  }
};

const state={subject:null,index:0,answers:[],remaining:2700,timer:null,submitted:false};
const $=s=>document.querySelector(s);
const escapeHTML=s=>s.replace(/[&<>\'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function theme(){document.documentElement.classList.toggle('dark',localStorage.theme==='dark');}
function renderLanding(){state.subject=null;clearInterval(state.timer);$('#app').innerHTML=`<main class="exam-shell"><section class="exam-hero"><div class="exam-kicker">MOCK EXAM</div><h1>통합 과학 모의고사</h1><p>정리노트의 핵심 내용을 바탕으로 만든 영역별 모의고사입니다. 원하는 영역 하나를 선택하면 45분 동안 20문제를 한 문제씩 풀이합니다.</p></section><section class="exam-cards">${Object.entries(EXAMS).map(([key,e])=>`<button class="exam-card ${e.color}" data-subject="${key}"><div class="exam-card-icon">${key==='geometry'?'⌁':key==='chemistry'?'⚗':'✦'}</div><div class="exam-meta">20 QUESTIONS · 45 MIN</div><h2>${e.title}</h2><p>${key==='geometry'?'이차곡선 · 접선 · 공간도형 · 공간좌표':key==='chemistry'?'기체 · 용액 · 삼투 · 엔탈피 · 자발성 · 반응 속도':'힘의 합성 · 상대성 · 케플러 · 만유인력 · 일반 상대성'}</p><span>시험 시작 →</span></button>`).join('')}</section></main>`;document.querySelectorAll('[data-subject]').forEach(b=>b.onclick=()=>startExam(b.dataset.subject));}
function startExam(subject){state.subject=subject;state.index=0;state.answers=Array(20).fill(null);state.remaining=2700;state.submitted=false;renderExam();clearInterval(state.timer);state.timer=setInterval(()=>{state.remaining--;updateTimer();if(state.remaining<=0){clearInterval(state.timer);submitExam(true)}},1000);}
function updateTimer(){const m=Math.floor(state.remaining/60),s=state.remaining%60;$('#timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;$('#timer').classList.toggle('warning',state.remaining<=300);}
function renderExam(){const e=EXAMS[state.subject],q=e.questions[state.index];$('#app').innerHTML=`<main class="exam-shell"><header class="exam-top"><div><span class="exam-subject ${e.color}">${e.title}</span><strong>제${state.index+1}문제 / 20</strong></div><div class="timer-box"><span>남은 시간</span><strong id="timer"></strong></div><button id="quitBtn" class="ghost-btn">시험 종료</button></header><div class="exam-layout"><aside class="question-map"><h3>문제 목록</h3><div class="q-grid">${e.questions.map((_,i)=>`<button class="q-dot ${i===state.index?'current':''} ${state.answers[i]!==null?'answered':''}" data-q="${i}">${i+1}</button>`).join('')}</div><div class="map-note">파란색: 현재 문제<br>표시된 문제: 답안 선택됨</div></aside><section class="question-panel"><div class="question-number">QUESTION ${String(state.index+1).padStart(2,'0')}</div><h2>${escapeHTML(q[0])}</h2><div class="choices">${q[1].map((c,i)=>`<label class="choice ${state.answers[state.index]===i?'selected':''}"><input type="radio" name="choice" value="${i}" ${state.answers[state.index]===i?'checked':''}><span class="choice-key">${'①②③④'[i]}</span><span>${escapeHTML(c)}</span></label>`).join('')}</div><div class="exam-actions"><button id="prevBtn" class="outline-btn" ${state.index===0?'disabled':''}>← 이전</button><div class="actions-right"><button id="nextBtn" class="primary-btn">${state.index===19?'채점하기':'다음 →'}</button></div></div></section></div></main>`;updateTimer();document.querySelectorAll('input[name=choice]').forEach(r=>r.onchange=e2=>{state.answers[state.index]=Number(e2.target.value);document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));e2.target.closest('.choice').classList.add('selected')});document.querySelectorAll('.q-dot').forEach(b=>b.onclick=()=>{state.index=Number(b.dataset.q);renderExam()});$('#prevBtn').onclick=()=>{if(state.index>0){state.index--;renderExam()}};$('#nextBtn').onclick=()=>{if(state.index===19)submitExam(false);else{state.index++;renderExam()}};$('#quitBtn').onclick=()=>{if(confirm('시험을 종료하고 영역 선택 화면으로 돌아갈까요? 현재 답안은 저장되지 않습니다.'))renderLanding()};}
function submitExam(auto){clearInterval(state.timer);state.submitted=true;const e=EXAMS[state.subject];let score=0;e.questions.forEach((q,i)=>{if(state.answers[i]===q[2])score++});renderResult(score,auto);}
function renderResult(score,auto){const e=EXAMS[state.subject];$('#app').innerHTML=`<main class="exam-shell"><section class="result-panel"><div class="exam-kicker">${auto?'TIME UP':'EXAM COMPLETE'}</div><h1>${e.title} 결과</h1><div class="score-ring"><strong>${score*5}</strong><span>/ 100</span></div><p class="result-summary">20문제 중 <strong>${score}문제</strong> 정답 · ${20-score}문제 오답</p><div class="result-actions"><button id="retryBtn" class="primary-btn">다시 풀기</button><button id="selectBtn" class="outline-btn">영역 선택</button></div></section><section class="review-panel"><div class="review-head"><h2>문제별 해설</h2><span>정답은 공개된 채점 결과를 기준으로 확인하세요.</span></div>${e.questions.map((q,i)=>`<article class="review-item ${state.answers[i]===q[2]?'correct':'wrong'}"><div class="review-title"><strong>${i+1}. ${escapeHTML(q[0])}</strong><span>${state.answers[i]===q[2]?'정답':'오답'}</span></div><div class="review-answer">정답: ${'①②③④'[q[2]]} ${escapeHTML(q[1][q[2]])}</div><p>${escapeHTML(q[3])}</p></article>`).join('')}</section></main>`;$('#retryBtn').onclick=()=>startExam(state.subject);$('#selectBtn').onclick=renderLanding;}

document.addEventListener('DOMContentLoaded',()=>{theme();renderLanding()});