const CONFIG={weddingDate:"2026-09-26T10:00:00+07:00"};
const p=new URLSearchParams(location.search);
document.getElementById("recipientName").textContent=(p.get("to")||"Tamu Undangan").replace(/\+/g," ").trim()||"Tamu Undangan";

const sb=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.key);

document.getElementById("openInvitation").onclick=async()=>{
 document.getElementById("main").classList.remove("hidden");
 document.getElementById("cover").classList.add("cover-hide");
 setTimeout(()=>document.getElementById("main").scrollIntoView({behavior:"smooth"}),500);
 try{await music.play();musicButton.textContent="❚❚"}catch(e){}
};

const music=document.getElementById("music"),musicButton=document.getElementById("musicButton");
musicButton.onclick=async()=>{if(music.paused){try{await music.play();musicButton.textContent="❚❚"}catch(e){}}else{music.pause();musicButton.textContent="♫"}};

function countdown(){const d=Math.max(0,new Date(CONFIG.weddingDate)-Date.now());days.textContent=Math.floor(d/86400000);hours.textContent=Math.floor(d/3600000)%24;minutes.textContent=Math.floor(d/60000)%60;seconds.textContent=Math.floor(d/1000)%60}
countdown();setInterval(countdown,1000);

const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("show")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

function parallax(){document.querySelectorAll(".parallax-bg").forEach(bg=>{const r=bg.parentElement.getBoundingClientRect();bg.style.transform=`translate3d(0,${(innerHeight/2-(r.top+r.height/2))*-.08}px,0) scale(1.08)`})}
addEventListener("scroll",parallax,{passive:true});addEventListener("resize",parallax);parallax();

document.getElementById("copyAccount").onclick=async()=>{
 try{await navigator.clipboard.writeText("0374190641");copyStatus.textContent="Nomor rekening berhasil disalin."}
 catch(e){copyStatus.textContent="Nomor rekening: 0374190641"}
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
async function loadGuests(){
 const box=document.getElementById("guestList");
 const {data,error}=await sb.from("wedding_guests").select("id,name,attendance,message,created_at").order("created_at",{ascending:false});
 if(error){box.innerHTML="<p>Ucapan belum dapat dimuat. Periksa konfigurasi Supabase.</p>";return}
 box.innerHTML=data.length?data.map(x=>`<article class="guest"><strong>${esc(x.name)}</strong><small>${esc(x.attendance)}</small><p>${esc(x.message)}</p></article>`).join(""):"<p>Belum ada ucapan. Jadilah yang pertama.</p>";
}
document.getElementById("guestForm").onsubmit=async e=>{
 e.preventDefault();guestStatus.textContent="Mengirim...";
 const {error}=await sb.from("wedding_guests").insert({name:guestName.value.trim(),attendance:attendance.value,message:guestMessage.value.trim()});
 if(error){guestStatus.textContent="Gagal mengirim. Silakan coba lagi.";return}
 e.target.reset();guestStatus.textContent="Terima kasih, ucapan Anda sudah tersimpan.";loadGuests();
};
loadGuests();

sb.channel("wedding-guests-live").on("postgres_changes",{event:"*",schema:"public",table:"wedding_guests"},loadGuests).subscribe();

addEventListener("load",()=>setTimeout(()=>document.getElementById("loading").classList.add("hide"),300));