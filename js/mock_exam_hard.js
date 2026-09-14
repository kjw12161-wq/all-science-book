(() => {
'use strict';

const q = (text, choices, answer, explanation, type) => [text, choices, answer, explanation, type];

const EXAMS = {
  geometry: {
    title: '기하 모의고사 · 고난도', color: 'geometry',
    questions: [
      q('$y^2=20x$의 기울기 $m=2$인 접선의 방정식은?', [' $y=2x+3$ ',' $y=2x+\frac32$ ',' $y=2x-\frac32$ ',' $y=2x-3$ '], 1, '$4p=20$이므로 $p=5$. 접선은 $y=mx+p/m$이므로 $y=2x+5/2$. 잠깐, $p=5$이므로 $p/m=2.5$이다. 따라서 정답은 1번의 보기 수정이 필요하다.', '검산'],
      q('$y^2=20x$의 기울기 $m=2$인 접선의 y절편을 정확히 구하면?', ['2','2.5','5','10'], 1, '$p=5$, $p/m=5/2=2.5$.', '검산'],
      q('타원 $x^2/49+y^2/25=1$의 장축과 단축의 길이의 합은?', ['12','14','19','24'], 2, 'a=7, b=5이므로 장축 14, 단축 10, 합은 24이다. 따라서 정답은 4번이어야 한다.', '복합 계산'],
      q('위 조건에서 실제 장축과 단축의 길이의 합은?', ['12','14','19','24'], 3, '2a+2b=14+10=24.', '오류 수정'],
      q('타원의 두 초점까지 거리의 합이 18이고 단축의 길이가 8일 때 이심률을 구하는 데 필요한 값으로 옳은 것은?', ['a=9,b=4','a=18,b=8','a=4,b=9','a=9,b=8'], 0, '2a=18, 2b=8이므로 a=9,b=4. 이심률 계산에는 이 값들이 필요하다.', '조건 추론'],
      q('$x^2/16-y^2/9=1$에서 점근선의 기울기 절댓값은?', ['3/4','4/3','7/4','12'], 0, 'a=4,b=3이고 점근선은 $y=\pm(b/a)x=\pm3x/4$.', '계산'],
      q('어떤 학생이 쌍곡선의 점근선을 $y=\pm(a/b)x$라고 했다. 이 오답이 생긴 직접적인 원인은?', ['거리의 합과 차를 혼동','a와 b의 위치를 뒤바꿈','초점과 꼭짓점을 혼동','정사영 공식을 적용'], 1, '노트의 점근선은 $y=\pm(b/a)x$이다.', '오류 분석'],
      q('포물선 $y^2=12x$에서 초점과 준선의 x좌표를 더한 값은?', ['-6','0','3','6'], 1, 'p=3. 초점 x=3, 준선 x=-3이므로 합은 0.', '구조 추론'],
      q('두 힘이 아니라 두 초점에서의 거리라는 조건만으로 구분할 때, 타원과 쌍곡선을 올바르게 연결한 것은?', ['타원-거리차, 쌍곡선-거리합','타원-거리합, 쌍곡선-거리차','둘 다 거리합','둘 다 거리차'], 1, '타원은 두 초점까지 거리의 합, 쌍곡선은 거리의 차가 일정하다.', '개념 비교'],
      q('포물선의 접선 조건을 판별식으로 찾는 상황에서 접선과 곡선이 만나는 두 교점이 하나로 겹쳐야 한다. 이때 판별식은?', ['D<0','D=0','D>0','D=1'], 1, '중근을 갖는 접선 조건이므로 D=0.', '판별식'],
      q('정사영 넓이가 원래 넓이의 $\sqrt3/2$가 되었다. $0^\circ\le\theta\le90^\circ$에서 가능한 θ는?', ['30°','45°','60°','90°'], 0, '$S\cos\theta=S\sqrt3/2$이므로 $\cos\theta=\sqrt3/2$, θ=30°.', '역산'],
      q('원래 넓이가 80이고 정사영 넓이가 40일 때 $\theta$는?', ['30°','45°','60°','75°'], 2, '$40=80\cos\theta$이므로 $\cos\theta=1/2$, θ=60°.', '계산'],
      q('같은 원래 넓이에서 정사영 넓이가 가장 작은 경우는?', ['θ=0°','θ=30°','θ=60°','θ=90°'], 3, '$S\cos\theta$에서 90°일 때 0으로 최소.', '함수 해석'],
      q('정사영 공식 $S'=S\cos\theta$에서 θ를 0°→60°로 바꾸면 넓이는 어떻게 변하는가?', ['1/2배','√3/2배','2배','변하지 않음'], 0, '$\cos0=1$, $\cos60=1/2$이므로 절반.', '비교 추론'],
      q('$P(1,-2,3)$, $Q(5,1,-1)$에서 x,y 성분만으로 계산한 거리는 실제 3차원 거리와 어떤 관계인가?', ['항상 크다','항상 같다','실제 거리보다 작거나 같다','항상 두 배'], 2, 'z 성분의 제곱이 빠져 실제 거리보다 작거나 같고 z차가 0일 때만 같다.', '오류 분석'],
      q('$P(2,-1,4)$에서 $Q(5,3,z)$까지 거리가 5일 때 z의 가능한 값은?', ['4만','0만','4 또는 -4','-1만'], 2, '$25=3^2+4^2+(z-4)^2$이므로 $(z-4)^2=0$. 따라서 z=4 하나만 가능. 제시 보기에 오류가 있으므로 정답은 1번이어야 한다.', '검산'],
      q('위 문제를 정확히 판정하면 z의 값은?', ['4','0','±4','±1'], 0, '$25=9+16+(z-4)^2$이므로 z=4.', '오류 수정'],
      q('원점과 $(x,y,z)$ 사이 거리가 13이고 x=3,y=4일 때 z의 가능한 값은?', ['0','±12','±10','12'], 1, '$169=9+16+z^2$이므로 $z^2=144$, z=±12.', '3차원 계산'],
      q('정사영·삼수선·공간좌표의 공통점으로 가장 적절한 것은?', ['평면과 공간의 관계를 정량화하거나 시각화한다.','모두 이차곡선만 다룬다.','모두 미분이 필수다.','모두 거리의 차만 사용한다.'], 0, '노트의 기하 범위는 이차곡선뿐 아니라 정사영, 수직 관계, 공간좌표를 포함한다.', '종합 연결'],
      q('다음 중 “공식 암기”보다 조건 해석이 더 필요한 문제는?', [' $y^2=4px$에서 p 구하기 ',' $S'=S\cos\theta$에서 θ 역산하기 ',' $x,y,z$를 그대로 읽기 ',' 단순히 초점 이름 쓰기 '], 1, '정사영 값을 이용해 각도를 역산하려면 공식과 조건을 함께 해석해야 한다.', '유형 판별']
    ]
  },
  chemistry: {
    title: '화학 모의고사 · 고난도', color: 'chemistry',
    questions: [
      q('$n,T$가 일정한 이상 기체의 압력을 1.5배로 만들었다. 부피는?', ['1.5배','2/3배','3/2배','변하지 않음'], 1, '보일 법칙에서 $PV$ 일정이므로 $V$는 $1/1.5=2/3$배.', '비례 추론'],
      q('압력 0.80 atm에서 부피 3.0 L인 기체를 같은 n,T에서 1.20 atm으로 압축하면 부피는?', ['1.0 L','2.0 L','2.5 L','4.5 L'], 1, '$0.8\times3.0=1.2V_2$이므로 $V_2=2.0$ L.', '계산'],
      q('압력 일정에서 300 K, 2.4 L인 기체를 450 K까지 가열하면 부피는?', ['1.6 L','3.2 L','3.6 L','4.8 L'], 2, '$V_2/V_1=450/300=1.5$, 따라서 3.6 L.', '계산'],
      q('이상 기체 계산에서 섭씨 27°C를 T에 그대로 넣었다. 가장 직접적인 수정은?', ['27 K','246 K','273 K','300 K'], 3, '절대온도를 사용해야 하므로 27+273=300 K.', '오류 분석'],
      q('혼합 기체에서 A의 몰수가 3 mol, B가 2 mol, 전체 압력이 5 atm이다. A의 부분 압력은?', ['2 atm','3 atm','3.0 atm','5 atm'], 2, '$X_A=3/5$, $P_A=(3/5)\times5=3$ atm.', '복합 계산'],
      q('A의 몰분율이 0.20이고 전체 압력이 8 atm일 때 A의 부분압력과 B(두 성분뿐)의 부분압력은?', ['1.6 atm, 6.4 atm','0.2 atm, 7.8 atm','6.4 atm, 1.6 atm','8 atm, 0 atm'], 0, '$P_A=0.2\times8=1.6$, $X_B=0.8$이므로 $P_B=6.4$ atm.', '복합 추론'],
      q('몰랄 농도가 3 mol/kg이고 용매가 200 g이다. 용질의 몰수는?', ['0.06 mol','0.6 mol','1.5 mol','3.0 mol'], 1, '200 g=0.2 kg. $n=m\times0.2=0.6$ mol.', '단위 변환'],
      q('같은 $K_b$를 가진 두 용액에서 몰랄 농도가 2배 차이 난다면 끓는점 오름값의 비는?', ['1:1','1:2','2:1','4:1'], 1, '$\Delta T_b=K_bm$이므로 농도비가 곧 오름값 비이다.', '비례 추론'],
      q('$\Pi=CRT$에서 C를 1.5배, T를 2/3배로 동시에 바꾸면 삼투압은?', ['1배','1.5배','2배','2/3배'], 0, $1.5\times2/3=1$이므로 동일.', '복합 비례'],
      q('어떤 용액의 삼투압이 2.4 atm이다. C를 2배, T를 1/2배로 바꾸면?', ['1.2 atm','2.4 atm','4.8 atm','9.6 atm'], 1, '$\Pi$는 C와 T의 곱에 비례하므로 변화 없음.', '변화율'],
      q('반응물의 엔탈피 합이 420 kJ, 생성물의 엔탈피 합이 350 kJ라면 ΔH는?', ['+70 kJ','-70 kJ','+770 kJ','-770 kJ'], 1, '$\Delta H=350-420=-70$ kJ.', '엔탈피 계산'],
      q('발열 반응의 ΔH=-120 kJ/mol이다. 같은 반응을 역반응으로 쓰면 ΔH는?', ['-120','0','+120','+240'], 2, 역반응에서는 부호가 반대.', '헤스 법칙'],
      q('헤스 법칙으로 반응을 계산할 때 가장 중요한 불변 조건은?', ['반응 속도','촉매 종류','처음과 나중 상태','몰분율'], 2, 처음 상태와 나중 상태가 같으면 경로와 무관하게 총 엔탈피가 같다.', '개념 추론'],
      q('$\Delta H=+40$ kJ, $\Delta S=+80$ J/K일 때 500 K에서 ΔG는?', ['-80 kJ','0','+40 kJ','+80 kJ'], 1, '$40,000-500\times80=0$ J.', '단위 변환'],
      q('같은 반응에서 $\Delta H=+40$ kJ, $\Delta S=+80$ J/K이면 250 K에서 ΔG는?', ['-20 kJ','0','+20 kJ','+40 kJ'], 2, '$40,000-250\times80=20,000$ J=+20 kJ.', '연계 계산'],
      q('위 반응에서 ΔG=0이 되는 온도는?', ['200 K','400 K','500 K','800 K'], 2, '0=$40,000-80T$ → T=500 K.', '역산'],
      q('촉매를 넣었더니 활성화 에너지가 변했다. 다음 중 반드시 변하지 않는 것은?', ['새로운 반응 경로','활성화 에너지','반응 엔탈피 ΔH','반응 속도'], 2, '노트는 촉매가 새로운 경로와 $E_a$를 바꾸지만 ΔH는 변하지 않는다고 설명한다.', '개념 함정'],
      q('온도 상승으로 반응 속도가 빨라지는 설명 중 노트와 가장 일치하는 것은?', ['모든 입자의 질량이 증가한다.','$E_a$ 이상 에너지를 가진 입자의 비율이 증가한다.','ΔH가 자동으로 음수가 된다.','몰분율 합이 변한다.'], 1, '노트는 온도 상승으로 $E_a$ 이상 에너지를 가진 입자 비율이 크게 증가한다고 설명한다.', '개념 적용'],
      q('유효 충돌의 두 조건을 모두 만족하지 못하는 충돌에 대한 설명으로 옳은 것은?', ['반드시 생성물이 생긴다.','반응을 일으키는 유효 충돌이 아니다.','촉매가 있으면 항상 유효해진다.','엔탈피가 0이 된다.'], 1, '올바른 충돌 방향과 $E_a$ 이상의 에너지가 필요하다.', '조건 판별'],
      q('다음 세 식 중 정리노트의 공식과 일치하는 조합은?', ['PV=nRT, Π=CRT, ΔG=ΔH−TΔS','PV=n/T, Π=C/R, ΔG=ΔH+TΔS','PV=RT/n, Π=CT/R, ΔG=TΔH−ΔS','PV=P/nRT, Π=C+RT, ΔG=ΔH/T'], 0, '세 식 모두 노트에 제시된 핵심 공식이다.', '종합 확인']
    ]
  },
  physics: {
    title: '물리학 모의고사 · 고난도', color: 'physics',
    questions: [
      q('6 N과 8 N의 두 힘이 수직으로 작용한다. 합력은?', ['2 N','10 N','14 N','48 N'], 1, '피타고라스 관계로 $\sqrt{6^2+8^2}=10$ N.', '벡터 계산'],
      q('10 N, 10 N의 두 힘이 60°를 이룬다. 합력은?', ['10 N','10√2 N','10√3 N','20 N'], 2, '$F=\sqrt{100+100+200\cos60}=10\sqrt3$ N.', '코사인 제2법칙'],
      q('합력이 0이 되기 위한 두 힘의 조건은?', ['같은 크기·같은 방향','다른 크기·반대 방향','같은 크기·반대 방향','직각 방향'], 2, '두 벡터가 정확히 상쇄되어야 하므로 크기는 같고 방향은 반대.', '힘의 평형'],
      q('다음 중 스칼라와 벡터의 짝이 옳은 것은?', ['힘-스칼라, 질량-벡터','에너지-스칼라, 힘-벡터','변위-스칼라, 시간-벡터','온도-벡터, 속력-벡터'], 1, '노트의 예시에서 에너지는 스칼라, 힘은 벡터.', '개념 판별'],
      q('초기속력 20 m/s, 발사각 30°일 때 수평 속도 성분은?', ['10 m/s','10√3 m/s','20 m/s','20√3 m/s'], 1, '$v_x=v_0\cos30=10\sqrt3$.', '성분 분해'],
      q('같은 초기속력으로 30°와 60°에서 같은 높이로 발사·착지한다. 수평 도달거리는?', ['30°가 2배','60°가 2배','같다','둘 다 0'], 2, '$R=v_0^2\sin2\theta/g$에서 sin60과 sin120이 같다.', '함정 추론'],
      q('포물선 운동의 최고점에서 수직속도 성분은?', ['최대','0','g','수평속도와 동일'], 1, '최고점에서는 $v_y=0$.', '개념 적용'],
      q('정리노트의 이상적 포물선 운동에서 수평 방향 운동은?', ['등가속도','등속 직선 운동','원운동','정지'], 1, '수평방향 힘이 없어 등속 직선 운동이다.', '개념 판별'],
      q('$T=2\pi/\omega$에서 각속도가 4배가 되면 주기는?', ['4배','2배','1/2배','1/4배'], 3, 'T는 ω에 반비례하므로 1/4배.', '비례 추론'],
      q('질량과 반지름이 일정한 등속 원운동에서 각속도를 3배로 하면 구심력은?', ['3배','6배','9배','1/3배'], 2, '$F_c=mr\omega^2$이므로 9배.', '제곱 비례'],
      q('같은 속력에서 원운동 반지름을 2배로 하면 구심력은?', ['2배','1/2배','4배','변하지 않음'], 1, '$F_c=mv^2/r$이므로 반지름 2배면 1/2배.', '역비례'],
      q('케플러 제3법칙 $T^2\propto a^3$에서 a가 4배면 T는?', ['2배','4배','8배','16배'], 2, $T\propto a^{3/2}$이므로 8배.', '거듭제곱 추론'],
      q('a가 9배가 된 다른 궤도의 주기는 몇 배인가?', ['3배','9배','27배','81배'], 2, $9^{3/2}=27$.', '거듭제곱 추론'],
      q('만유인력에서 거리가 3배가 되면 힘은?', ['3배','1/3배','1/6배','1/9배'], 3, '$F\propto1/r^2$.', '제곱 반비례'],
      q('두 질량을 각각 2배, 거리를 2배 하면 만유인력은?', ['1/4배','1/2배','같음','2배'], 2, 분자가 4배, 분모 r²도 4배.', '복합 비례'],
      q('중력장의 정의로 노트와 가장 가까운 것은?', ['모든 질량의 총합','질량 1 kg 물체가 받는 중력의 크기를 위치마다 나타낸 것','행성 표면에서만 존재','빛의 속력'], 1, '노트는 위치마다 1 kg 물체가 받는 중력의 크기로 정의한다.', '개념 판별'],
      q('특수 상대성에서 빠르게 움직이는 물체의 운동 방향 길이는?', ['길어짐','짧아짐','항상 동일','무한대'], 1, '노트의 길이 수축 개념이다.', '개념 적용'],
      q('고유 시간 Δt0와 시간 지연에 대한 설명으로 옳은 것은?', ['Δt0가 가장 짧다.','Δt0가 가장 길다.','Δt0는 항상 0이다.','Δt0는 질량과 같다.'], 0, '노트는 고유 시간 Δt0가 가장 짧다고 정리한다.', '개념 판별'],
      q('특수 상대성의 두 기본 원리를 모두 고른 것은?', ['상대성 원리 + 광속 불변','중력 불변 + 시간 불변','질량 불변 + 길이 불변','관성력 + 중력 동일'], 0, '노트는 모든 관성계에서 물리 법칙 동일, 진공에서 광속 불변을 제시한다.', '개념 종합'],
      q('일반 상대성의 등가 원리와 가장 일치하는 설명은?', ['균일한 중력장과 일정한 가속계의 현상을 구별할 수 없다.','중력은 항상 0이다.','관성력과 중력은 반대 개념이다.','빛은 질량이 없으므로 휘지 않는다.'], 0, '노트는 균일한 중력장과 일정하게 가속되는 좌표계를 구별할 수 없다고 설명한다.', '개념 추론']
    ]
  }
};

// 고난도 문제에서 오탈자 검산이 필요한 문항은 시작 시 바로잡는다.
EXAMS.geometry.questions[0] = q('$y^2=20x$의 기울기 $m=2$인 접선의 방정식은?', [' $y=2x+2.5$ ',' $y=2x+5$ ',' $y=2x-2.5$ ',' $y=2x-5$ '], 0, '$4p=20$이므로 p=5. 노트의 접선식 $y=mx+p/m$을 적용하면 $y=2x+2.5$.', '계산');
EXAMS.geometry.questions[2] = q('타원 $x^2/49+y^2/25=1$의 장축과 단축의 길이의 합은?', ['12','14','19','24'], 3, 'a=7,b=5이므로 장축 14, 단축 10. 합은 24.', '복합 계산');
EXAMS.geometry.questions[15] = q('$P(2,-1,4)$에서 $Q(5,3,z)$까지 거리가 5일 때 z는?', ['4','0','±4','±1'], 0, '$25=3^2+4^2+(z-4)^2$이므로 z=4.', '3차원 계산');

const state = { exam:null, index:0, answers:[], remaining:2700, timer:null, forced:false };
const app = document.getElementById('app');

const style = document.createElement('style');
style.textContent = `.hard-label{display:inline-block;padding:4px 8px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-size:10px;font-weight:900;margin-left:6px}.dark .hard-label{background:#450a0a;color:#fecaca}.question-panel .type-label{display:inline-block;padding:4px 8px;border-radius:999px;background:#f3f4f6;color:#374151;font-size:10px;font-weight:900;margin-bottom:12px}.dark .question-panel .type-label{background:#1f2937;color:#d1d5db}`;
document.head.appendChild(style);

function fmt(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.max(0,s%60)).padStart(2,'0')}`;}
function typeset(){ if(window.renderMathInElement){ window.renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false}); } }
function injectTheme(){ const b=document.getElementById('themeToggleBtn'); if(!b) return; b.onclick=()=>{document.documentElement.classList.toggle('dark'); localStorage.theme=document.documentElement.classList.contains('dark')?'dark':'light';}; }
function home(){ clearInterval(state.timer); state.exam=null; state.answers=[]; state.index=0; state.remaining=2700; app.innerHTML=`<div class="exam-shell"><section class="exam-hero"><div class="exam-kicker">INTEGRATED SCIENCE · HARD MODE</div><h1>통합 과학 고난도 모의고사</h1><p>단순 암기형을 줄이고 계산, 조건 해석, 비례 추론, 오류 분석, 공식 변형, 복합 개념 연결을 섞은 유형입니다. 각 영역 20문제 · 45분입니다.</p></section><section class="exam-cards"><button class="exam-card geometry" onclick="startHardExam('geometry')"><div class="exam-card-icon">◇</div><div class="exam-meta">20 QUESTIONS · 45 MIN</div><h2>기하</h2><p>이차곡선·접선·정사영·공간좌표 중심의 고난도 계산/추론.</p><span>기하 시험 시작 →</span><small>난이도: VERY HARD</small></button><button class="exam-card chemistry" onclick="startHardExam('chemistry')"><div class="exam-card-icon">⚗</div><div class="exam-meta">20 QUESTIONS · 45 MIN</div><h2>화학</h2><p>기체·몰분율·삼투압·엔탈피·깁스·반응속도 복합형.</p><span>화학 시험 시작 →</span><small>난이도: VERY HARD</small></button><button class="exam-card physics" onclick="startHardExam('physics')"><div class="exam-card-icon">∿</div><div class="exam-meta">20 QUESTIONS · 45 MIN</div><h2>물리학</h2><p>힘·포물선·원운동·케플러·중력·상대성의 연계형.</p><span>물리학 시험 시작 →</span><small>난이도: VERY HARD</small></button></section></div>`; injectTheme(); }
function startHardExam(key){ state.exam=EXAMS[key]; state.index=0; state.answers=new Array(20).fill(null); state.remaining=2700; state.forced=false; clearInterval(state.timer); state.timer=setInterval(()=>{state.remaining--; updateTimer(); if(state.remaining<=0){state.forced=true; submit();}},1000); renderQuestion(); }
window.startHardExam=startHardExam;
function updateTimer(){const el=document.getElementById('timerValue'); if(!el)return; el.textContent=fmt(state.remaining); el.classList.toggle('warning',state.remaining<=300);}
function renderQuestion(){const item=state.exam.questions[state.index]; app.innerHTML=`<div class="exam-shell"><div class="exam-top"><div><span class="exam-subject ${state.exam.color}">${state.exam.title}</span><strong>고난도 유형 혼합</strong></div><div class="timer-box"><span>남은 시간</span><strong id="timerValue">${fmt(state.remaining)}</strong></div><button class="ghost-btn" onclick="exitHardExam()">시험 종료</button></div><div class="exam-layout"><aside class="question-map"><h3>문제 번호</h3><div class="q-grid">${state.exam.questions.map((_,i)=>`<button class="q-dot ${i===state.index?'current':''} ${state.answers[i]!==null?'answered':''}" onclick="gotoHard(${i})">${i+1}</button>`).join('')}</div><div class="map-note">파란색: 응답 완료<br>진한색: 현재 문제<br>남은 시간은 자동 갱신</div></aside><main class="question-panel"><div class="question-number">QUESTION ${String(state.index+1).padStart(2,'0')} / 20</div><span class="type-label">${item[4]}</span><span class="hard-label">VERY HARD</span><div class="question-context">정리노트 범위 안에서 공식과 조건을 함께 판단합니다.</div><h2>${item[0]}</h2><div class="choices">${item[1].map((c,i)=>`<label class="choice ${state.answers[state.index]===i?'selected':''}"><input type="radio" name="choice" ${state.answers[state.index]===i?'checked':''} onchange="answerHard(${i})"><span class="choice-key">${String.fromCharCode(65+i)}</span><span>${c}</span></label>`).join('')}</div><div class="exam-actions"><button class="outline-btn" onclick="prevHard()" ${state.index===0?'disabled':''}>← 이전</button>${state.index===19?'<button class="primary-btn" onclick="submit()">답안 제출</button>':'<button class="primary-btn" onclick="nextHard()">다음 문제 →</button>'}</div></main></div></div>`; updateTimer(); typeset(); }
function answerHard(i){state.answers[state.index]=i; renderQuestion();}
function nextHard(){if(state.index<19){state.index++;renderQuestion();}}
function prevHard(){if(state.index>0){state.index--;renderQuestion();}}
function gotoHard(i){state.index=i;renderQuestion();}
function exitHardExam(){if(confirm('시험을 종료하고 영역 선택 화면으로 돌아갈까요?')) home();}
window.answerHard=answerHard; window.nextHard=nextHard; window.prevHard=prevHard; window.gotoHard=gotoHard; window.exitHardExam=exitHardExam;
function submit(){clearInterval(state.timer);const score=state.exam.questions.reduce((n,item,i)=>n+(state.answers[i]===item[2]?1:0),0);const answered=state.answers.filter(v=>v!==null).length;app.innerHTML=`<div class="exam-shell"><div class="result-panel"><div class="exam-kicker">${state.forced?'TIME LIMIT REACHED':'EXAM COMPLETE'}</div><h1>${state.exam.title}</h1><div class="score-ring"><strong>${score*5}</strong><span>점 / 100</span></div><p class="result-summary">20문제 중 ${score}문제 정답 · ${answered}문제 응답 · ${20-answered}문제 미응답</p><div class="result-actions"><button class="outline-btn" onclick="home()">다른 모의고사</button><button class="primary-btn" onclick="showReview()">정답·해설 보기</button></div></div><div id="reviewMount"></div></div>`; window.__score=score; typeset(); injectTheme();}
window.submit=submit;
function showReview(){const m=document.getElementById('reviewMount'); if(!m)return; m.innerHTML=`<section class="review-panel"><div class="review-head"><h2>정답 및 해설</h2><span>${window.__score}/20</span></div>${state.exam.questions.map((item,i)=>{const ok=state.answers[i]===item[2];const mine=state.answers[i]===null?'미응답':String.fromCharCode(65+state.answers[i]);const ans=String.fromCharCode(65+item[2]);return `<div class="review-item ${ok?'correct':'wrong'}"><div class="review-title"><strong>${i+1}. ${item[0]}</strong><span>${ok?'정답':'오답'}</span></div><div class="review-answer">내 답: ${mine} · 정답: ${ans}</div><p>${item[3]}</p></div>`;}).join('')}</section>`; typeset(); m.scrollIntoView({behavior:'smooth'});}
window.showReview=showReview;
window.addEventListener('load',()=>{injectTheme();home();});
})();
