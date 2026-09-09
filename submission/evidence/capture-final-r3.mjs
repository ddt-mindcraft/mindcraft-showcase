import {chromium,expect} from 'file:///C:/ai/ai-dlc-09-09/mindcraft/node_modules/@playwright/test/index.mjs';
import {spawn,spawnSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const base=path.resolve('demo-evidence/final-r3'),root=path.join(base,'session-'+Date.now()),folder=path.join(root,'온담 작업실'),profile=path.join(root,'profile'),temp=path.join(root,'temp'),shots=path.join(base,'screenshots');
for(const p of [folder,profile,temp,shots])await fs.mkdir(p,{recursive:true});
const source='C:/ai/ai-dlc-09-09/mindcraft/release/build-z9OSa3/MindCraft-0.1.0-windows-x64.exe';
const executable=path.join(folder,'MindCraft.exe');await fs.copyFile(source,executable);
const sha=crypto.createHash('sha256').update(await fs.readFile(executable)).digest('hex');
if(sha!=='6acc01d3dc82032a9c7214bceef44cada5a67d51524708945fda4f31e3e2b150')throw Error('Wrong EXE');
const env={...process.env,TEMP:temp,TMP:temp};delete env.ELECTRON_RUN_AS_NODE;delete env.NODE_OPTIONS;
const child=spawn(executable,['--remote-debugging-port=0','--user-data-dir='+profile],{env,windowsHide:true,stdio:'ignore'});
let browser;const errors=[],requests=[],captures=[];
try{
 let endpoint;const deadline=Date.now()+90000;
 while(Date.now()<deadline){try{const [port,p]=(await fs.readFile(path.join(profile,'DevToolsActivePort'),'utf8')).trim().split(/\r?\n/);if(/^\d+$/.test(port)&&p.startsWith('/devtools/browser/')){endpoint='ws://127.0.0.1:'+port+p;break;}}catch{}await new Promise(r=>setTimeout(r,250));}
 if(!endpoint)throw Error('No isolated endpoint');browser=await chromium.connectOverCDP(endpoint);const ctx=browser.contexts()[0],page=ctx.pages()[0]??await ctx.waitForEvent('page');
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await page.setViewportSize({width:1440,height:1000});
 const shot=async(name)=>{await page.screenshot({path:path.join(shots,name+'.png')});captures.push({file:name+'.png',capturedAt:new Date().toISOString()});};
 await expect(page.getByTestId('setup-onboarding')).toBeVisible({timeout:30000});await shot('01-start');
 await page.getByTestId('setup-explore-button').click();await page.getByTestId('home-sample-button').click();
 await expect(page.locator('.source-card')).toHaveCount(3);await shot('02-sources');
 await page.getByTestId('workspace-context-confirm-button').click();await expect(page.locator('.status.completed')).toBeVisible({timeout:30000});await page.getByTestId('output-latest').click();await expect(page.locator('.markdown')).toContainText('온담');await shot('03-result');
 await page.getByRole('button',{name:'파일로 저장',exact:true}).click();await page.getByTestId('workspace-dialog-input').fill('온담 준비안.md');await page.getByTestId('workspace-dialog-submit').click();await expect(page.getByTestId('approval-approve-button')).toBeVisible();await shot('04-approval');await page.getByTestId('approval-approve-button').click();
 await expect.poll(async()=>{try{return await fs.readFile(path.join(folder,'온담 준비안.md'),'utf8');}catch{return '';}}).toContain('온담');
 await page.getByTestId('nav-history').click();await expect(page.getByTestId('history-selected-task')).toContainText('온담');await shot('05-history');await page.getByRole('button',{name:'실행 결과 열기'}).first().click();await expect(page.getByTestId('workspace')).toBeVisible();
 if(errors.length||requests.length)throw Error(JSON.stringify({errors,requests}));
 await fs.writeFile(path.join(base,'capture-report.json'),JSON.stringify({status:'PASS',executableSha256:sha,sourceCommit:'26eb06f43d3e02aa1b0db04b85e1e870f239a417',build:'build-z9OSa3',mode:'offline',mockedIPC:false,modelCalls:0,networkRequests:requests,rendererErrors:errors,viewport:{width:1440,height:1000},steps:['first setup','3 source cards','completed result','approved file saved and contents verified','history reopened'],captures},null,2));
 console.log('PASS final EXE: onboarding → 3 sources → result → saved file → history; 5 raw screenshots; no network');
}finally{await browser?.close().catch(()=>{});if(child.pid&&child.exitCode===null)spawnSync('taskkill.exe',['/PID',String(child.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'});}
