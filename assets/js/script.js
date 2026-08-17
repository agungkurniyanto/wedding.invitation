const CONFIG={weddingDate:"2026-09-26T10:00:00+07:00",whatsappNumber:"6281234567890"};
const params=new URLSearchParams(window.location.search);
const recipient=params.get("to");
function decodeRecipient(value){if(!value)return"Tamu Undangan";return value.replace(/\+/g," ").trim();}
document.getElementById("recipientName").textContent=decodeRecipient(recipient);
const openButton=document.getElementById("openInvitation"),invitation=document.getElementById("invitationContent"),music=document.getElementById("music"),musicButton=document.getElementById("musicButton");
openButton.addEventListener("click",async()=>{invitation.classList.remove("hidden");document.getElementById("home").style.minHeight="55svh";document.getElementById("home").scrollIntoView({behavior:"smooth"});try{await music.play();musicButton.textContent="❚❚";}catch(e){}});
musicButton.addEventListener("click",async()=>{if(music.paused){try{await music.play();musicButton.textContent="❚❚";}catch(e){}}else{music.pause();musicButton.textContent="♫";}});
function updateCountdown(){const target=new Date(CONFIG.weddingDate).getTime(),diff=Math.max(0,target-Date.now());document.getElementById("days").textContent=Math.floor(diff/86400000);document.getElementById("hours").textContent=Math.floor(diff/3600000)%24;document.getElementById("minutes").textContent=Math.floor(diff/60000)%60;document.getElementById("seconds").textContent=Math.floor(diff/1000)%60;}
updateCountdown();setInterval(updateCountdown,1000);
const message=`Halo, saya ${decodeRecipient(recipient)} ingin mengonfirmasi kehadiran pada pemberkatan pernikahan Agung & Efarna, 26 September 2026.`;
document.getElementById("rsvpLink").href=`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("show");}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loading").classList.add("hide"),300));