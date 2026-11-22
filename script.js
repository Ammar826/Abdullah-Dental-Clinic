// EDIT: phone for calls; whatsapp in international format (Pakistan: 92 + number without the leading 0)
var CLINIC = { phone: "03353712256", show: "0335 3712256", whatsapp: "923353712256", address: "B-256, Federal B Area, Block 10, Gulberg Town, Karachi, Pakistan", hours: "" };
// OPTIONAL: real photo URLs or data URIs to replace the illustrations
var PHOTOS = { hero: "", clinic: "", doctor: "", banner: "" };

document.getElementById('yr').textContent = new Date().getFullYear();
document.querySelectorAll('[data-call]').forEach(function(a){ a.href = 'tel:' + CLINIC.phone; });
['ph1','ph2'].forEach(function(i){ document.getElementById(i).textContent = CLINIC.show; });
document.querySelectorAll('[data-wa]').forEach(function(a){ a.href = 'https://wa.me/' + CLINIC.whatsapp; });
var hdr = document.getElementById('hd'), bg = document.getElementById('bg');
bg.addEventListener('click', function(){ var o = hdr.classList.toggle('open'); bg.setAttribute('aria-expanded', o); });
document.querySelectorAll('nav a').forEach(function(a){ a.addEventListener('click', function(){ hdr.classList.remove('open'); bg.setAttribute('aria-expanded', false); }); });
if (CLINIC.address) document.getElementById('addr').textContent = CLINIC.address;
if (CLINIC.hours) document.getElementById('hrs').textContent = 'Open ' + CLINIC.hours;
document.getElementById('wa').href = 'https://wa.me/' + CLINIC.whatsapp;
document.querySelectorAll('[data-photo]').forEach(function(s){
  var src = PHOTOS[s.getAttribute('data-photo')];
  if (src) s.innerHTML = '<img alt="" src="' + src + '">';
});

var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

var hd = document.getElementById('hd'), bar = document.getElementById('bar');
function onScroll(){
  var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
  hd.classList.toggle('s', y > 20);
  bar.style.width = (h > 0 ? y / h * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

var art = document.getElementById('art'), hero = document.querySelector('.hero');
hero.addEventListener('pointermove', function(e){
  var r = hero.getBoundingClientRect();
  art.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(2));
  art.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(2));
});

document.getElementById('send').addEventListener('click', function(){
  var name = document.getElementById('n').value.trim() || 'a new patient';
  var msg = 'Hello, I am ' + name + '. I would like to book a visit for: ' + document.getElementById('t').value + '. Preferred day: ' + (document.getElementById('d').value.trim() || 'any day') + '.';
  window.open('https://wa.me/' + CLINIC.whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
});