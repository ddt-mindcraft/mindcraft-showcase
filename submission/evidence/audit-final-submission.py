from pathlib import Path,PurePosixPath
import zipfile,json,hashlib,re
B=Path.cwd();P=B/'submission-2026-09-09';errors=[]
f=json.loads((P/'fields/submission-fields.json').read_text(encoding='utf-8'));m=json.loads((P/'manifest.json').read_text(encoding='utf-8'))
assert f['media']==['gallery/01-thumbnail.webp','gallery/02-easy-start.png','gallery/03-workflow.png','gallery/04-continuity.png','gallery/05-models-pi.png']
assert f['media']==m['gallery'] and all((P/n).is_file() for n in f['media'])
assert f['executionUrl'].endswith('#product-film') and not f['description'].startswith('http') and len(f['instructions'])<500
assert f['title']=='MindCraft | AI 딸깍, 야근 싹뚝'
for a in m['artifacts']:
 p=P/a['file'];assert p.stat().st_size==a['bytes'] and hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
source=P/f['sourceZip'];findings=[]
with zipfile.ZipFile(source) as z:
 assert z.testzip() is None
 names=z.namelist();assert 'README.md' in names and 'src/core/service.ts' in names
 assert len([n for n in names if n.startswith('aidlc-docs/')])==147
 assert len([n for n in names if n.startswith('screenshots/') and n.endswith('.png')])==3
 forbidden={'node_modules','.git','__pycache__','.test-data','.cache','credentials.json','secrets.json','.env'}
 for n in names:
  assert not set(PurePosixPath(n).parts)&forbidden,n
  if PurePosixPath(n).suffix.lower() in {'.md','.ts','.mjs','.json','.txt','.yml','.yaml','.ps1','.cs','.toml'}:
   text=z.read(n).decode('utf-8',errors='replace')
   for label,pattern in [('private-key',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),('github-token',r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b'),('openai-token',r'\bsk-(?:proj-)?[A-Za-z0-9_-]{35,}\b')]:
    if re.search(pattern,text):findings.append({'file':n,'kind':label})
 for n in ['README.md','README-original.md','screenshots/README.md']:
  for link in re.findall(r'\]\(([^)]+)\)',z.read(n).decode('utf-8')):
   if ':' not in link and not link.startswith('#'):
    target=str(PurePosixPath(n).parent/link.split('#')[0])
    if target not in names:errors.append({'file':n,'missingLink':target})
assert not errors,errors
assert not findings,findings
# Do not rewrite frozen upstream evidence. Audit the current public copy separately.
for p in [P/'SUBMISSION.md',P/'README.md',B/'site/index.html',B/'site/details.html']:
 text=p.read_text(encoding='utf-8')
 for stale in ['코드 생성 진행 중','실제 모델 연결 및 전체 요구사항 검증은 진행 중','최신 화면과 동봉 EXE에는 UI 차이','이 페이지에서 다운로드는 제공하지 않습니다']:
  assert stale not in text,(str(p),stale)
summary={'status':'PASS','sourceZipIntegrity':True,'artifactHashesMatch':True,'fullFinalAidlcDocs':147,'rootScreenshots':3,'officialGalleryImages':len(f['media']),'demoExecutionLinkCorrect':True,'readmeLinksExist':True,'credentialPatternFindings':findings,'scope':'tracked source archive high-confidence token/private-key patterns and forbidden paths; not a full security certification','exeAuthenticode':'NotSigned','finalGuiSmoke':json.loads((P/'evidence/capture-report.json').read_text())['status']}
(P/'evidence/submission-audit.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False))

