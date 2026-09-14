(() => {
  'use strict';

  const EXAMS = {
    geometry: {
      title: '기하 모의고사', color: 'geometry',
      questions: [
        ['$y^2=20x$의 기울기 2인 접선의 방정식은?', ['y=2x+5/2','y=2x+10','y=2x-5/2','y=2x+4'], 0, 'y²=4px에서 p=5이고 접선은 y=mx+p/m이므로 y=2x+5/2이다.', '계산형'],
        ['$x^2/25+y^2/9=1$의 장축 길이는?', ['5','6','10','18'], 2, 'a=5이므로 장축의 길이는 2a=10이다.', '기본 계산'],
        ['타원의 두 초점까지 거리의 합이 16이고 단축의 길이가 12일 때 $a,b$는?', ['a=8,b=6','a=16,b=12','a=6,b=8','a=8,b=12'], 0, '2a=16, 2b=12이므로 a=8,b=6이다.', '조건 추론'],
        ['$x^2/16-y^2/9=1$의 점근선의 기울기 절댓값은?', ['3/4','4/3','7/4','12'], 0, 'a=4,b=3이므로 y=±(b/a)x, 즉 기울기 절댓값은 3/4이다.', '공식 적용'],
        ['타원과 쌍곡선을 두 초점까지의 거리 조건으로 비교한 설명 중 옳은 것은?', ['타원은 거리의 합, 쌍곡선은 거리의 차가 일정하다.','둘 다 거리의 합이 일정하다.','타원은 거리의 차, 쌍곡선은 거리의 합이 일정하다.','둘 다 거리의 차가 일정하다.'], 0, '타원은 두 초점까지 거리의 합, 쌍곡선은 거리의 차가 일정하다.', '개념 비교'],
        ['이차곡선에 접하는 직선을 판별식으로 구할 때 교점이 중근이 되는 조건은?', ['D<0','D=0','D>0','D=1'], 1, '접선에서는 두 교점이 하나로 겹치므로 판별식 D=0이다.', '오류 판별'],
        ['정사영 넓이가 $S\cos\theta$일 때 원래 넓이의 1/2가 되려면 θ는?', ['30°','45°','60°','90°'], 2, 'cosθ=1/2이므로 0°~90°에서 θ=60°이다.', '역산형'],
        ['원래 넓이가 72이고 두 평면의 각이 60°일 때 정사영 넓이는?', ['18','36','36√3','72'], 1, '72cos60°=36이다.', '계산형'],
        ['정사영 넓이를 가장 작게 만드는 각은?', ['0°','30°','60°','90°'], 3, 'S\cosθ에서 0°~90° 범위의 최솟값은 θ=90°일 때 0이다.', '함수 해석'],
        ['원점과 P(3,4,z)의 거리가 13일 때 z의 가능한 값은?', ['0','±12','±10','12'], 1, '169=9+16+z²이므로 z²=144, z=±12이다.', '공간좌표'],
        ['P(1,-2,3), Q(5,1,-1)의 거리는?', ['√29','√32','√41','7'], 2, '√((4)²+(3)²+(-4)²)=√41이다.', '3차원 계산'],
        ['두 점의 거리 계산에서 z성분을 빼먹었을 때의 결과는?', ['항상 실제보다 크다.','항상 실제와 같다.','실제 거리보다 작거나 같고 z차가 0일 때만 같다.','항상 두 배다.'], 2, '빠진 제곱항이 음수가 아니므로 계산값은 실제 거리보다 작거나 같다.', '오류 분석'],
        ['포물선 $y^2=12x$의 초점과 준선의 x좌표 합은?', ['-6','0','3','6'], 1, 'p=3, 초점 x=3, 준선 x=-3이므로 합은 0이다.', '구조 추론'],
        ['$y^2=16x$의 기울기 -2인 접선의 y절편은?', ['-4','-2','2','4'], 1, 'p=4이고 p/m=4/(-2)=-2이다.', '계산형'],
        ['어떤 타원의 장축 길이가 18, 단축 길이가 10이다. a+b는?', ['9','14','18','28'], 1, '2a=18→a=9, 2b=10→b=5이므로 a+b=14이다.', '복합 계산'],
        ['쌍곡선 $x^2/36-y^2/64=1$의 점근선 기울기 절댓값은?', ['3/4','4/3','8/6','6/8'], 1, 'a=6,b=8이므로 |m|=b/a=4/3이다.', '공식 적용'],
        ['정사영 넓이가 원래 넓이의 √3/2라면 θ는?', ['30°','45°','60°','90°'], 0, 'cosθ=√3/2이므로 θ=30°이다.', '역산형'],
        ['삼수선의 정리와 가장 직접적으로 관련된 것은?', ['공간상의 수직 관계','용액의 농도','등가속도 운동','반응 엔탈피'], 0, '삼수선의 정리는 공간에서 수선과 정사영의 수직 관계를 다룬다.', '개념 판별'],
        ['공간좌표에서 x,y,z 세 좌표가 모두 바뀌면 거리 계산에서 필요한 항의 수는?', ['1개','2개','3개','6개'], 2, '각 좌표 차이의 제곱 세 항을 더한다.', '구조 이해'],
        ['다음 중 단순 암기보다 조건 해석이 가장 중요한 문제는?', ['포물선의 준선 위치','정사영 비율로 θ 역산','x,y,z의 기호 읽기','타원의 장축 이름'], 1, '정사영 값을 이용해 각도를 역산하는 문제는 공식과 조건을 함께 해석해야 한다.', '유형 판단'],
        ['P(0,0,0), Q(6,8,0)의 거리가 10일 때 Q를 (6,8,z)로 바꾸어 같은 거리를 유지하려면 z는?', ['-10','0','10','모든 실수'], 1, '100=36+64+z²이므로 z=0이다.', '조건 추론']
      ]
    },
    chemistry: {
      title: '화학 모의고사', color: 'chemistry',
      questions: [
        ['$n,T$가 일정한 이상 기체의 압력을 1.5배로 하면 부피는?', ['1.5배','2/3배','3/2배','변하지 않는다.'], 1, 'PV=일정이므로 V는 압력에 반비례한다.', '비례 추론'],
        ['압력 0.8 atm, 부피 3.0 L인 기체를 1.2 atm으로 압축할 때 부피는?', ['1.5 L','2.0 L','2.4 L','4.5 L'], 1, 'P1V1=P2V2이므로 0.8×3.0=1.2V2, V2=2.0 L이다.', '계산형'],
        ['압력 일정에서 300 K, 2.4 L인 기체를 450 K로 올리면 부피는?', ['1.6 L','3.0 L','3.6 L','4.8 L'], 2, 'V∝T이므로 2.4×450/300=3.6 L이다.', '계산형'],
        ['27°C를 이상 기체 식의 T에 그대로 넣었다. 올바른 값은?', ['27 K','246 K','273 K','300 K'], 3, '절대온도는 섭씨온도에 273을 더하므로 300 K이다.', '오류 분석'],
        ['A 3 mol, B 2 mol인 혼합 기체의 전체 압력이 5 atm일 때 A의 부분 압력은?', ['2 atm','3 atm','3.5 atm','5 atm'], 1, 'XA=3/5이고 PA=XA Ptotal=3 atm이다.', '복합 계산'],
        ['A의 몰분율이 0.20이고 전체 압력이 8 atm이다. B가 유일한 나머지 성분이면 PB는?', ['1.6 atm','2.4 atm','6.4 atm','8 atm'], 2, 'XB=0.80이므로 PB=0.80×8=6.4 atm이다.', '복합 추론'],
        ['몰랄 농도 3 mol/kg인 용액의 용매가 200 g일 때 용질 몰수는?', ['0.06 mol','0.6 mol','1.5 mol','3 mol'], 1, '200 g=0.2 kg이고 n=3×0.2=0.6 mol이다.', '단위 변환'],
        ['같은 용매와 Kb에서 몰랄 농도가 2배가 되면 끓는점 오름은?', ['1/2배','같다.','2배','4배'], 2, 'ΔTb=Kb m이므로 농도에 정비례한다.', '비례 추론'],
        ['$Π=CRT$에서 C를 1.5배, T를 2/3배로 동시에 바꾸면 Π는?', ['1/2배','같다.','1.5배','2배'], 1, '1.5×2/3=1이므로 삼투압은 변하지 않는다.', '복합 비례'],
        ['삼투압 2.4 atm인 용액에서 C를 2배, T를 1/2배로 하면 삼투압은?', ['1.2 atm','2.4 atm','4.8 atm','9.6 atm'], 1, 'C와 T의 곱이 같아져 Π도 그대로이다.', '변화량 추론'],
        ['생성물 엔탈피 합이 350 kJ, 반응물 합이 420 kJ이면 ΔH는?', ['+70 kJ','-70 kJ','+770 kJ','-770 kJ'], 1, 'ΔH=ΣH생성물-ΣH반응물=350-420=-70 kJ이다.', '엔탈피 계산'],
        ['발열 반응 ΔH=-120 kJ/mol을 역반응으로 쓰면 ΔH는?', ['-120','-60','+60','+120'], 3, '역반응에서는 엔탈피 변화의 부호가 반대가 된다.', '헤스 법칙'],
        ['헤스 법칙에서 가장 중요한 것은?', ['반응 속도','처음과 나중 상태','촉매의 양','부분 압력'], 1, '같은 초기·최종 상태라면 경로와 무관하게 총 엔탈피가 같다.', '개념 추론'],
        ['$ΔH=+40$ kJ, $ΔS=+80$ J/K일 때 500 K에서 ΔG는?', ['-40 kJ','0','+40 kJ','+80 kJ'], 1, 'ΔH=40000 J이고 TΔS=500×80=40000 J이므로 ΔG=0이다.', '단위 변환'],
        ['위 조건에서 250 K일 때 ΔG는?', ['-20 kJ','0','+20 kJ','+40 kJ'], 2, '40000-250×80=20000 J=+20 kJ이다.', '연계 계산'],
        ['촉매에 대한 설명으로 옳은 것은?', ['ΔH를 바꾼다.','새 경로를 제공하여 Ea를 낮출 수 있다.','생성물 종류를 바꾼다.','몰수를 증가시킨다.'], 1, '촉매는 새로운 반응 경로를 제공하여 활성화 에너지를 변화시키지만 ΔH 자체는 바꾸지 않는다.', '개념 함정'],
        ['유효 충돌이 되기 위해 필요한 조건으로 가장 적절한 것은?', ['충돌 방향과 충분한 에너지','질량이 같음','온도가 0 K','압력이 1 atm'], 0, '올바른 방향과 활성화 에너지 이상의 충돌 에너지가 필요하다.', '개념 판별'],
        ['온도를 올렸을 때 반응 속도가 증가하는 주된 이유는?', ['모든 입자의 질량 증가','Ea 이상의 에너지를 가진 입자의 비율 증가','ΔH가 0이 됨','몰분율 합 변화'], 1, '온도가 상승하면 Ea 이상 에너지를 가진 입자의 비율이 증가한다.', '자료 해석'],
        ['A의 몰분율이 0.2에서 0.35로 증가하고 전체 압력이 4 atm으로 일정하다. PA의 증가는?', ['0.15 atm','0.4 atm','0.6 atm','1.4 atm'], 2, '4×(0.35-0.20)=0.60 atm 증가이다.', '변화량 계산'],
        ['다음 공식 연결 중 모두 옳은 것은?', ['PV=nRT / Π=CRT / ΔG=ΔH−TΔS','PV=n/T / Π=C/RT / ΔG=ΔH+TΔS','PV=R/nT / Π=CT/R / ΔG=TΔH−ΔS','PV=P/nRT / Π=RT/C / ΔG=ΔH/T−ΔS'], 0, '세 식 모두 정리노트의 핵심 공식이다.', '종합 연결']
      ]
    },
    physics: {
      title: '물리학 모의고사', color: 'physics',
      questions: [
        ['다음 중 스칼라 물리량은?', ['힘','가속도','질량','변위'], 2, '질량은 방향이 없는 스칼라 물리량이다.', '개념 판별'],
        ['다음 중 벡터 물리량은?', ['시간','온도','에너지','힘'], 3, '힘은 크기와 방향을 가지므로 벡터이다.', '개념 판별'],
        ['$F_1=6N$, $F_2=8N$가 서로 수직일 때 합력은?', ['2 N','10 N','14 N','48 N'], 1, '√(6²+8²)=10 N이다.', '벡터 계산'],
        ['$10N$인 두 힘이 60°를 이룰 때 합력은?', ['10 N','10√2 N','10√3 N','20 N'], 2, '√(100+100+200cos60°)=10√3 N이다.', '코사인 법칙'],
        ['두 힘의 합력이 0이 되려면?', ['같은 크기·같은 방향','다른 크기·반대 방향','같은 크기·반대 방향','항상 직각'], 2, '서로 반대 방향이고 크기가 같아야 상쇄된다.', '평형 조건'],
        ['초기 속력 20 m/s, 발사각 30°일 때 수평 속도 성분은?', ['10','10√3','20√3','20'], 1, 'vx=v0cos30°=10√3 m/s이다.', '성분 분해'],
        ['같은 높이에서 같은 속력으로 발사한 30°와 60°의 수평 도달 거리는?', ['30°가 2배','60°가 2배','같다.','둘 다 0'], 2, 'R=v0²sin2θ/g에서 sin60°=sin120°이므로 같다.', '함정 추론'],
        ['포물선 운동 최고점에서 수직 속도 성분은?', ['최대','0','g','수평 속도와 같다'], 1, '최고점에서는 vy=0이다.', '개념 적용'],
        ['수평 방향 외력이 없는 포물선 운동에서 수평 이동량은 무엇에 의해 정해지는가?', ['수평 속도 성분과 시간','질량만','중력만','수직 속도만'], 0, 'x방향은 등속 운동이므로 Δx=vx t이다.', '조건 해석'],
        ['원운동에서 주기와 각속도의 관계는?', ['T=2πω','T=ω/2π','T=2π/ω','T=1/(2πω)'], 2, '정리노트 공식 T=2π/ω이다.', '공식 변형'],
        ['각속도를 2배로 하고 m,r을 유지하면 구심력은?', ['1/2배','2배','4배','변하지 않음'], 2, 'Fc=mrω²이므로 ω가 2배면 4배이다.', '제곱 비례'],
        ['같은 속력으로 더 작은 반지름의 원운동을 하면 구심력은?', ['증가','감소','일정','0'], 0, 'Fc=mv²/r에서 r이 작아지면 Fc가 증가한다.', '반비례 추론'],
        ['케플러 3법칙 T²∝a³에서 a가 4배면 T는?', ['2배','4배','8배','16배'], 2, 'T∝a^(3/2)이므로 4^(3/2)=8이다.', '거듭제곱 추론'],
        ['만유인력에서 두 질량 사이 거리를 2배로 하면 힘은?', ['2배','1/2배','1/4배','4배'], 2, 'F∝1/r²이므로 1/4배가 된다.', '제곱 반비례'],
        ['두 질량을 각각 2배, 거리를 2배로 하면 만유인력은?', ['1/4배','1/2배','같다.','2배'], 2, '분자 4배와 분모 r² 4배가 상쇄되어 같다.', '복합 비례'],
        ['중력장에 대한 설명으로 옳은 것은?', ['오직 지구 내부의 힘','중력이 미치는 공간','빛의 속도 자체','질량의 총합'], 1, '중력장은 중력이 미치는 공간을 말한다.', '개념 판별'],
        ['빠르게 움직이는 물체의 길이는 운동 방향으로 어떻게 측정되는가?', ['길어짐','짧아짐','같음','무한대'], 1, '특수 상대성의 길이 수축에 따라 운동 방향 길이가 짧아진다.', '상대성 개념'],
        ['고유 시간 Δt0의 특징으로 정리노트가 제시한 것은?', ['가장 길다.','가장 짧다.','항상 0이다.','무한대다.'], 1, '정리노트에서는 고유 시간이 가장 짧다고 정리한다.', '상대성 판별'],
        ['특수 상대성의 두 핵심 원리는?', ['모든 관성계에서 물리 법칙 동일 + 진공 광속 불변','모든 가속계에서 힘 0 + 시간 불변','질량 불변 + 길이 불변','중력 일정 + 광속 변화'], 0, '상대성 원리와 광속 불변 원리가 두 핵심 원리이다.', '개념 종합'],
        ['등가 원리에 대한 설명으로 옳은 것은?', ['균일한 중력장과 일정 가속계의 물리 현상은 구별하기 어렵다.','중력은 항상 0이다.','관성력과 중력은 무관하다.','중력파는 항상 정지한다.'], 0, '일반 상대성의 등가 원리는 균일한 중력장과 일정하게 가속되는 좌표계의 물리 현상이 구별되지 않는다는 내용이다.', '일반 상대성']
      ]
    }
  };

  const state = { key: null, index: 0, answers: [], remaining: 2700, timer: null, submitted: false };
  const app = document.getElementById('app');

  function themeInit(){
    const root=document.documentElement;
    const saved=localStorage.getItem('theme');
    if(saved==='dark') root.classList.add('dark'); else root.classList.remove('dark');
    const btn=document.getElementById('themeToggleBtn');
    if(btn) btn.onclick=()=>{root.classList.toggle('dark'); localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');};
  }

  function style(){
    if(document.getElementById('mockStandaloneStyle')) return;
    const s=document.createElement('style'); s.id='mockStandaloneStyle';
    s.textContent=`
      #app{min-height:calc(100vh - 64px)}
      .mock-home,.mock-exam-wrap{max-width:1180px;margin:0 auto;padding:34px 18px 70px}
      .mock-home-hero{padding:38px;background:#fff;border:1px solid #e5e7eb;border-radius:24px;box-shadow:0 12px 35px rgba(15,23,42,.05)}
      .dark .mock-home-hero,.dark .mock-card,.dark .mock-shell,.dark .mock-qmap,.dark .mock-question,.dark .mock-result,.dark .mock-review{background:#0f172a;border-color:#334155;color:#e2e8f0}
      .mock-home-hero h1{font-size:40px;line-height:1.15;margin:8px 0 14px;font-weight:950;letter-spacing:-.04em}
      .mock-home-hero p{max-width:800px;line-height:1.8;color:#4b5563}.dark .mock-home-hero p{color:#94a3b8}
      .mock-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:22px}
      .mock-card{border:1px solid #e5e7eb;border-radius:20px;padding:24px;background:#fff;cursor:pointer;text-align:left;transition:transform .22s,box-shadow .22s}.mock-card:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(15,23,42,.08)}
      .mock-card h2{font-size:26px;margin:10px 0 7px}.mock-card p{font-size:13px;line-height:1.7;color:#64748b}.dark .mock-card p{color:#94a3b8}
      .mock-badge{display:inline-block;font-size:10px;font-weight:900;letter-spacing:.08em;color:#64748b}.mock-icon{font-size:28px;font-weight:900}.geometry .mock-icon{color:#7c3aed}.chemistry .mock-icon{color:#0f766e}.physics .mock-icon{color:#2563eb}
      .mock-top{display:flex;align-items:center;gap:18px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:15px 18px;margin-bottom:18px}.dark .mock-top{background:#0f172a;border-color:#334155}.mock-top-main{flex:1}.mock-top-main small{display:block;color:#94a3b8;font-size:10px;font-weight:900}.mock-top-main strong{display:block;font-size:17px}.mock-timer{font-weight:950;font-size:25px}.mock-timer.warn{color:#dc2626}.mock-exit{border:1px solid #d1d5db;background:#fff;padding:8px 12px;border-radius:10px;font-weight:800;cursor:pointer}.dark .mock-exit{background:#0f172a;color:#e2e8f0;border-color:#475569}
      .mock-shell{display:grid;grid-template-columns:220px 1fr;gap:18px}.mock-qmap,.mock-question,.mock-result,.mock-review{background:#fff;border:1px solid #e5e7eb;border-radius:20px}.mock-qmap{height:max-content;padding:18px;position:sticky;top:84px}.mock-qmap h3{margin:0 0 12px;font-size:14px}.mock-qgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.mock-q{border:1px solid #d1d5db;background:#fff;border-radius:9px;padding:8px 0;cursor:pointer;font-weight:800}.dark .mock-q{background:#111827;border-color:#475569;color:#e2e8f0}.mock-q.current{background:#111827;color:#fff}.mock-q.done:not(.current){background:#e8f0ff;color:#1d4ed8;border-color:#bfdbfe}.mock-note{margin-top:14px;font-size:10px;line-height:1.7;color:#94a3b8}
      .mock-question{padding:34px;min-height:520px}.mock-num{font-size:11px;font-weight:900;color:#94a3b8;letter-spacing:.13em}.mock-type{display:inline-block;margin:10px 0 8px;padding:4px 8px;border-radius:999px;background:#f3f4f6;color:#374151;font-size:10px;font-weight:900}.dark .mock-type{background:#1f2937;color:#d1d5db}.mock-question h2{font-size:25px;line-height:1.75;margin:10px 0 26px}.mock-choices{display:grid;gap:12px}.mock-choice{display:flex;gap:12px;padding:16px;border:1px solid #e5e7eb;border-radius:13px;background:#fff;cursor:pointer}.dark .mock-choice{background:#0b1220;border-color:#334155}.mock-choice:hover{border-color:#94a3b8}.mock-choice.selected{background:#eff6ff;border-color:#2563eb}.dark .mock-choice.selected{background:#172554;border-color:#3b82f6}.mock-key{font-weight:900;min-width:24px}.mock-actions{display:flex;justify-content:space-between;margin-top:34px}.mock-btn{border-radius:11px;padding:10px 18px;font-weight:900;cursor:pointer}.mock-btn.outline{background:#fff;border:1px solid #d1d5db;color:#111}.dark .mock-btn.outline{background:#0f172a;color:#e2e8f0;border-color:#475569}.mock-btn.primary{background:#111827;color:#fff;border:1px solid #111827}.dark .mock-btn.primary{background:#f8fafc;color:#0f172a;border-color:#f8fafc}.mock-btn:disabled{opacity:.4;cursor:not-allowed}
      .mock-result{padding:44px;text-align:center}.mock-result h1{font-size:36px;margin:8px 0}.mock-score{width:150px;height:150px;border:10px solid #dbeafe;border-radius:50%;margin:24px auto 15px;display:flex;flex-direction:column;justify-content:center;align-items:center}.mock-score strong{font-size:46px}.mock-score span{font-size:12px;color:#64748b}.dark .mock-score{border-color:#1e3a8a}.mock-result p{color:#64748b}.dark .mock-result p{color:#94a3b8}.mock-result-actions{display:flex;justify-content:center;gap:10px;margin-top:22px}.mock-review{margin-top:18px;padding:24px}.mock-review-head{display:flex;justify-content:space-between;border-bottom:1px solid #e5e7eb;padding-bottom:14px}.dark .mock-review-head{border-color:#334155}.mock-review-item{padding:16px 3px;border-bottom:1px solid #eef2f7}.dark .mock-review-item{border-color:#1e293b}.mock-review-item small{display:block;color:#64748b;margin-top:6px;line-height:1.7}.dark .mock-review-item small{color:#94a3b8}.correct-mark{color:#047857;font-weight:900}.wrong-mark{color:#b91c1c;font-weight:900}
      .dark .mock-top,.dark .mock-card,.dark .mock-home-hero,.dark .mock-question,.dark .mock-qmap,.dark .mock-result,.dark .mock-review{color:#e2e8f0}
      @media(max-width:900px){.mock-grid{grid-template-columns:1fr}.mock-shell{grid-template-columns:1fr}.mock-qmap{position:static}.mock-home-hero h1{font-size:32px}.mock-top{flex-wrap:wrap}.mock-timer{margin-left:auto}}
      @media(max-width:600px){.mock-home,.mock-exam-wrap{padding:20px 12px 50px}.mock-question{padding:22px}.mock-question h2{font-size:20px}.mock-top{padding:12px}.mock-result{padding:28px}}
    `;
    document.head.appendChild(s);
  }

  function math(s){return s;}
  function renderMath(){ if(window.renderMathInElement) window.renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false}); }
  function key(i){return String.fromCharCode(65+i);}
  function timeText(v){const m=String(Math.floor(v/60)).padStart(2,'0'),s=String(v%60).padStart(2,'0');return `${m}:${s}`;}

  function home(){
    stopTimer(); state.key=null; state.index=0; state.answers=[]; state.remaining=2700; state.submitted=false;
    app.innerHTML=`<div class="mock-home"><section class="mock-home-hero"><span class="mock-badge">INTEGRATED SCIENCE · MOCK EXAM</span><h1>통합 과학 고난도 모의고사</h1><p>기하·화학·물리학 중 한 영역을 선택하여 45분 동안 20문제를 풀이합니다. 단순 암기보다 계산, 조건 해석, 비례 추론, 오류 분석, 복합 개념 연결을 중심으로 구성했습니다.</p></section><section class="mock-grid"><button class="mock-card geometry" onclick="window.mockStart('geometry')"><div class="mock-icon">◇</div><span class="mock-badge">20 QUESTIONS · 45 MIN</span><h2>기하</h2><p>이차곡선·접선·정사영·공간좌표를 연결한 고난도 문제.</p></button><button class="mock-card chemistry" onclick="window.mockStart('chemistry')"><div class="mock-icon">⚗</div><span class="mock-badge">20 QUESTIONS · 45 MIN</span><h2>화학</h2><p>기체 법칙·몰분율·삼투압·엔탈피·깁스 에너지·반응 속도.</p></button><button class="mock-card physics" onclick="window.mockStart('physics')"><div class="mock-icon">∿</div><span class="mock-badge">20 QUESTIONS · 45 MIN</span><h2>물리학</h2><p>힘·포물선 운동·원운동·케플러·중력·상대성을 복합 출제.</p></button></section></div>`;
    renderMath();
  }

  function start(k){
    const exam=EXAMS[k]; if(!exam || exam.questions.length!==20){alert('문제 데이터 오류가 있습니다.');return;}
    state.key=k; state.index=0; state.answers=new Array(20).fill(null); state.remaining=2700; state.submitted=false;
    stopTimer(); state.timer=setInterval(()=>{state.remaining--; updateTimer(); if(state.remaining<=0) submit(true);},1000); renderQuestion();
  }
  window.mockStart=start;
  function stopTimer(){if(state.timer){clearInterval(state.timer);state.timer=null;}}
  function updateTimer(){const el=document.getElementById('mockTimer');if(!el)return;el.textContent=timeText(Math.max(0,state.remaining));el.classList.toggle('warn',state.remaining<=300);}

  function renderQuestion(){
    const exam=EXAMS[state.key], q=exam.questions[state.index];
    app.innerHTML=`<div class="mock-exam-wrap"><div class="mock-top"><div class="mock-top-main"><small>${exam.title}</small><strong>고난도 유형 혼합</strong></div><div><div class="mock-badge">남은 시간</div><div class="mock-timer" id="mockTimer">${timeText(state.remaining)}</div></div><button class="mock-exit" onclick="window.mockExit()">시험 종료</button></div><div class="mock-shell"><aside class="mock-qmap"><h3>문제 번호</h3><div class="mock-qgrid">${exam.questions.map((_,i)=>`<button class="mock-q ${i===state.index?'current':''} ${state.answers[i]!==null?'done':''}" onclick="window.mockGoto(${i})">${i+1}</button>`).join('')}</div><div class="mock-note">진한색: 현재 문제<br>파란색: 답안 선택<br>45분 후 자동 제출</div></aside><main class="mock-question"><div class="mock-num">QUESTION ${String(state.index+1).padStart(2,'0')} / 20</div><span class="mock-type">${q[4]}</span><h2>${math(q[0])}</h2><div class="mock-choices">${q[1].map((c,i)=>`<label class="mock-choice ${state.answers[state.index]===i?'selected':''}" onclick="window.mockSelect(${i})"><input type="radio" name="mockchoice" ${state.answers[state.index]===i?'checked':''}><span class="mock-key">${key(i)}</span><span>${math(c)}</span></label>`).join('')}</div><div class="mock-actions"><button class="mock-btn outline" onclick="window.mockPrev()" ${state.index===0?'disabled':''}>← 이전</button>${state.index===19?'<button class="mock-btn primary" onclick="window.mockSubmit(false)">답안 제출</button>':'<button class="mock-btn primary" onclick="window.mockNext()">다음 문제 →</button>'}</div></main></div></div>`;
    updateTimer(); renderMath();
  }
  window.mockSelect=i=>{state.answers[state.index]=i; renderQuestion();};
  window.mockNext=()=>{if(state.index<19){state.index++;renderQuestion();}};
  window.mockPrev=()=>{if(state.index>0){state.index--;renderQuestion();}};
  window.mockGoto=i=>{state.index=i;renderQuestion();};
  window.mockExit=()=>{if(confirm('현재 시험을 종료하고 영역 선택 화면으로 돌아가겠습니까?'))home();};
  window.mockSubmit=auto=>{if(!auto && !confirm('답안을 제출하시겠습니까?'))return;submit(auto);};

  function submit(auto){
    if(state.submitted)return; state.submitted=true; stopTimer();
    const exam=EXAMS[state.key]; let score=0; for(let i=0;i<20;i++) if(state.answers[i]===exam.questions[i][2]) score++;
    const answered=state.answers.filter(v=>v!==null).length;
    app.innerHTML=`<div class="mock-exam-wrap"><section class="mock-result"><span class="mock-badge">${auto?'TIME LIMIT REACHED':'EXAM COMPLETE'}</span><h1>${exam.title}</h1><div class="mock-score"><strong>${score*5}</strong><span>점 / 100</span></div><p>20문제 중 ${score}문제 정답 · ${answered}문제 응답 · ${20-answered}문제 미응답</p><div class="mock-result-actions"><button class="mock-btn outline" onclick="window.mockHome()">다른 모의고사</button><button class="mock-btn primary" onclick="window.mockReview()">문제별 해설</button></div></section><div id="mockReviewMount"></div></div>`;
    window.__mockScore=score;
  }
  window.mockHome=home;
  window.mockReview=()=>{
    const exam=EXAMS[state.key], mount=document.getElementById('mockReviewMount'); if(!mount)return;
    mount.innerHTML=`<section class="mock-review"><div class="mock-review-head"><h2>정답 및 해설</h2><span>${window.__mockScore}/20</span></div>${exam.questions.map((q,i)=>{const ok=state.answers[i]===q[2], user=state.answers[i]===null?'미응답':key(state.answers[i]);return `<div class="mock-review-item"><strong>${i+1}. ${q[0]}</strong><div class="${ok?'correct-mark':'wrong-mark'}">${ok?'정답':'오답'} · 내 답 ${user} · 정답 ${key(q[2])}</div><small>${q[3]}</small></div>`}).join('')}</section>`;
    renderMath(); mount.scrollIntoView({behavior:'smooth'});
  };

  document.addEventListener('DOMContentLoaded',()=>{style();themeInit();home();});
})();
