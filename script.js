/* Solar Performance Report Generator - launcher page behaviour */

/* ---------- Theme toggle ---------- */
var SUN='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="#f59e0b"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
var MOON='<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>';
function paint(el,l){el.dataset.mode=l?"light":"dark";el.innerHTML=(l?SUN:MOON)+(l?"LIGHT":"DARK");el.setAttribute("aria-label","Switch to "+(l?"dark":"light")+" mode");}

/* ---------- Client configuration ---------- */
// Triforce and Puresky open from the pages next to index.html.
// For a client with no built-in app, paste its website address in LINKS.
var APPS = { c1: "triforce.html", c2: "puresky.html" };
var LINKS = { c1: "", c2: "" };
var NAMES = { c1: "Triforce", c2: "Puresky" };
var OPEN_IN_NEW_TAB = false;

/* ---------- Report view ---------- */
var view = document.getElementById("appview"), frame = document.getElementById("appframe"),
    toast = document.getElementById("toast"), toastTimer;

function showToast(msg){
  toast.textContent = msg; toast.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(function(){ toast.hidden = true; }, 3500);
}
function openClient(id){
  if (APPS[id]) {
    document.getElementById("appname").textContent = NAMES[id];
    frame.src = APPS[id]; view.hidden = false; document.body.style.overflow = "hidden";
  } else if (LINKS[id]) {
    if (OPEN_IN_NEW_TAB) window.open(LINKS[id], "_blank", "noopener"); else location.href = LINKS[id];
  } else {
    showToast(NAMES[id] + " isn't connected yet.");
  }
}
function closeClient(){
  view.hidden = true; frame.src = "about:blank"; document.body.style.overflow = "";
}
["c1","c2"].forEach(function(id){
  document.getElementById(id).addEventListener("click", function(e){ e.preventDefault(); openClient(id); });
});
document.getElementById("back").addEventListener("click", closeClient);
document.addEventListener("keydown", function(e){ if (e.key === "Escape" && !view.hidden) closeClient(); });

/* ---------- Light / dark theme ---------- */
var root = document.documentElement, btn = document.getElementById("theme");
function isLight(){
  var t = root.getAttribute("data-theme");
  return t ? t === "light" : matchMedia("(prefers-color-scheme: light)").matches;
}
function label(){ paint(btn, isLight()); }
btn.addEventListener("click", function(){
  root.setAttribute("data-theme", isLight() ? "dark" : "light"); label();
});
label();
