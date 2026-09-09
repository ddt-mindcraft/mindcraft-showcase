const features=[
{kicker:'01 / 쉬운 시작',title:'에이전트를 몰라도,<br>내 일은 아니까.',description:'실행 파일을 열고, 안내에 따라 모델과 자료를 연결합니다. 무엇부터 할지 모르겠다면 샘플 작업부터 해보세요.',detail:'하네스는 AI가 일을 수행하는 데 필요한 도구와 절차입니다. MindCraft는 이를 한 프로그램에 담아 직접 구성하는 부담을 줄입니다. 실제 AI를 연결하려면 선택한 서비스의 계정이나 인증 정보가 필요할 수 있습니다.'},
{kicker:'02 / 작업 워크플로우',title:'자료에서 결과까지,<br>확인하며 한 흐름으로.',description:'자료 확인 → 문서 작성 → 저장 승인 → 기록. 요청과 결과를 확인할 수 있는 작업 흐름을 연결합니다.',detail:'이번 요청에 사용할 자료를 직접 확인하고, 작성된 결과를 읽은 뒤 파일 저장을 승인합니다. 선택한 자료·결과·실행 기록이 연결되어 어떤 작업을 했는지 다시 확인할 수 있습니다. <a href="#demo">실제 작업 화면으로 확인하기 ↗</a>'},
{kicker:'03 / 지식 시스템',title:'어제의 작업을,<br>오늘의 출발점으로.',description:'지난 작업의 결과와 출처를 남깁니다. 다시 쓸 자료를 골라 다음 작업에 활용합니다.',detail:'작업 재개는 멈춘 작업을 이어가는 기능, 지식 재사용은 이전 결과를 새 작업에 활용하는 기능입니다. 결과의 내용과 출처를 확인해 사용 가능으로 선택한 자료만 후속 요청에 활용합니다. 내가 선택한 자료를 기준으로 다음 작업의 맥락을 구성합니다. <a href="#knowledge-proof">새 요청에 활용하는 실제 화면 ↗</a>'},
{kicker:'04 / 모델 역할 분담',title:'깊이 생각할 때와,<br>가볍게 처리할 때를 나눠서.',description:'일반 작업과 복잡한 계획에 모델을 나눠 지정합니다. 필요한 곳에 고성능·저비용 모델을 선택해 비용과 성능의 균형을 추구합니다.',detail:'사용자가 지정한 모델을 Planner(계획·복잡한 분석)와 Worker(일반 작업)에 배정하는 방식입니다. 모델 하나를 두 용도로 함께 쓸 수도 있습니다. 작업 용도에 따라 사용할 역할을 선택하고, 지정한 연결과 모델로 작업합니다. 고성능·저비용 모델을 필요한 역할에 배정하는 구조입니다.'},
{kicker:'05 / PI 오픈소스 기반',title:'가벼운 기반 위에,<br>내 일을 위한 하네스.',description:'Pi 에이전트의 실행 기반을 활용하고, 시작 안내·작업 절차·지식 시스템을 더합니다. 문서 작업에 필요한 기능을 하나의 실행 환경으로 연결합니다.',detail:'Pi는 에이전트 실행 루프·모델 연결·터미널 인터페이스를 제공하는 오픈소스입니다. MindCraft는 그 위에 제품의 작업·권한·지식 흐름을 구성합니다. GUI·CLI·TUI가 공통 실행 엔진과 작업 기록을 사용합니다. <a href="https://github.com/earendil-works/pi">Pi 공식 저장소 ↗</a>'}
];
const $=s=>document.querySelector(s),tabs=[...document.querySelectorAll('[data-feature]')];let current=0,onboard=0,workflow=0,dual=true;
function selectFeature(n,focus=false){current=Math.max(0,Math.min(4,n));tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===current));b.tabIndex=i===current?0:-1;});const f=features[current];$('#panel-kicker').textContent=f.kicker;$('#panel-title').innerHTML=f.title;$('#panel-description').textContent=f.description;$('#panel-detail').innerHTML=f.detail;$('#deep-detail').open=false;$('#position').textContent=`${current+1} / 5`;$('#prev-feature').disabled=current===0;$('#next-feature').disabled=current===4;$('#feature-panel').setAttribute('aria-labelledby',`tab-${current}`);draw();if(focus)tabs[current].focus();}
const onboarding=[['▦','MindCraft.exe','필요한 작업 도구를 한 번에','1. 실행 파일 열기','실행 파일에 런타임과 필수 도구를 담았습니다.'],['⇄','모델 연결 안내','일반 작업 · 복잡한 계획','2. 안내에 따라 준비','서비스와 모델을 선택하고 연결을 확인합니다.'],['>','내 말로 요청','내 자료로 첫 작업','3. 원하는 일 말하기','“이 자료로 이번 주 보고서를 만들어줘.”']];
const flow=[['자료 확인','이번 요청에 쓸 자료 선택','자료의 내용과 출처를 확인하고 이번 작업에 포함할 자료를 고릅니다.'],['문서 작성','자료를 바탕으로 결과 작성','요청에 따라 작성된 문서를 읽고 참고한 자료를 함께 확인합니다.'],['저장 승인','경로와 변경 내용을 확인','저장할 파일과 내용을 확인한 뒤 이번 저장을 승인합니다.'],['기록','지난 작업을 다시 확인','요청·자료·결과를 다시 열고, 재사용할 결과는 자료함에 보관합니다.']];
function draw(){const root=$('#interactive');
 if(current===0){const s=onboarding[onboard];root.innerHTML=`<div class="file-tile"><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div><p class="scene-title">${s[3]}</p><p>${s[4]}</p><button class="scene-button" id="onboard-next">${onboard===2?'처음부터 보기 ↺':'다음 안내 →'}</button>`;}
 if(current===1){const f=flow[workflow];root.innerHTML=`<div class="mini-steps">${flow.map((x,i)=>`<button data-workflow="${i}" aria-pressed="${i===workflow}">${x[0]}</button>`).join('')}</div><div class="scene-result"><strong>${f[1]}</strong><p>${f[2]}</p></div><p>내가 고른 자료 → 확인한 결과 → 다음 작업</p><a class="scene-button" href="#demo">실제 작업 화면 보기 ↗</a>`;}
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
// The hero animation starts silently; the product demo starts on request.
video.autoplay=!motion.matches;
if(motion.matches)video.pause();else video.play().catch(()=>{});
motion.addEventListener('change',e=>{if(e.matches)video.pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
video.addEventListener('error',()=>{$('#video-fallback').hidden=false;});

const productVideo=$('#product-video');
productVideo.addEventListener('error',()=>{$('#product-fallback').hidden=false;});
productVideo.addEventListener('play',()=>video.pause());
video.addEventListener('play',()=>productVideo.pause());
document.addEventListener('visibilitychange',()=>{if(document.hidden)productVideo.pause();});

document.querySelectorAll("[data-overview]").forEach(a=>a.addEventListener("click",()=>selectFeature(Number(a.dataset.overview))));

// Responsive guided demo v5: the two cuts share the same frame timeline.
(()=>{
 const video=document.querySelector('#product-video[data-mobile-src]');if(!video)return;
 const narrow=matchMedia('(max-width: 700px)');let generation=0;
 const select=()=>{
  const portrait=narrow.matches;const src=portrait?video.dataset.mobileSrc:video.dataset.desktopSrc;
  video.dataset.layout=portrait?'portrait':'landscape';video.poster=portrait?video.dataset.mobilePoster:video.dataset.desktopPoster;
  if(video.getAttribute('src')===src)return;
  const time=video.currentTime||0,playing=!video.paused,token=++generation;
  video.addEventListener('loadedmetadata',()=>{if(token!==generation)return;video.currentTime=Math.min(time,Math.max(0,video.duration-.05));if(playing)video.play().catch(()=>{});},{once:true});
  video.src=src;video.load();
 };
 narrow.addEventListener('change',select);select();
})();
