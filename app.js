'use strict';
const config = window.OFFICE_CONFIG || {};
const whatsapp = /^\d{12,15}$/.test(config.whatsapp || '') ? config.whatsapp : '';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ navigation.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menu'); }
menu.addEventListener('click',()=>{ const open = menu.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu'); });
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
if(whatsapp){document.querySelectorAll('[data-whatsapp]').forEach(a=>{a.href=`https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Gostaria de solicitar uma consulta com o escritório Helder Loureiro Advocacia.')}`;a.target='_blank';a.rel='noopener noreferrer'});document.querySelector('#submit-contact').textContent='Continuar no WhatsApp'}
if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email||'')){const a=document.querySelector('#email-link');a.href=`mailto:${config.email}`;a.querySelector('span').textContent=config.email;a.hidden=false}
document.querySelectorAll('[data-area]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#area').value=button.dataset.area;document.querySelector('#agendamento').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('#name').focus({preventScroll:true})}));
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const name=form.elements.name.value.trim();if(!name){form.elements.name.setCustomValidity('Informe seu nome.');form.elements.name.reportValidity();return}const message=`Olá! Meu nome é ${name}. Gostaria de solicitar atendimento em ${form.elements.area.value}.${form.elements.message.value.trim()?'\n\n'+form.elements.message.value.trim():''}`;
if(whatsapp){window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');document.querySelector('#form-status').textContent='Mensagem preparada. Conclua o envio no WhatsApp; a consulta ainda não está confirmada.'}else{document.querySelector('#message-preview').hidden=false;document.querySelector('#prepared-message').value=message;document.querySelector('#form-status').textContent='Mensagem preparada. Copie o texto e envie ao perfil oficial do escritório no Instagram.'}});
form.elements.name.addEventListener('input',()=>form.elements.name.setCustomValidity(''));
document.querySelector('#copy-message').addEventListener('click',async()=>{const field=document.querySelector('#prepared-message');try{await navigator.clipboard.writeText(field.value);document.querySelector('#form-status').textContent='Mensagem copiada. Envie pelo canal oficial do escritório.'}catch{field.focus();field.select();document.querySelector('#form-status').textContent='Selecione e copie o texto da mensagem para enviá-lo.'}});
const reviews=Array.isArray(config.reviews)?config.reviews.filter(r=>r&&typeof r.author==='string'&&typeof r.text==='string'):[];let index=0;
function renderReview(){const r=reviews[index];const content=document.querySelector('#review-content');content.replaceChildren();if(typeof config.googleRating==='number'){const rating=document.createElement('p');rating.textContent=`${config.googleRating.toLocaleString('pt-BR')} / 5${Number.isInteger(config.googleReviewCount)?` · ${config.googleReviewCount} avaliações no Google`:''}`;content.append(rating)}const quote=document.createElement('blockquote');quote.textContent=r.text;const author=document.createElement('cite');author.textContent=r.author;content.append(quote,author);if(Number.isFinite(r.rating)){const stars=document.createElement('p');stars.textContent=`Avaliação: ${r.rating} de 5`;content.append(stars)}document.querySelector('#review-position').textContent=`${index+1} de ${reviews.length}`}
if(reviews.length){renderReview();document.querySelector('#review-controls').hidden=reviews.length<2;document.querySelector('#prev-review').addEventListener('click',()=>{index=(index-1+reviews.length)%reviews.length;renderReview()});document.querySelector('#next-review').addEventListener('click',()=>{index=(index+1)%reviews.length;renderReview()})}
document.querySelector('#year').textContent=new Date().getFullYear();const privacy=document.querySelector('#privacy-dialog');document.querySelector('#privacy-button').addEventListener('click',()=>privacy.showModal());document.querySelector('#close-privacy').addEventListener('click',()=>privacy.close());privacy.addEventListener('click',e=>{if(e.target===privacy){const rect=privacy.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)privacy.close()}});

// Atualização agrupada por quadro: indicação de leitura e navegação contextual.
const progress = document.querySelector('.reading-progress');
const header = document.querySelector('.header');
const sectionLinks = [...navigation.querySelectorAll('a')];
const trackedSections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const officePhoto = document.querySelector('.office-photo');
document.querySelectorAll('.services .reveal').forEach((card, index) => {
  card.style.setProperty('--reveal-delay', `${(index % 2) * 100}ms`);
});
let scrollQueued = false;
function updateScrollState() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  // Movimento limitado à abertura, sem bibliotecas ou loop de animação contínuo.
  const parallax = !motionPreference.matches && window.innerWidth > 760
    ? Math.min(24, window.scrollY * .045) : 0;
  officePhoto.style.setProperty('--parallax', `${parallax}px`);
  let current = -1;
  trackedSections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top <= window.innerHeight * .4) current = index;
  });
  sectionLinks.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
function queueScrollState() {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScrollState); }
}
window.addEventListener('scroll', queueScrollState, { passive: true });
window.addEventListener('resize', queueScrollState, { passive: true });
window.addEventListener('load', updateScrollState);
motionPreference.addEventListener('change', updateScrollState);
document.querySelectorAll('.service-details').forEach(details => details.addEventListener('toggle', queueScrollState));
updateScrollState();
