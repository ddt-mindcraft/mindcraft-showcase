from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import subprocess,json,sys,math
import imageio_ffmpeg
B=Path(__file__).resolve().parent;V1=B.parent/'product-demo-v1';F=imageio_ffmpeg.get_ffmpeg_exe();W,H=1920,1080
BG='#faf6ed';INK='#251c3a';PURPLE='#7040d8';MUTED='#696273'
def font(n,b=False):return ImageFont.truetype('C:/Windows/Fonts/malgunbd.ttf' if b else 'C:/Windows/Fonts/malgun.ttf',n)
def txt(d,xy,s,n=30,c=INK,b=False):d.multiline_text(xy,s,font=font(n,b),fill=c,spacing=13)
def run(args):subprocess.run([F,'-hide_banner','-loglevel','error','-y',*map(str,args)],check=True)
def encode(name,frames):
 p=subprocess.Popen([F,'-hide_banner','-loglevel','error','-y','-f','rawvideo','-pixel_format','rgb24','-video_size','1920x1080','-framerate','30','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p',B/name],stdin=subprocess.PIPE)
 for im in frames:p.stdin.write(im.convert('RGB').tobytes())
 p.stdin.close();assert p.wait()==0
def intro(end=False):
 mascot=Image.open(V1/'mascot.png').convert('RGBA');mascot.thumbnail((410,615))
 for i in range(90):
  im=Image.new('RGBA',(W,H),BG);d=ImageDraw.Draw(im)
  txt(d,(100,52),'MindCraft · 처음 만나는 나의 작업실',30,b=True)
  txt(d,(140,240),'자료를 고르면,\n쓸 수 있는 결과로.' if not end else '확인하고 저장한 결과,\n다음에도 꺼내 보세요.',64,b=True)
  txt(d,(145,462),'북클럽 첫 모임 준비로 함께 살펴볼게요.' if not end else '처음은 쉽게, 다음 일은 이어서.',32,c=MUTED)
  for j,label in enumerate(['자료 확인','결과 읽기','저장 승인','기록 열기']):
   x=145+j*255;d.rounded_rectangle((x,625,x+225,709),18,fill='#ede5f8');txt(d,(x+25,646),label,28,c=PURPLE,b=True)
  im.alpha_composite(mascot,(1350,260));d=ImageDraw.Draw(im)
  txt(d,(145,943),'실제 앱으로 보는 사용 흐름',24,c=MUTED)
  txt(d,(1385,943),'캐릭터 일러스트',22,c=MUTED)
  yield im
# Rectangles are measured on the original 1440×900 recording; they are editorial overlays.
S=[
 dict(n=1,a=2.7,z=6.3,hold=2.4,title='처음이라면,\n샘플부터.',body='직접 입력하기 전에\n준비된 예시로\n작업 흐름을 익혀요.',action='아래의 샘플 체험을 눌러요.',tag='샘플로 첫 작업 시작',rect=(370,807,915,80),crop=(240,75,1190,815)),
 dict(n=2,a=7.0,z=13.0,hold=1.4,title='어떤 자료를\n쓸지 골라요.',body='오른쪽은 이번 작업에\n참고할 자료예요.\n선택한 내용을 확인해요.',action='확인 후 「이 자료로 진행」',tag='자료 선택 → 진행',rect=(1085,275,320,450),crop=(240,75,1190,815)),
 dict(n=3,a=20.0,z=24.4,hold=2.1,title='결과 문서를\n읽어보세요.',body='가운데가 작업 결과예요.\n모집 안내 초안과\n실행 계획을 읽을 수 있어요.',action='내용을 읽으며 아래로 이동해요.',tag='만들어진 결과 문서',rect=(270,438,765,440),crop=(240,75,1190,815)),
 dict(n=3,a=24.4,z=28.1,hold=1.1,title='자료와 결과를\n함께 확인해요.',body='문서를 읽는 동안에도\n오른쪽에서 참고한 자료를\n확인할 수 있어요.',action='결과가 필요한 내용인지 살펴봐요.',tag='참고 자료도 함께 확인',rect=(1085,275,320,402),crop=(240,75,1190,815)),
 dict(n=4,a=29.35,z=31.7,hold=2.6,title='파일로\n남기고 싶다면.',body='「파일로 저장」을 누르고\n저장할 파일 이름을\n입력해요.',action='이름을 확인하고 다음으로 가요.',tag='저장할 파일 이름',rect=(345,440,735,64),crop=(240,75,1190,815)),
 dict(n=5,a=32.25,z=39.55,hold=1,title='저장 전에\n한 번 더 확인.',body='저장 경로와 바뀔 내용을\n먼저 확인해요.\n동의할 때만 허용해요.',action='확인했다면 「이번만 허용」',tag='변경 내용 확인 → 승인',rect=(347,150,735,655),crop=(285,65,860,815)),
 dict(n=6,a=42.05,z=47.65,hold=2,guide_until=4.8,title='지난 결과를\n다시 열어요.',body='「작업 기록」에서\n이전 작업을 찾고\n결과를 다시 볼 수 있어요.',action='「결과 열기」를 누르면 돌아가요.',tag='작업 기록에서 결과 열기',rect=(620,371,762,197),crop=(240,75,1190,815)),
]
def layout(s,guide=False):
 im=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(im)
 d.rectangle((0,0,550,H),fill=BG);d.rectangle((0,0,W,87),fill=BG);d.rectangle((0,1010,W,H),fill=BG)
 txt(d,(65,28),'MindCraft',29,b=True);txt(d,(1220,33),'실제 앱 · 단계별 사용 안내',22,c=MUTED)
 txt(d,(68,135),f'처음 사용하는 분을 위한 안내  {s["n"]}/6',21,c=PURPLE,b=True)
 txt(d,(66,216),s['title'],47,b=True)
 txt(d,(69,390),s['body'],29,c=MUTED)
 d.rounded_rectangle((65,620,515,778),18,fill='#ece3f8')
 txt(d,(85,642),'이렇게 해보세요',23,c=PURPLE,b=True)
 # Two lines max, tailored to fit the guide panel.
 action=s['action'];split=action.find(' ',14)
 if len(action)>21 and split>0:action=action[:split]+'\n'+action[split+1:]
 txt(d,(85,686),action,23,b=True)
 for j,label in enumerate(['시작','자료','결과','저장','승인','기록']):
  x=68+j*75;d.ellipse((x,865,x+38,903),fill=PURPLE if j+1==s['n'] else '#ddd4e7');txt(d,(x+12,870),str(j+1),19,c='white',b=True);txt(d,(x-2,920),label,19,c=MUTED)
 txt(d,(65,1031),'설명할 때 잠깐 멈추고, 대기 구간은 줄였습니다.',21,c=MUTED)
 txt(d,(1460,1031),'코치마크는 영상 설명용',21,c=MUTED)
 if guide:
  cx,cy,cw,ch=s['crop'];scale=min(1310/cw,906/ch);fw,fh=int(cw*scale),int(ch*scale);ox=570+(1310-fw)//2;oy=94
  rx,ry,rw,rh=s['rect'];x=ox+(rx-cx)*scale;y=oy+(ry-cy)*scale;r=x+rw*scale;b=y+rh*scale
  # A subtle focus wash dims only the footage outside the actual control.
  shade=Image.new('RGBA',(W,H),(0,0,0,0));sd=ImageDraw.Draw(shade);sd.rectangle((ox,oy,ox+fw,oy+fh),fill=(30,20,45,35));sd.rounded_rectangle((x-5,y-5,r+5,b+5),12,fill=(0,0,0,0));im=Image.alpha_composite(im,shade);d=ImageDraw.Draw(im)
  d.rounded_rectangle((x-5,y-5,r+5,b+5),12,outline=PURPLE,width=5)
  badge_y=max(110,y-42);badge_x=max(585,x-21);d.ellipse((badge_x,badge_y,badge_x+55,badge_y+55),fill=PURPLE);txt(d,(badge_x+17,badge_y+8),str(s['n']),28,c='white',b=True)
  # Coach title sits above the focused element and never covers its text.
  label_w=int(font(24,True).getlength(s['tag']))+36;lx=min(badge_x+65,1870-label_w);ly=max(94,badge_y)
  d.rounded_rectangle((lx,ly,lx+label_w,ly+46),10,fill=PURPLE);txt(d,(lx+18,ly+7),s['tag'],24,c='white',b=True)
 return im

if __name__=='__main__':
 encode('intro.mp4',intro());encode('outro.mp4',intro(True));entries=[('intro.mp4',3)];chapters=[]
 for k,s in enumerate(S):
  layout(s,False).save(B/f'panel-{k}.png');layout(s,True).save(B/f'coach-{k}.png')
  x,y,w,h=s['crop'];dur=s['z']-s['a']+s['hold']
  until=max(0,s['hold']-.12)
  graph=f"""[0:v]trim=start={s["a"]}:end={s["z"]},setpts=PTS-STARTPTS,tpad=start_mode=clone:start_duration={s["hold"]},fps=30,drawbox=x={s['rect'][0]}:y={s['rect'][1]}:w={s['rect'][2]}:h={s['rect'][3]}:color=0x7040d8:t=5:enable='lt(t,{until})',crop={w}:{h}:{x}:{y},scale=1310:906:force_original_aspect_ratio=decrease,pad=1920:1080:570+(1310-iw)/2:94:color=0xfaf6ed,setsar=1[v];[v][1:v]overlay=0:0"""
  name=f'scene-{k}.mp4';run(['-i',V1/'raw-session.webm','-loop','1','-i',B/f'panel-{k}.png','-loop','1','-i',B/f'coach-{k}.png','-filter_complex',graph,'-t',dur,'-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p',B/name]);entries.append((name,dur));chapters.append(s|{'duration':dur});print(name,dur,flush=True)
 entries.append(('outro.mp4',3));args=[]
 for name,_ in entries:args+=['-i',B/name]
 graph=[];prev='0:v';total=3
 for k in range(1,len(entries)):
  fade=.3;label=f'x{k}';graph.append(f'[{prev}][{k}:v]xfade=transition=fade:duration={fade}:offset={total-fade}[{label}]');prev=label;total+=entries[k][1]-fade
 dest=B.parent.parent/'site/assets/product-demo-v3.mp4'
 run(args+['-filter_complex',';'.join(graph),'-map',f'[{prev}]','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',dest]);run(['-ss','1.5','-i',dest,'-frames:v','1',dest.with_suffix('.jpg')])
 (B/'manifest.json').write_text(json.dumps({'duration':total,'chapters':chapters,'generatedVideoUsed':False,'highlightPolicy':'Draw on source coordinates before crop/scale; visible only during initial frozen explanation; removed before motion','sourceVideo':'product-demo-v1/raw-session.webm; development GUI; offline fixture'},ensure_ascii=False,indent=2),encoding='utf-8');print('DONE',total,flush=True)
