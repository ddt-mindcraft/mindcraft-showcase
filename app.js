const features=[
{kicker:'01 / 쉬운 시작',title:'에이전트를 몰라도,<br>내 일은 아니까.',description:'실행 파일을 열고, 안내에 따라 모델과 자료를 연결합니다. 무엇부터 할지 모르겠다면 샘플 작업부터 해보세요.',detail:'하네스는 AI가 일을 수행하는 데 필요한 도구와 절차입니다. MindCraft는 이를 한 프로그램에 담아 직접 구성하는 부담을 줄입니다. 실제 AI를 연결하려면 선택한 서비스의 계정이나 인증 정보가 필요할 수 있습니다.'},
{kicker:'02 / 작업 워크플로우',title:'만드는 데서 끝내지 않고,<br>요청대로 됐는지 확인.',description:'설계 → 리뷰 → 실행 → 테스트. 빠진 조건을 보완하고, 결과가 요청을 충족하는지 확인하는 절차를 연결합니다.',detail:'사용자가 요청한 작업에 적용하는 하네스입니다. 코드·자료·문서에 맞는 검사를 연결하고 문제를 보완합니다. 검사는 확인한 조건 안에서 근거를 제공하며, 확인하지 못한 내용은 별도로 남깁니다. <a href="./details.html#story">조건을 바꾸며 계산·검사 체험하기 ↗</a>'},
{kicker:'03 / 지식 시스템',title:'어제의 작업을,<br>오늘의 출발점으로.',description:'지난 작업의 결과와 출처를 남깁니다. 다시 쓸 자료를 골라 다음 작업에 활용합니다.',detail:'작업 재개는 멈춘 작업을 이어가는 기능, 지식 재사용은 이전 결과를 새 작업에 활용하는 기능입니다. 결과의 내용과 출처를 확인해 사용 가능으로 선택한 자료만 후속 요청에 활용합니다. 후보를 자동으로 모두 기억·사용하지 않습니다.'},
{kicker:'04 / 모델 역할 분담',title:'깊이 생각할 때와,<br>가볍게 처리할 때를 나눠서.',description:'복잡한 계획에는 고성능 모델, 일반 작업에는 저비용 모델. 필요한 단계에 배정해 비용과 성능의 균형을 추구합니다.',detail:'사용자가 지정한 모델을 Planner(계획·복잡한 분석)와 Worker(일반 작업)에 배정하는 방식입니다. 모델 하나를 두 용도로 함께 쓸 수도 있습니다. 아래는 역할 배정 예시이며, 사용 중 임의 모델로 교체하지 않습니다. 절감률·응답 속도는 아직 측정하지 않았습니다.'},
{kicker:'05 / PI 오픈소스 기반',title:'가벼운 기반 위에,<br>내 일을 위한 하네스.',description:'Pi 에이전트의 실행 기반을 활용하고, 시작 안내·작업 절차·지식 시스템을 더합니다. 빠르고 안정적인 동작을 지향합니다.',detail:'Pi는 에이전트 실행 루프·모델 연결·터미널 인터페이스를 제공하는 오픈소스입니다. MindCraft는 그 위에 제품의 작업·권한·지식 흐름을 구성합니다. Pi 사용만으로 성능이나 안정성이 보장되는 것은 아니며, 제품 수준의 검증은 별도로 진행합니다. <a href="https://github.com/earendil-works/pi">Pi 공식 저장소 ↗</a>'}
];
const $=s=>document.querySelector(s),tabs=[...document.querySelectorAll('[data-feature]')];let current=0,onboard=0,workflow=0,dual=true;
function selectFeature(n,focus=false){current=Math.max(0,Math.min(4,n));tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===current));b.tabIndex=i===current?0:-1;});const f=features[current];$('#panel-kicker').textContent=f.kicker;$('#panel-title').innerHTML=f.title;$('#panel-description').textContent=f.description;$('#panel-detail').innerHTML=f.detail;$('#deep-detail').open=false;$('#position').textContent=`${current+1} / 5`;$('#prev-feature').disabled=current===0;$('#next-feature').disabled=current===4;$('#feature-panel').setAttribute('aria-labelledby',`tab-${current}`);draw();if(focus)tabs[current].focus();}
const onboarding=[['▦','MindCraft.exe','필요한 작업 도구를 한 번에','1. 실행 파일 열기','별도 개발 도구 설치 없이 시작하는 것이 목표입니다.'],['⇄','모델 연결 안내','일반 작업 · 복잡한 계획','2. 안내에 따라 준비','서비스와 모델을 선택하고 연결을 확인합니다.'],['>','내 말로 요청','내 자료로 첫 작업','3. 원하는 일 말하기','“이 자료로 이번 주 보고서를 만들어줘.”']];
const flow=[['설계','요청을 작업 계획으로','취소와 중복을 제외하는 집계 기준을 정합니다.'],['리뷰','빠진 조건은 없는지','실행 전에 요청과 계획을 대조해 보완합니다.'],['실행','허용한 작업 수행','대상과 내용을 확인한 뒤 파일 생성을 승인합니다.'],['테스트','결과를 조건과 대조','취소·중복 제외, 합계 등 확인한 조건을 보여줍니다.']];
function draw(){const root=$('#interactive');
 if(current===0){const s=onboarding[onboard];root.innerHTML=`<div class="file-tile"><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div><p class="scene-title">${s[3]}</p><p>${s[4]}</p><button class="scene-button" id="onboard-next">${onboard===2?'처음부터 보기 ↺':'다음 안내 →'}</button>`;}
 if(current===1){const f=flow[workflow];root.innerHTML=`<div class="mini-steps">${flow.map((x,i)=>`<button data-workflow="${i}" aria-pressed="${i===workflow}">${x[0]}</button>`).join('')}</div><div class="scene-result"><strong>${f[1]}</strong><p>${f[2]}</p></div><p>문제 발견 → 계획·결과 보완 → 다시 확인</p><a class="scene-button" href="./details.html#story">직접 계산·검사해보기 ↗</a>`;}
 if(current===2)root.innerHTML='<div class="knowledge"><label><input id="use-knowledge" type="checkbox"> 지난 작업의 보고서 작성 기준<br><small>출처: 지난 작업 결과 · 예시 자료</small></label></div><div class="scene-result"><strong>새 요청: 이번 주 보고서도 만들어줘.</strong><p id="knowledge-result" aria-live="polite">아직 선택하지 않았습니다. 이전 기준은 포함하지 않습니다.</p></div><p>내용과 출처를 보고, 다시 쓸 자료만 선택하세요.</p>';
 if(current===3)root.innerHTML=`<div class="mini-steps"><button id="single-model" aria-pressed="${!dual}">모델 하나로</button><button id="dual-model" aria-pressed="${dual}">역할을 나눠서</button></div><div class="model-row"><span>복잡한 계획·분석</span><b>${dual?'고성능 모델':'선택한 모델 A'}</b></div><div class="model-row"><span>일반 작업 처리</span><b>${dual?'저비용 모델':'선택한 모델 A'}</b></div><p>${dual?'복잡한 계획과 일반 작업에 서로 다른 모델을 씁니다.':'같은 모델로 계획과 일반 작업을 처리합니다.'}</p><p>역할 배정 예시 · 실제 요금·성능 비교 아님</p>`;
 if(current===4)root.innerHTML='<div class="pi-stack"><div>MindCraft<span>시작 안내 · 작업 절차 · 자료 재사용</span></div><div>Pi 에이전트 기반<span>에이전트 실행 · 모델 연결 · 터미널 인터페이스</span></div></div><p>Pi의 실행 기반에 내 일을 위한 도구와 절차를 더합니다.</p><a class="scene-button" href="https://github.com/earendil-works/pi">Pi 알아보기 ↗</a>';
}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectFeature(i));b.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%5;else if(e.key==='ArrowLeft')n=(i+4)%5;else if(e.key==='Home')n=0;else if(e.key==='End')n=4;else return;e.preventDefault();selectFeature(n,true);});});
$('#prev-feature').addEventListener('click',()=>selectFeature(current-1));$('#next-feature').addEventListener('click',()=>selectFeature(current+1));
$('#interactive').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='onboard-next'){onboard=(onboard+1)%3;draw();}if(b.dataset.workflow!==undefined){workflow=Number(b.dataset.workflow);draw();}if(b.id==='single-model'||b.id==='dual-model'){dual=b.id==='dual-model';draw();}});
$('#interactive').addEventListener('change',e=>{if(e.target.id==='use-knowledge')$('#knowledge-result').textContent=e.target.checked?'선택한 작성 기준을 이번 요청의 자료로 포함합니다.':'선택을 해제했습니다. 이전 기준은 포함하지 않습니다.';});
const video=$('#concept-video');
video.muted=true;
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
// Both videos start only when the viewer presses play.
motion.addEventListener('change',e=>{if(e.matches)video.pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
video.addEventListener('error',()=>{$('#video-fallback').hidden=false;});

const productVideo=$('#product-video');
productVideo.addEventListener('error',()=>{$('#product-fallback').hidden=false;});
productVideo.addEventListener('play',()=>video.pause());
video.addEventListener('play',()=>productVideo.pause());
document.addEventListener('visibilitychange',()=>{if(document.hidden)productVideo.pause();});
