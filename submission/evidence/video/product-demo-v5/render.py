from pathlib import Path
import subprocess,json,hashlib,math,sys
from PIL import Image,ImageDraw,ImageFont
import imageio_ffmpeg
B=Path(__file__).resolve().parent;ROOT=B.parent.parent;F=imageio_ffmpeg.get_ffmpeg_exe();FPS=30
BG='#faf6ed';INK='#251c3a';PURPLE='#7040d8';MUTED='#696273'
def font(n,b=False):return ImageFont.truetype('C:/Windows/Fonts/malgunbd.ttf' if b else 'C:/Windows/Fonts/malgun.ttf',n)
def text(d,xy,s,n=30,b=False,color=INK):d.multiline_text(xy,s,font=font(n,b),fill=color,spacing=12)
def run(args):subprocess.run([F,'-v','error','-y',*map(str,args)],check=True)
# All rectangles are measured in the exact 1440x900 source frame named by `at`.
# A target means one control or one reading area; no coordinates are reused after scrolling.
S=[
 dict(step=1,at=2.7,hold=2.4,motion=[2.7,6.8],title='샘플부터\n시작해요.',body='준비된 예시로\n작업 흐름을 익혀요.',action='샘플 체험을 눌러요.',tag='샘플 체험',rect=[370,807,915,80],crop=[0,0,1440,900],mobile=[350,650,970,250],mobile_motion=[0,0,1440,900]),
 dict(step=2,at=7.0,hold=2.4,title='쓸 자료를\n확인해요.',body='이번 작업에 참고할\n자료 세 개예요.',action='자료 이름과 내용을 확인해요.',tag='참고 자료 3개',rect=[1098,306,294,365],crop=[240,75,1190,815],mobile=[1050,260,385,490]),
 dict(step=2,at=10.6,hold=2.0,motion=[10.6,13.0],title='자료가 맞으면,\n진행해요.',body='확인한 자료로\n결과를 준비합니다.',action='「이 자료로 진행」을 눌러요.',tag='자료 사용 확인',rect=[1098,680,294,40],crop=[240,75,1190,815],mobile=[1060,520,375,275],mobile_motion=[240,75,1190,815]),
 dict(step=3,at=20.0,hold=2.5,motion=[20.0,24.4],title='완성된 결과를\n읽어보세요.',body='모집 안내와 실행 계획을\n아래로 내려 읽어요.',action='결과 내용을 확인해요.',tag='작성된 결과 문서',rect=[282,430,735,170],crop=[240,75,1190,815],mobile=[260,410,790,480]),
 dict(step=3,at=24.4,hold=2.5,title='참고 자료도\n함께 봐요.',body='결과 옆에서\n자료의 출처를 확인해요.',action='오른쪽 자료를 살펴봐요.',tag='결과에 참고한 자료',rect=[1098,189,294,365],crop=[240,75,1190,815],mobile=[1055,140,380,480]),
 dict(step=4,at=27.9,hold=2.0,motion=[27.9,29.35],title='결과를 파일로\n남겨요.',body='결과 위의 저장 버튼으로\n저장을 시작해요.',action='「파일로 저장」을 눌러요.',tag='저장 시작',rect=[939,244,100,34],crop=[240,75,1190,815],mobile=[670,215,390,240],mobile_motion=[300,320,825,400]),
 dict(step=4,at=29.35,hold=2.4,title='저장할 이름을\n확인해요.',body='파일 이름과 경로를\n입력하는 칸이에요.',action='이름과 경로를 확인해요.',tag='저장할 파일 경로',rect=[345,440,735,64],crop=[280,300,880,450],mobile=[325,360,790,270]),
 dict(step=4,at=31.0,hold=1.8,motion=[31.0,32.3],title='저장 전에\n내용을 봐요.',body='다음 화면에서\n변경 내용을 검토해요.',action='「확인 화면 열기」를 눌러요.',tag='저장 내용 미리 보기',rect=[950,533,125,42],crop=[280,300,880,450],mobile=[790,450,345,220],mobile_motion=[285,65,860,815]),
 dict(step=5,at=32.25,hold=3.0,title='경로와 내용을\n확인해요.',body='어디에 무엇을 저장할지\n먼저 확인합니다.',action='대상 경로와 변경 후 내용을 봐요.',tag='저장 대상과 변경 내용',rect=[356,250,716,430],crop=[285,65,860,815],mobile=[335,235,765,455]),
 dict(step=5,at=38.0,hold=1.8,motion=[38.0,39.6],title='동의하면\n저장해요.',body='확인한 내용에 동의할 때\n이번 저장을 허용해요.',action='「이번만 허용」을 눌러요.',tag='확인 후 저장 승인',rect=[950,759,125,42],crop=[285,65,860,815],mobile=[830,650,290,215],mobile_motion=[240,75,1190,815]),
 dict(step=6,at=40.2,hold=1.8,motion=[40.2,42.05],title='지난 작업은\n기록에서.',body='왼쪽 메뉴에서\n이전 작업을 찾을 수 있어요.',action='「작업 기록」을 눌러요.',tag='작업 기록 메뉴',rect=[20,237,185,42],crop=[0,0,1440,900],mobile=[0,145,280,220],mobile_motion=[240,75,1190,815]),
 dict(step=6,at=42.05,hold=2.2,motion=[44.3,47.5],title='저장한 결과를\n다시 열어요.',body='기록에 남은 결과를\n다음에도 확인해요.',action='「결과 열기」를 눌러요.',tag='이전 결과 다시 열기',rect=[1250,504,125,40],crop=[240,75,1190,815],mobile=[1015,385,395,225],mobile_motion=[240,75,1190,815]),
]
def normalize():
 p=B/'source-cfr.mkv'
 if not p.exists():run(['-i',B.parent/'product-demo-v1/raw-session.webm','-vf','fps=30,setpts=N/(30*TB)','-an','-c:v','ffv1',p])
 return p
def source_frame(t):
 p=B/f'source-{round(t*FPS):04}.png'
 if not p.exists():run(['-ss',round(t*FPS)/FPS,'-i',normalize(),'-frames:v','1',p])
 return Image.open(p).convert('RGB')
def placement(crop,mobile):
 box=(40,405,1000,690) if mobile else (490,155,1370,820)
 x,y,w,h=crop;bx,by,bw,bh=box;scale=min(bw/w,bh/h);sw,sh=round(w*scale),round(h*scale)
 return (bx+(bw-sw)//2,by+(bh-sh)//2,sw,sh)
def mapped(s,crop,mobile):
 ox,oy,sw,sh=placement(crop,mobile);cx,cy,cw,ch=crop;x,y,w,h=s['rect']
 return [ox+(x-cx)*sw/cw,oy+(y-cy)*sh/ch,ox+(x+w-cx)*sw/cw,oy+(y+h-cy)*sh/ch]
def compose(src,s,mobile=False,guide=True,moving=False):
 size=(1080,1440) if mobile else (1920,1080);im=Image.new('RGB',size,BG);d=ImageDraw.Draw(im)
 text(d,(45,35),'MindCraft',35 if mobile else 30,True)
 if mobile:
  text(d,(45,105),s['title'].replace('\n',' '),52,True)
  text(d,(48,194),s['body'].replace('\n',' '),37,color=MUTED)
  text(d,(48,282),f'{s["step"]}/6 · '+s['tag'],36,True,color=PURPLE)
  d.rounded_rectangle((40,1130,1040,1275),20,fill='#ece3f8');text(d,(67,1170),s['action'],40,True)
  text(d,(45,1338),('실제 조작 · 강조 해제' if moving else '잠시 멈춰 보는 사용 안내'),28,color=MUTED)
 else:
  text(d,(52,146),f'사용 안내  {s["step"]}/6',25,True,color=PURPLE)
  text(d,(50,233),s['title'],48,True);text(d,(53,400),s['body'],30,color=MUTED)
  d.rounded_rectangle((44,620,450,806),18,fill='#ece3f8');text(d,(67,646),'이렇게 해보세요',23,True,color=PURPLE)
  action=s['action'];split=action.find(' ',12)
  if len(action)>19 and split>0:action=action[:split]+'\n'+action[split+1:]
  text(d,(67,700),action,25,True)
  text(d,(490,98),s['tag'] if not moving else '실제 조작 · 화면 변화를 확인하세요',29,True,color=PURPLE if not moving else MUTED)
  text(d,(54,1020),'실제 앱 녹화 · 이전 개발 UI · 오프라인 샘플',22,color=MUTED)
 crop=s.get('mobile_motion',s['mobile']) if mobile and moving else s['mobile'] if mobile else s['crop']
 x,y,w,h=crop;ox,oy,sw,sh=placement(crop,mobile);im.paste(src.crop((x,y,x+w,y+h)).resize((sw,sh),Image.Resampling.LANCZOS),(ox,oy));d=ImageDraw.Draw(im)
 if guide:
  l,t,r,b=mapped(s,crop,mobile);d.rounded_rectangle((l-6,t-6,r+6,b+6),10,outline=PURPLE,width=5)
  rad=23 if mobile else 21;cx=max(25,l-14);cy=max(365 if mobile else 125,t-26);d.ellipse((cx-rad,cy-rad,cx+rad,cy+rad),fill=PURPLE);text(d,(cx-8,cy-17),str(s['step']),24,True,color='white')
 return im
def title_frame(mobile,end=False):
 im=Image.new('RGB',(1080,1440) if mobile else (1920,1080),BG);d=ImageDraw.Draw(im)
 text(d,(65,65),'MindCraft',48,True,color=PURPLE)
 text(d,(65,330 if mobile else 300),('확인하고 저장한 결과,\n다음에도 꺼내 보세요.' if end else '자료를 고르면,\n쓸 수 있는 결과로.'),65 if mobile else 78,True)
 text(d,(70,570 if mobile else 560),'샘플 시작 → 자료 → 결과 → 저장 → 기록',35,color=MUTED)
 text(d,(70,1230 if mobile else 940),'실제 앱 녹화 · 이전 개발 UI · 오프라인 샘플',27,color=MUTED)
 return im
def encoder(dest,size):
 return subprocess.Popen([F,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{size[0]}x{size[1]}','-r','30','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],stdin=subprocess.PIPE)
def motion_frames(a,z):
 start,end=round(a*FPS),round(z*FPS);count=end-start
 p=subprocess.Popen([F,'-v','error','-ss',str(start/FPS),'-i',str(normalize()),'-frames:v',str(count),'-f','rawvideo','-pix_fmt','rgb24','pipe:1'],stdout=subprocess.PIPE)
 for i in range(count):
  raw=p.stdout.read(1440*900*3)
  if len(raw)!=1440*900*3:raise RuntimeError('Missing source frame')
  yield Image.frombytes('RGB',(1440,900),raw)
 p.stdout.close();assert p.wait()==0
def main():
 normalize();shots=[];cursor=45
 for k,s in enumerate(S):
  s['freezeFrames']=round(s['hold']*FPS);s['motionFrames']=round(s['motion'][1]*FPS)-round(s['motion'][0]*FPS) if 'motion' in s else 0
  src=source_frame(s['at'])
  for mobile in [False,True]:compose(src,s,mobile).save(B/f'storyboard-{k:02}{"-mobile" if mobile else ""}.png')
  shots.append(s|{'startFrame':cursor,'highlightEndFrame':cursor+s['freezeFrames']-4,'freezeEndFrame':cursor+s['freezeFrames'],'endFrame':cursor+s['freezeFrames']+s['motionFrames'],'sourceFrame':round(s['at']*FPS),'landscapeApp':placement(s['crop'],False),'landscapeTarget':mapped(s,s['crop'],False),'portraitApp':placement(s['mobile'],True),'portraitTarget':mapped(s,s['mobile'],True)})
  cursor+=s['freezeFrames']+s['motionFrames']
 manifest={'fps':FPS,'frames':cursor+45,'duration':(cursor+45)/FPS,'shots':shots,'source':'product-demo-v1/raw-session.webm','sourceScope':'Earlier development GUI, offline sample; not final r3 EXE','method':'Explicit frozen frames then undecorated CFR motion. No tpad, no image overlay repeat, no crossfade.','sourceSha256':hashlib.sha256((B.parent/'product-demo-v1/raw-session.webm').read_bytes()).hexdigest()}
 (B/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 if '--storyboard' in sys.argv:print('Storyboard ready',manifest['duration']);return
 procs=[encoder(B/'product-demo-v5.mp4',(1920,1080)),encoder(B/'product-demo-v5-mobile.mp4',(1080,1440))]
 def write(pair):
  for p,im in zip(procs,pair):p.stdin.write(im.tobytes())
 try:
  titles=[title_frame(False),title_frame(True)]
  for _ in range(45):write(titles)
  for k,s in enumerate(S):
   src=source_frame(s['at']);guided=[compose(src,s,False),compose(src,s,True)];plain=[compose(src,s,False,False),compose(src,s,True,False)]
   for f in range(s['freezeFrames']):write(guided if f<s['freezeFrames']-4 else plain)
   if 'motion' in s:
    for src in motion_frames(*s['motion']):write([compose(src,s,False,False,True),compose(src,s,True,False,True)])
   print('Rendered',k,s['tag'],flush=True)
  titles=[title_frame(False,True),title_frame(True,True)]
  for _ in range(45):write(titles)
 finally:
  for p in procs:p.stdin.close()
  for p in procs:assert p.wait()==0
 print('DONE',manifest['duration'],flush=True)
if __name__=='__main__':main()
