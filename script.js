// African Food × Country Matching Game — Black Edition
// ---------------------------------------------------------------

// ===== Game data =====
const DATA = [
  { id: 'jollof', dish: 'Jollof Rice', country: 'Nigeria', fact: 'A one-pot rice dish cooked with tomatoes, onions, and spices.' },
  { id: 'fufu', dish: 'Fufu', country: 'Ghana', fact: 'A starchy side dish made from cassava and plantains.' },
  { id: 'injera', dish: 'Injera', country: 'Ethiopia', fact: 'A sour fermented flatbread with a spongy texture.' },
  { id: 'tagine', dish: 'Tagine', country: 'Morocco', fact: 'A slow-cooked stew named after the clay pot it cooks in.' },
  { id: 'bunny', dish: 'Bunny Chow', country: 'South Africa', fact: 'A hollowed-out loaf of bread filled with curry.' },
  { id: 'egusi', dish: 'Egusi Soup', country: 'Nigeria', fact: 'A thick soup made with ground melon seeds and leafy vegetables.' },
  { id: 'suya', dish: 'Suya', country: 'Nigeria', fact: 'Spicy grilled meat skewers seasoned with peanut sauce.' },
  { id: 'benachin', dish: 'Benachin', country: 'Gambia', fact: 'A one-pot rice dish also known as Jollof in other regions.' }
];

// ===== Helper functions =====
const $ = (sel, root=document) => root.querySelector(sel);

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(s){
  const m = String(Math.floor(s / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

// ===== Game state =====
let state = {
  deck: [],
  first: null,
  lock: false,
  found: 0,
  moves: 0,
  seconds: 0,
  timer: null
};

// ===== Build deck =====
function buildDeck(){
  const deck = [];
  DATA.forEach(item => {
    // Dish card
    deck.push({
      pairId: item.id,
      type: 'dish',
      title: item.dish,
      subtitle: item.country,
      fact: item.fact,
      key: `${item.id}-dish`
    });
    // Country card
    deck.push({
      pairId: item.id,
      type: 'country',
      title: item.country,
      subtitle: item.dish,
      fact: item.fact,
      key: `${item.id}-country`
    });
  });
  return shuffle(deck);
}

// ===== Render board =====
function renderBoard(){
  const grid = $('#grid');
  if(!grid) return;
  
  grid.innerHTML = '';
  state.deck.forEach(card => {
    const btn = document.createElement('button');
    btn.className = 'card';
    btn.dataset.pair = card.pairId;
    btn.dataset.key = card.key;
    
    const inner = document.createElement('div');
    inner.className = 'inner';
    
    // Front face — COMPLETELY BLANK BLACK
    const front = document.createElement('div');
    front.className = 'face front';
    front.innerHTML = ``; // Nothing. Empty. Pure black.
    
    // Back face — white text on black
    const back = document.createElement('div');
    back.className = 'face back';
    back.innerHTML = `
      <div class="card-content">
        <div class="card-title">${card.title}</div>
        <div class="card-subtitle">${card.subtitle}</div>
      </div>
    `;
    
    inner.appendChild(front);
    inner.appendChild(back);
    btn.appendChild(inner);
    btn.addEventListener('click', onFlip);
    grid.appendChild(btn);
  });
}

// ===== Flip handler =====
function onFlip(e){
  const card = e.currentTarget;
  if(state.lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  
  if(!state.first){
    state.first = card;
    if(state.moves === 0 && state.found === 0) startTimer();
    return;
  }
  
  state.moves++;
  $('#moves').textContent = state.moves;
  
  const firstPair = state.first.dataset.pair;
  const secondPair = card.dataset.pair;
  
  if(firstPair === secondPair){
    // Match found
    state.first.classList.add('matched');
    card.classList.add('matched');
    
    // Show fact
    const item = DATA.find(d => d.id === firstPair);
    if(item) toast(item.fact);
    
    state.first = null;
    state.found++;
    $('#found').textContent = state.found;
    checkWin();
  } else {
    // Mismatch
    state.lock = true;
    setTimeout(() => {
      card.classList.remove('flipped');
      state.first.classList.remove('flipped');
      state.first = null;
      state.lock = false;
    }, 800);
  }
}

// ===== Check win =====
function checkWin(){
  if(state.found === DATA.length){
    stopTimer();
    $('#status').innerHTML = `🎉 Completed in <strong>${state.moves}</strong> moves • <strong>${formatTime(state.seconds)}</strong>`;
    
    // Show recipe drawer
    const drawer = $('#drawer');
    if(drawer) {
      drawer.style.display = 'block';
      const sel = $('#dishSelect');
      if(sel) {
        sel.innerHTML = DATA.map(d => `<option value="${d.id}">${d.dish} — ${d.country}</option>`).join('');
        $('#recipeText').value = DATA[0].fact;
      }
    }
  }
}

// ===== Timer functions =====
function startTimer(){
  clearInterval(state.timer);
  state.seconds = 0;
  $('#time').textContent = '00:00';
  state.timer = setInterval(() => {
    state.seconds++;
    $('#time').textContent = formatTime(state.seconds);
  }, 1000);
}

function stopTimer(){
  clearInterval(state.timer);
}

// ===== Toast notification =====
function toast(text){
  const t = $('#toast');
  if(!t) return;
  t.textContent = text;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== Reset game =====
function resetGame(){
  stopTimer();
  state = {
    deck: buildDeck(),
    first: null,
    lock: false,
    found: 0,
    moves: 0,
    seconds: 0,
    timer: null
  };
  renderBoard();
  $('#found').textContent = '0';
  $('#moves').textContent = '0';
  $('#time').textContent = '00:00';
  $('#status').innerHTML = 'Pairs found: 0/8 • Moves: 0 • Time: 00:00';
  
  const drawer = $('#drawer');
  if(drawer) drawer.style.display = 'none';
}

// ===== Recipe drawer wiring =====
function wireRecipe(){
  const sel = $('#dishSelect');
  const textarea = $('#recipeText');
  if(!sel || !textarea) return;
  
  sel.addEventListener('change', e => {
    const d = DATA.find(x => x.id === e.target.value);
    if(d) textarea.value = d.fact;
  });
  
  const copyBtn = $('#copyBtn');
  if(copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textarea.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Recipe', 900);
      } catch {
        textarea.select();
        document.execCommand('copy');
      }
    });
  }
}

// ===== Initialize =====
window.addEventListener('DOMContentLoaded', () => {
  resetGame();
  wireRecipe();
  
  const restart = $('#restart');
  if(restart) restart.addEventListener('click', resetGame);
});
