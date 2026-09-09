from pathlib import Path
import subprocess,json,hashlib
import numpy as np
import imageio_ffmpeg
from PIL import Image
B=Path(__file__).resolve().parent;F=imageio_ffmpeg.get_ffmpeg_exe();m=json.loads((B/'manifest.json').read_text(encoding='utf-8'));results={}
for mobile in [False,True]:
 name='product-demo-v5'+('-mobile' if mobile else '')+'.mp4';p=B/name;w,h=(270,360) if mobile else (480,270);factor=.25
 metaReader=imageio_ffmpeg.read_frames(str(p));meta=next(metaReader);metaReader.close()
 assert abs(meta['duration']-m['duration'])<.04;assert meta['fps']==30
 proc=subprocess.Popen([F,'-v','error','-i',str(p),'-vf',f'scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],stdout=subprocess.PIPE)
 stats=[{'tag':s['tag'],'guidedFrames':0,'clearFrames':0,'maxFreezeDifference':0,'minGuidePixels':999999,'maxClearPixels':0} for s in m['shots']];baselines={};i=0;shot=0
 while True:
  raw=proc.stdout.read(w*h*3)
  if not raw:break
  a=np.frombuffer(raw,np.uint8).reshape(h,w,3).astype(np.int16)
  while shot<len(m['shots']) and i>=m['shots'][shot]['endFrame']:shot+=1
  if shot<len(m['shots']) and i>=m['shots'][shot]['startFrame']:
   s=m['shots'][shot];st=stats[shot]
   if mobile:
    # Entire picture area, including margins containing the badge.
    roi=a[92:282,:]
   else:roi=a[33:248,119:]
   r,g,b=roi[:,:,0],roi[:,:,1],roi[:,:,2];purple=(r>60)&(r<160)&(g<110)&(b>140)&(b>r+45)&(b>g+65);count=int(purple.sum())
   guided=i<s['highlightEndFrame']
   if guided:
    st['guidedFrames']+=1;st['minGuidePixels']=min(st['minGuidePixels'],count)
    assert count>=10,(name,shot,i,'missing highlight',count)
    if shot not in baselines:baselines[shot]=roi.copy()
    diff=float(np.abs(roi-baselines[shot]).mean());st['maxFreezeDifference']=max(st['maxFreezeDifference'],diff)
    assert diff<1.0,(name,shot,i,'freeze moved',diff)
   else:
    st['clearFrames']+=1;st['maxClearPixels']=max(st['maxClearPixels'],count)
    assert count<=5,(name,shot,i,'highlight after cutoff',count)
  i+=1
 proc.stdout.close();assert proc.wait()==0;assert i==m['frames'],(i,m['frames'])
 for s,st in zip(m['shots'],stats):assert st['guidedFrames']==s['freezeFrames']-4;assert st['clearFrames']==s['motionFrames']+4
 results[name]={'frames':i,'duration':meta['duration'],'fps':meta['fps'],'size':meta['size'],'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'everyFrameChecked':True,'freezeAndHighlightTiming':'PASS','shots':stats}
 subprocess.run([F,'-v','error','-i',str(p),'-f','null','-'],check=True)
 Image.open(B/('storyboard-04-mobile.png' if mobile else 'storyboard-03.png')).convert('RGB').save(B/name.replace('.mp4','.jpg'),quality=87)
(B/'verification.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({k:{x:v[x] for x in ['frames','duration','fps','bytes','freezeAndHighlightTiming']} for k,v in results.items()},indent=2))
