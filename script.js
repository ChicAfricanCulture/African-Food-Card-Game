
// African Food × Country Matching Game — shared logic for index.html & embed.html
// Two images per dish; one is chosen at random per game.
// Credits live in CREDITS.md. Some images CC BY / CC BY-SA (Wikimedia), Unsplash license otherwise.

const DATA = [
  {
    id:'nigeria-egusi', country:'Nigeria', dish:'Egusi Soup',
    note:'Rich melon-seed soup with greens and spices.',
    fact:'Egusi is protein-rich and often served with pounded yam.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/8/84/Egusi_soup_with_ponmo_and_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/50/Big_lot_of_Egusi_soup.jpg'
    ],
    recipe: `Egusi Soup (Nigeria)
Serves 4

Ingredients
- 1 cup ground egusi (melon seeds)
- 2 tbsp palm oil (or neutral oil)
- 1 small onion, chopped
- 2 cloves garlic, minced
- 1–2 Scotch bonnet, chopped
- 2 cups stock
- 2 cups chopped greens (spinach or ugu)
- 1 tsp ground crayfish (optional)
- Salt & pepper

Instructions
1) Warm oil; sauté onion + pepper 2–3 min.
2) Stir in egusi; toast 1–2 min.
3) Add stock gradually; simmer 8–10 min.
4) Add greens + crayfish; simmer 3–5 min. Season and serve.`
  },
  {
    id:'ghana-jollof', country:'Ghana', dish:'Jollof Rice',
    note:'Tomato-based spiced rice beloved across West Africa.',
    fact:'The Ghana–Nigeria “Jollof wars” are legendary!',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/e/e1/Jollof_Rice_Ghana.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Ghana_jollof_rice.jpg'
    ],
    recipe:`Jollof Rice (Ghana)
Serves 4–6

Ingredients
- 2 cups long-grain rice, rinsed
- 1 large onion (half blended, half sautéed)
- 1 red bell pepper + 2 tomatoes, blended
- 2 tbsp tomato paste
- 2–3 tbsp oil
- 1 tsp each: curry powder, thyme, paprika
- 2–2½ cups stock, salt & pepper
- 1 bay leaf

Instructions
1) Sauté onion; cook tomato paste 2 min.
2) Add blended sauce + spices; reduce until glossy.
3) Stir in rice + bay; add stock to just cover.
4) Cover low 18–22 min until tender. Fluff.`
  },
  {
    id:'morocco-couscous', country:'Morocco', dish:'Couscous',
    note:'Steamed semolina granules with vegetable stew.',
    fact:'Traditionally steamed above a couscoussier for feather-light texture.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/6/67/MoroccanCouscous.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Moroccan_traditional_couscous.jpg'
    ],
    recipe:`Couscous with Vegetables (Morocco)
Serves 4

Ingredients
- 1½ cups couscous + 1¾ cups hot stock
- 2 tbsp olive oil
- Onion, carrots, zucchini, chickpeas
- 1 tsp ras el hanout (or cumin + coriander)
- Salt, pepper, herbs, lemon

Instructions
1) Hydrate couscous with hot stock; cover 6–8 min; fluff.
2) Sauté veg with spices 6–8 min; add chickpeas.
3) Serve over couscous; finish with herbs & lemon.`
  },
  {
    id:'senegal-thieb', country:'Senegal', dish:'Thieboudienne',
    note:'Rice, fish, and vegetables in tomato sauce.',
    fact:'Known as ceebu jën; often cooked in one pot for sharing.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/c/cf/Senegalese_Thieboudienne.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/1/19/Red_Thieboudienne.JPG'
    ],
    recipe:`Thieboudienne (Senegal)
Serves 4–6

Ingredients
- 1½ lb firm fish steaks
- 2 cups broken rice (or long-grain)
- Onion, tomatoes + paste
- Carrot, sweet potato, cabbage (chunks)
- Habanero (whole), oil, salt, pepper
- 3–4 cups stock/water

Instructions
1) Brown seasoned fish; set aside.
2) Sauté onion; add tomatoes + paste; thicken.
3) Add veg + liquid; simmer tender; remove veg.
4) Add rinsed rice; cook through. Return fish + veg to warm.`
  },
  {
    id:'ethiopia-injera', country:'Ethiopia', dish:'Injera',
    note:'Sourdough flatbread made from teff; doubles as plate and utensil.',
    fact:'The “eyes” (bubbles) come from natural fermentation.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/9/96/Injera%2C_Ethiopian%27s_traditional_food.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/3/37/Injera%2C_Ethiopian_bread_made_from_teff_a_cereal_native_to_Ethiopia.JPG'
    ],
    recipe:`Injera (Ethiopia)
Makes 6–8

Ingredients
- 2 cups teff flour (or 70% teff + 30% all-purpose)
- 2½–3 cups water
- Pinch salt (and ¼ tsp yeast to kickstart, optional)

Instructions
1) Whisk teff + water; ferment 24–48 hrs.
2) Stir in salt; thin if needed.
3) Pour on hot pan; cover to steam 1–2 min. No flip.`
  },
  {
    id:'egypt-koshari', country:'Egypt', dish:'Koshari',
    note:'Rice, lentils, pasta, crispy onions, spiced tomato sauce.',
    fact:'Cosmopolitan: Italian pasta meets Middle Eastern flavors.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Egyptian_food_Koshary.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e4/Koshary.jpg'
    ],
    recipe:`Koshari (Egypt)
Serves 4–6

Ingredients
- 1 cup brown lentils
- 1 cup short pasta
- 1 cup rice
- 2 onions, thinly sliced
- 2 cups tomato sauce + 1 tbsp vinegar
- Garlic, cumin, coriander, chili flakes
- Oil, salt, pepper

Instructions
1) Fry onions deep golden; reserve oil.
2) Boil lentils; cook pasta; prepare rice.
3) Sauce: garlic + spices in reserved oil; add tomato + vinegar; simmer.
4) Layer rice, lentils, pasta; top with sauce + crispy onions.`
  },
  {
    id:'kenya-ugali', country:'Kenya', dish:'Ugali',
    note:'Stiff maize meal eaten with greens or stew.',
    fact:'Texture varies by region—soft to very firm for scooping.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Ugali_and_cabbage.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/63/Ugali%2C_the_staple_food_in_East_Africa.jpg'
    ],
    recipe:`Ugali (Kenya)
Serves 4

Ingredients
- 4 cups water
- 2 cups fine maize flour
- ½ tsp salt

Instructions
1) Boil water + salt.
2) Rain in maize flour; stir vigorously.
3) Cook and press until thick and pulls from sides (5–8 min).
4) Rest; shape and serve.`
  },
  {
    id:'southafrica-bobotie', country:'South Africa', dish:'Bobotie',
    note:'Curried mince baked with an egg custard top.',
    fact:'Cape Malay classic with Indonesian-Dutch spice influence.',
    images:[
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Bobotie_South_Africa.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f1/Bobotie%2C_South_African_dish.jpg'
    ],
    recipe:`Bobotie (South Africa)
Serves 6

Ingredients
- 1 lb ground beef or lamb
- 1 onion, chopped
- 1 tbsp curry powder + 1 tsp turmeric
- 2 slices bread soaked in ½ cup milk
- ¼ cup raisins (optional)
- 2 tbsp chutney or apricot jam
- 2 eggs + 1 cup milk (topping)
- Oil, salt & pepper

Instructions
1) Sauté onion; brown meat; add spices.
2) Mix in squeezed bread, raisins, chutney. Into baking dish.
3) Whisk eggs + milk; pour over.
4) Bake 350°F/175°C for 30–35 min until set and golden.`
  }
];

// ----- Helper functions -----
const $ = (sel, root=document) => root.querySelector(sel);

function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function randOne(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function formatTime(s){ const m = String(Math.floor(s/60)).padStart(2,'0'); const sec = String(s%60).padStart(2,'0'); return `${m}:${sec}`; }

// ----- Game state -----
let state = { deck:[], first:null, lock:false, found:0, moves:0, seconds:0, timer:null };

function buildDeck(){
  // choose one image per dish per game
  const chosen = DATA.map(d => ({...d, img: randOne(d.images)}));
  const deck = [];
  chosen.forEach(d => {
    const base = {pair:d.id, country:d.country, dish:d.dish, note:d.note, img:d.img};
    deck.push({...base, key:d.id+'-A'});
    deck.push({...base, key:d.id+'-B'});
  });
  return shuffle(deck);
}

function renderBoard(root=document){
  const grid = $('#grid', root);
  grid.innerHTML = '';
  state.deck.forEach(card => {
    const btn = document.createElement('button');
    btn.className='card';
    btn.setAttribute('aria-label','Card');
    btn.dataset.pair = card.pair;
    btn.dataset.key = card.key;

    const inner = document.createElement('div'); inner.className='inner';
    const front = document.createElement('div'); front.className='face front'; front.innerHTML = `<div class="glyph">Tap to Flip</div>`;
    const back = document.createElement('div'); back.className='face back';
    back.innerHTML = `
      <div class="photo"><img src="${card.img}" alt="${card.dish} — ${card.country}" loading="lazy"></div>
      <div>
        <div class="badge">Food × Country</div>
        <div class="country">${card.country}</div>
        <div class="dish">${card.dish}</div>
        <div class="note">${card.note}</div>
      </div>`;

    inner.appendChild(front); inner.appendChild(back); btn.appendChild(inner);
    btn.addEventListener('click', onFlip);
    grid.appendChild(btn);
  });
}

function onFlip(e){
  const card = e.currentTarget;
  if(state.lock || card.classList.contains('flipped')) return;
  card.classList.add('flipped');

  if(!state.first){
    state.first = card;
    if(state.moves===0 && state.found===0) startTimer();
    return;
  }

  state.moves++; $('#moves').textContent = state.moves;
  const a = state.first.dataset.pair; const b = card.dataset.pair;

  if(a===b){
    // match
    const pairData = DATA.find(d => d.id===a);
    setTimeout(()=>{
      state.first.classList.add('am-locked'); card.classList.add('am-locked');
      toast(`${pairData.dish} — ${pairData.country}: ${pairData.fact || ''}`);
      state.first = null; state.found++; $('#found').textContent = state.found; checkWin();
    }, 250);
  } } else {
  state.lock = true;
  setTimeout(() => {
    // Flip both cards back over
    card.classList.remove('flipped');
    state.first.classList.remove('flipped');
    state.first = null;
    
    // Gentle fade-out shuffle animation
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
  }, 900); // delay for visual feedback before flipping

  }
}

function checkWin(){
  if(state.found === DATA.length){
    stopTimer();
    $('#status').innerHTML = `🎉 Completed in <strong>${state.moves}</strong> moves • <strong>${formatTime(state.seconds)}</strong>`;
    // Unlock recipe drawer
    $('#drawer').classList.add('show');
    // Populate select
    const sel = $('#dishSelect');
    sel.innerHTML = DATA.map(d=>`<option value="${d.id}">${d.dish} — ${d.country}</option>`).join('');
    $('#recipeText').value = DATA[0].recipe;
  }
}

function startTimer(){
  clearInterval(state.timer); state.seconds=0; $('#time').textContent='00:00';
  state.timer = setInterval(()=>{ state.seconds++; $('#time').textContent = formatTime(state.seconds); }, 1000);
}
function stopTimer(){ clearInterval(state.timer); }

function toast(text){
  const t = $('#toast'); if(!t) return;
  t.textContent = text; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
}

// ----- Controls -----
function resetGame(root=document){
  state = { deck: buildDeck(), first:null, lock:false, found:0, moves:0, seconds:0, timer:null };
  renderBoard(root);
  $('#found').textContent='0'; $('#moves').textContent='0'; $('#time').textContent='00:00';
  $('#status').textContent = 'Pairs found: 0/8 • Moves: 0 • Time: 00:00';
  $('#drawer').classList.remove('show');
}

function wireRecipe(){
  const sel = $('#dishSelect'); const textarea = $('#recipeText');
  sel.addEventListener('change', e=>{
    const d = DATA.find(x=>x.id===e.target.value);
    textarea.value = d ? d.recipe : '';
  });
  $('#copyBtn').addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText(textarea.value);
      $('#copyBtn').textContent='Copied!'; setTimeout(()=> $('#copyBtn').textContent='Copy Recipe', 900);
    }catch{ textarea.select(); document.execCommand('copy'); }
  });
}

// Entry points for each page
function initShowcase(){
  // Landing button
  $('#playBtn').addEventListener('click', ()=>{
    document.getElementById('game').scrollIntoView({behavior:'smooth'});
  });
  // Game init
  resetGame(document);
  wireRecipe();
  // Buttons
  $('#restart').addEventListener('click', ()=> resetGame(document));
}

function initEmbed(){
  resetGame(document);
  wireRecipe();
  $('#restart').addEventListener('click', ()=> resetGame(document));
}

window.addEventListener('DOMContentLoaded', ()=>{
  const mode = document.body.getAttribute('data-mode');
  if(mode==='embed'){ initEmbed(); } else { initShowcase(); }
});
