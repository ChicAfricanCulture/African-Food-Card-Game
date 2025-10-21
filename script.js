
// African Food × Country Matching Game — ChicAfricanCulture Edition
// ---------------------------------------------------------------

// ===== Helper functions =====
const $ = (sel, root=document) => root.querySelector(sel);

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randOne(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function formatTime(s){
  const m = String(Math.floor(s/60)).padStart(2,'0');
  const sec = String(s%60).padStart(2,'0');
  return `${m}:${sec}`;
}

// ===== Game state =====
let state = { deck:[], first:null, lock:false, found:0, moves:0, seconds:0, timer:null };

// ===== Build deck =====
function buildDeck(){
  const chosen = DATA.map(d => ({...d, img: randOne(d.images)}));
  const deck = [];
  chosen.forEach(d => {
    const base = {pair:d.id, country:d.country, dish:d.dish, note:d.note, img:d.img};
    deck.push({...base, key:d.id+'-A'});
    deck.push({...base, key:d.id+'-B'});
  });
  return shuffle(deck);
}

// ===== Render board =====
function renderBoard(root=document){
  const grid = $('#grid', root);
  grid.innerHTML = '';
  state.deck.forEach(card => {
    const btn = document.createElement('button');
    btn.className='card';
    btn.setAttribute('aria-label','Card');
    btn.dataset.pair = card.pair;
    btn.dataset.key = card.key;

    const inner = document.createElement('div');
    inner.className='inner';

    const front = document.createElement('div');
    front.className='face front';
    front.innerHTML = `<div class="glyph">Tap to Flip</div>`;

    const back = document.createElement('div');
    back.className='face back';
    back.innerHTML = `
      <div class="photo"><img src="${card.img}" alt="${card.dish} — ${card.country}" loading="lazy"></div>
      <div>
        <div class="badge">Food × Country</div>
        <div class="country">${card.country}</div>
        <div class="dish">${card.dish}</div>
        <div class="note">${card.note}</div>
      </div>`;

    inner.appendChild(front);
    inner.appendChild(back);
    btn.appendChild(inner);
    btn.addEventListener('click', onFlip);
    grid.appendChild(btn);
  });

  // graceful fade-in when board loads
  grid.style.opacity = '0';
  setTimeout(() => { grid.style.transition='opacity .6s ease'; grid.style.opacity='1'; }, 50);
}

// ===== Flip handler =====
function onFlip(e){
  const card = e.currentTarget;
  if(state.lock || card.classList.contains('flipped')) return;
  card.classList.add('flipped');

  if(!state.first){
    state.first = card;
    if(state.moves === 0 && state.found === 0) startTimer();
    return;
  }

  state.moves++;
  $('#moves').textContent = state.moves;
  const a = state.first.dataset.pair;
  const b = card.dataset.pair;

  if(a === b){
    // --- Match found ---
    const pairData = DATA.find(d => d.id === a);
    setTimeout(() => {
      state.first.classList.add('am-locked');
      card.classList.add('am-locked');
      toast(`${pairData.dish} — ${pairData.country}: ${pairData.fact || ''}`);
      state.first = null;
      state.found++;
      $('#found').textContent = state.found;
      checkWin();
    }, 250);
  } else {
    // --- Mismatch ---
    state.lock = true;
    setTimeout(() => {
      // Flip both cards back
      card.classList.remove('flipped');
      state.first.classList.remove('flipped');
      state.first = null;

      // Gentle fade-out shuffle
      const grid = document.getElementById('grid');
      grid.style.transition = 'opacity 0.3s ease';
      grid.style.opacity = '0.5';

      setTimeout(() => {
        const cards = Array.from(grid.children);
        shuffle(cards);
        cards.forEach(c => grid.appendChild(c));
        grid.style.opacity = '1';
        state.lock = false;
      }, 350);
    }, 900);
  }
}

// ===== Check win =====
function checkWin(){
  if(state.found === DATA.length){
    stopTimer();
    $('#status').innerHTML = `🎉 Completed in <strong>${state.moves}</strong> moves • <strong>${formatTime(state.seconds)}</strong>`;
    $('#drawer').classList.add('show');
    const sel = $('#dishSelect');
    sel.innerHTML = DATA.map(d => `<option value="${d.id}">${d.dish} — ${d.country}</option>`).join('');
    $('#recipeText').value = DATA[0].recipe;
  }
}

// ===== Timer =====
function startTimer(){
  clearInterval(state.timer);
  state.seconds = 0;
  $('#time').textContent = '00:00';
  state.timer = setInterval(()=>{
    state.seconds++;
    $('#time').textContent = formatTime(state.seconds);
  },1000);
}

function stopTimer(){ clearInterval(state.timer); }

// ===== Toast =====
function toast(text){
  const t = $('#toast');
  if(!t) return;
  t.textContent = text;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
}

// ===== Reset Game =====
function resetGame(root=document){
  state = { deck: buildDeck(), first:null, lock:false, found:0, moves:0, seconds:0, timer:null };
  renderBoard(root);
  $('#found').textContent='0';
  $('#moves').textContent='0';
  $('#time').textContent='00:00';
  $('#status').textContent='Pairs found: 0/8 • Moves: 0 • Time: 00:00';
  $('#drawer').classList.remove('show');
}

// ===== Recipe drawer wiring =====
function wireRecipe(){
  const sel = $('#dishSelect');
  const textarea = $('#recipeText');
  sel.addEventListener('change', e=>{
    const d = DATA.find(x=>x.id===e.target.value);
    textarea.value = d ? d.recipe : '';
  });
  $('#copyBtn').addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(textarea.value);
      $('#copyBtn').textContent='Copied!';
      setTimeout(()=> $('#copyBtn').textContent='Copy Recipe',900);
    }catch{
      textarea.select();
      document.execCommand('copy');
    }
  });
}

// ===== Page entry points =====
function initShowcase(){
  $('#playBtn').addEventListener('click', ()=>{
    document.getElementById('game').scrollIntoView({behavior:'smooth'});
  });
  resetGame(document);
  wireRecipe();
  $('#restart').addEventListener('click', ()=> resetGame(document));
}

function initEmbed(){
  resetGame(document);
  wireRecipe();
  $('#restart').addEventListener('click', ()=> resetGame(document));
}

// ===== Run on load =====
window.addEventListener('DOMContentLoaded', ()=>{
  const mode = document.body.getAttribute('data-mode');
  if(mode === 'embed'){ initEmbed(); } else { initShowcase(); }
});
