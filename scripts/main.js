const L=[["website","placeholder"],["github","placeholder"],["gitlab","placeholder"],["mastodon","placeholder"],["mail","placeholder"]];
const $=id=>document.getElementById(id);
$("year").textContent=new Date().getFullYear();
$("mq").textContent="STUDYING & WRITING CODE * ".repeat(14);

// cursor: dot follows instantly, outline trails
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  const cd=$("cd"),co=$("co"),root=document.documentElement;
  root.classList.add("cx");
  addEventListener("mousemove",()=>root.classList.add("mv"),{once:true});
  addEventListener("mousemove",e=>{
    cd.style.left=e.clientX+"px";cd.style.top=e.clientY+"px";
    co.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:450,fill:"forwards"});
  });
}

// pages: #shell is the terminal, anything else is home
const home=$("home"),term=$("term"),log=$("log"),cmd=$("cmd");
let booted=false;
const out=(t,c)=>{const d=document.createElement("div");d.textContent=t;if(c)d.className=c;log.appendChild(d);log.scrollTop=log.scrollHeight};
function route(){
  const t=location.hash==="#shell";
  home.hidden=t;term.hidden=!t;scrollTo(0,0);
  document.title=t?"shell — John Doe":"John Doe — Contact";
  if(t){if(!booted){booted=true;out("john doe terminal [v1.0]");out("type help for commands, exit to leave.")}cmd.focus({preventScroll:true})}
}
addEventListener("hashchange",route);route();

// home prompt: ghost text suggests "shell" - press Enter, Tab or tap the arrow
const top_=$("top"),msg=$("msg");let mt;
const say=t=>{msg.textContent=t;clearTimeout(mt);mt=setTimeout(()=>msg.textContent="",3500)};
$("pf").addEventListener("submit",e=>{
  e.preventDefault();const v=top_.value.trim().toLowerCase();top_.value="";
  if(!v||["shell","sh","./shell","term"].includes(v))location.hash="#shell";
  else if(v==="help")say("type shell, or just press enter");
  else say(v+": command not found. try shell");
});
top_.addEventListener("keydown",e=>{if(e.key==="Tab"&&!top_.value){e.preventDefault();top_.value="shell"}});
addEventListener("keydown",e=>{
  if(home.hidden||e.ctrlKey||e.metaKey||e.altKey||e.key.length!==1)return;
  if(document.activeElement.tagName!=="INPUT")top_.focus();
});

// shell commands
const hist=[];let hi=0;
function run(v){
  const [c,...r]=v.trim().split(/\s+/),a=r.join(" ").toLowerCase();
  switch((c||"").toLowerCase()){
    case"":break;
    case"help":out("ls  whoami  open <n|name>  theme  clear  exit");break;
    case"ls":L.forEach(([k,u],i)=>out(`${i+1}  ${k.padEnd(9)} ${u.replace("mailto:","")}`));break;
    case"whoami":out("john doe - studying & writing code");break;
    case"theme":{const r=document.documentElement,light=getComputedStyle(r).getPropertyValue("--bg").trim()==="#fff";r.dataset.theme=light?"dark":"light";out("theme: "+(light?"dark":"light"));break}
    case"clear":log.textContent="";break;
    case"exit":case"home":case"back":location.hash="#";break;
    case"open":{const l=L[parseInt(a,10)-1]||L.find(x=>x[0]===a);
      if(!l){out("open: no such link. try ls","err");break}
      out("opening "+l[0]+" ...");if(l[1].startsWith("mailto:"))location.href=l[1];else window.open(l[1],"_blank","noopener");break}
    default:out(c+": command not found. type help","err");
  }
}
$("cf").addEventListener("submit",e=>{e.preventDefault();const v=cmd.value;out("$ "+v);if(v.trim())hist.push(v);hi=hist.length;cmd.value="";run(v)});
cmd.addEventListener("keydown",e=>{
  if(e.key==="ArrowUp"){e.preventDefault();if(hi>0)cmd.value=hist[--hi]}
  else if(e.key==="ArrowDown"){e.preventDefault();cmd.value=hi<hist.length-1?hist[++hi]:(hi=hist.length,"")}
});
