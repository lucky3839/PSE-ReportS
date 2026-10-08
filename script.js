// Report tools live in separate pages and are shown inside an iframe
const SITES={
  new: "new-report.html",
  prev: "previous-report.html"
};
let frame=null, backBtn=null;
function openSite(key){
  closeSite(true);
  frame=document.createElement("iframe");
  frame.id="siteFrame";
  frame.title=key==="new"?"New Report":"Previous Report";
  frame.src=SITES[key];
  document.body.appendChild(frame);
  backBtn=document.createElement("button");
  backBtn.id="backBtn";
  backBtn.type="button";
  backBtn.textContent="\u2190 Home";
  backBtn.onclick=()=>history.back();
  document.body.appendChild(backBtn);
  document.documentElement.style.overflow="hidden";
  try{history.pushState({site:key},"")}catch(e){}
}
function closeSite(silent){
  if(frame){frame.remove();frame=null;}
  if(backBtn){backBtn.remove();backBtn=null;}
  document.documentElement.style.overflow="";
}
window.addEventListener("popstate",()=>closeSite());
document.getElementById("new").onclick=()=>openSite("new");
document.getElementById("prev").onclick=()=>openSite("prev");
// theme toggle
const tg=document.getElementById("themeToggle"),lb=document.getElementById("toggleLabel");
const SUN_ICON=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><circle cx="12" cy="12" r="5" fill="#FFC94D"/><g stroke="#FFC94D" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="19.8" y1="4.2" x2="17.7" y2="6.3"/><line x1="6.3" y1="17.7" x2="4.2" y2="19.8"/></g></svg>`;
const MOON_ICON='<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="#FFFFFF"/></svg>';
const knob=document.getElementById("toggleKnob");
function setTheme(t){document.body.dataset.theme=t;knob.innerHTML=t==="dark"?MOON_ICON:SUN_ICON;lb.textContent=t==="dark"?"DARK":"LIGHT";tg.setAttribute("aria-pressed",t==="dark");try{localStorage.setItem("theme",t)}catch(e){}}
tg.onclick=()=>setTheme(document.body.dataset.theme==="dark"?"light":"dark");
try{const s=localStorage.getItem("theme");if(s)setTheme(s);else setTheme("dark")}catch(e){setTheme("dark")}
