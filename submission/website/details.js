const orders = [
  {id:'A-01', amount:10000, status:'완료'},
  {id:'A-01', amount:10000, status:'완료'},
  {id:'A-02', amount:25000, status:'완료'},
  {id:'A-03', amount:7000, status:'취소'}
];
const scenes = [
  ['자연어로 시작','원하는 결과를<br>내 말로 요청해요.','파일을 어디서 읽고 어떤 코드를 실행할지 몰라도, 무엇이 필요한지부터 설명합니다.','쉬운 시작은 작업의 목적을 분명히 하는 데서 출발합니다.','이번 작업의 입력'],
  ['작업 설계','어떻게 만들지,<br>순서를 세워요.','자료 읽기 → 집계 → 결과 저장. 그런데 이 초안에는 중요한 조건이 빠져 있습니다.','계획이 있다는 것과, 계획이 요청을 충족한다는 것은 다릅니다.','검토 전 설계 초안'],
  ['설계 리뷰','리뷰에서 발견한<br>빈틈을 채워요.','취소와 중복을 제외하라는 요청이 설계에 반영됐는지 확인합니다. 두 조건을 직접 켜고 합계를 비교해보세요.','왜 고쳤는지 알 수 있게, 요청과 수정 사항을 연결합니다.','조건을 적용해 비교하기'],
  ['실행 테스트','실제로 계산하고,<br>조건을 검사해요.','이 웹 예시가 선택한 조건으로 계산한 뒤, 기대 합계와 중복·취소 제외 여부를 검사합니다.','실패하면 리뷰 단계로 돌아가 조건을 보완할 수 있습니다.','웹 예시의 검사 결과'],
  ['결과와 근거','무엇을 만들었고,<br>무엇을 확인했는지.','결과와 검사 범위를 함께 읽습니다. 파일이 만들어졌다는 사실만으로 작업 전체를 통과 처리하지 않습니다.','확인한 범위와 확인하지 못한 범위를 구분합니다.','결과 전달 예시'],
  ['다음 작업으로','확인한 결과를,<br>다음 일에 이어서.','결과와 출처를 확인해 재사용 대상으로 선택합니다. 다음 요청에서는 관련된 이전 결과를 활용합니다.','중단한 작업을 재개하는 것과, 결과를 새 요청에 활용하는 것은 다릅니다.','다음 요청 예시']
];
const tabs=[...document.querySelectorAll('[data-flow]')];
let current=0, excludeCancelled=false, deduplicate=false;
const money=n=>n.toLocaleString('ko-KR');
function calculate(){
  const seen=new Set();
  const rows=orders.filter(row=>{
    if(excludeCancelled&&row.status==='취소')return false;
    if(deduplicate&&seen.has(row.id))return false;
    seen.add(row.id);return true;
  });
  return {rows,total:rows.reduce((sum,row)=>sum+row.amount,0)};
}
function checks(result){return [
  ['기대 합계 35,000원',result.total===35000],
  ['취소 주문 제외',result.rows.every(row=>row.status!=='취소')],
  ['주문 번호 중복 없음',new Set(result.rows.map(row=>row.id)).size===result.rows.length]
];}
function renderEvidence(){
  const result=calculate(), tests=checks(result), passed=tests.every(([,ok])=>ok);
  let content='';
  if(current===0)content='<p class="evidence-explain">요청에는 <strong>취소 제외</strong>와 <strong>중복 제외</strong>라는 조건이 있습니다.</p>';
  if(current===1)content='<ol class="plan-list"><li>주문 자료 읽기</li><li>모든 금액 더하기 <span class="finding">조건 누락</span></li><li>매출 집계 파일 만들기</li></ol><p class="evidence-explain">리뷰할 질문: 취소와 중복을 언제 제외하나요?</p>';
  if(current===2)content=`<fieldset class="review-options"><legend>리뷰 지적을 설계에 반영해보세요</legend><label><input id="exclude" type="checkbox" ${excludeCancelled?'checked':''}> 취소된 주문은 제외하기</label><label><input id="dedup" type="checkbox" ${deduplicate?'checked':''}> 같은 주문 번호는 한 번만 집계하기</label></fieldset><p class="evidence-explain">조건을 바꾸면 아래 합계가 즉시 달라집니다.</p>`;
  if(current===3||current===4)content=`<div class="test-summary ${passed?'pass':'fail'}">${passed?'3개 조건 모두 충족':'보완할 조건이 남아 있습니다'}</div><ul class="test-list">${tests.map(([label,ok])=>`<li><span class="${ok?'pass-text':'fail-text'}">${ok?'통과':'미충족'}</span>${label}</li>`).join('')}</ul><p class="evidence-explain">검사 범위: 이 페이지의 합성 데이터 4행과 위 3개 조건. 실제 모델 실행·파일 저장 테스트는 포함하지 않습니다.</p>${!passed?'<button class="review-back" id="review-back">리뷰로 돌아가 보완하기 ↗</button>':''}`;
  if(current===5)content='<div class="reuse-example"><span>선택해 남길 결과</span><strong>매출 집계 결과 + 입력 출처</strong><span>다음 요청</span><p>“이 집계를 바탕으로 주간 보고 초안을 만들어줘.”</p></div><p class="evidence-explain">실제 제품에서는 사용자가 재사용할 결과를 선택합니다. 여기서는 재사용 흐름만 설명합니다.</p>';
  document.querySelector('#evidence-content').innerHTML=content;
  const shown=current<2?52000:result.total;
  document.querySelector('#total-value').innerHTML=money(shown)+'<span>원</span>';
  document.querySelector('#total-label').textContent=current<2?'모든 행을 단순 합산하면':'선택한 조건으로 계산한 합계';
  document.querySelector('#total-note').textContent=current<2?'파일을 만들었다는 사실만으로 집계가 맞는 것은 아닙니다.':passed?'취소 7,000원과 중복 10,000원을 제외한 결과입니다.':'요청한 조건과 다른 결과입니다. 리뷰에서 조건을 반영해보세요.';
  document.querySelector('#exclude')?.addEventListener('change',e=>{excludeCancelled=e.target.checked;updateTotal();});
  document.querySelector('#dedup')?.addEventListener('change',e=>{deduplicate=e.target.checked;updateTotal();});
  document.querySelector('#review-back')?.addEventListener('click',()=>show(2,true));
}
function updateTotal(){const result=calculate();document.querySelector('#total-value').innerHTML=money(result.total)+'<span>원</span>';document.querySelector('#total-note').textContent=checks(result).every(([,ok])=>ok)?'취소 7,000원과 중복 10,000원을 제외한 결과입니다.':'아직 요청 조건을 모두 반영하지 않았습니다.';}
function show(index,focus=false){
  current=Math.max(0,Math.min(5,index));const scene=scenes[current];
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===current));tab.tabIndex=i===current?0:-1;});
  document.querySelector('#flow-panel').setAttribute('aria-labelledby','flow-'+current);
  document.querySelector('#flow-kicker').textContent='0'+(current+1)+' / '+scene[0];
  document.querySelector('#flow-title').innerHTML=scene[1];
  document.querySelector('#flow-description').textContent=scene[2];
  document.querySelector('#flow-purpose').textContent=scene[3];
  document.querySelector('#evidence-title').textContent=scene[4];
  document.querySelector('#flow-position').textContent=(current+1)+' / 6';
  document.querySelector('#flow-prev').disabled=current===0;
  document.querySelector('#flow-next').textContent=current===5?'처음부터 ↺':tabs[current+1].querySelector('span').textContent+' 보기 →';
  renderEvidence();if(focus)tabs[current].focus();
}
for(const [i,tab] of tabs.entries()){
  tab.addEventListener('click',()=>show(i));
  tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(i+1)%6;if(event.key==='ArrowLeft')target=(i+5)%6;if(event.key==='Home')target=0;if(event.key==='End')target=5;if(target!==undefined){event.preventDefault();show(target,true);}});
}
document.querySelector('#flow-prev').addEventListener('click',()=>show(current-1));
document.querySelector('#flow-next').addEventListener('click',()=>show(current===5?0:current+1));
show(0);
