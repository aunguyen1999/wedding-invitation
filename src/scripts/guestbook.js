import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, runTransaction } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wishesRef = ref(db, 'wishes');

const STORAGE_KEY = 'wedding_reactions';

function getMyReactions() {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

function saveMyReaction(wishId, type, isAdding) {
  const reactions = getMyReactions();
  if (!reactions[wishId]) reactions[wishId] = {};
  
  if (isAdding) {
    reactions[wishId][type] = true;
  } else {
    delete reactions[wishId][type];
    if (Object.keys(reactions[wishId]).length === 0) delete reactions[wishId];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
}

let allWishes = [];
let visibleCount = 6;

export function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  const listContainer = document.getElementById('wishes-list');
  const loadMoreBtn = document.getElementById('load-more-btn');

  loadMoreBtn?.addEventListener('click', () => {
    visibleCount += 6;
    renderWishes(allWishes, listContainer);
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('guest-name');
    const contentInput = document.getElementById('guest-content');
    if (!nameInput.value || !contentInput.value) return;

    await push(wishesRef, {
      name: nameInput.value,
      content: contentInput.value,
      timestamp: Date.now(),
      reactions: { heart: 0, flower: 0, beer: 0, ring: 0, party: 0 }
    });
    form.reset();
  });

  onValue(wishesRef, (snapshot) => {
    const data = snapshot.val();
    allWishes = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
    allWishes.sort((a, b) => b.timestamp - a.timestamp);
    renderWishes(allWishes, listContainer);
  });
}

function renderWishes(wishes, container) {
  if (!container) return;
  const loadMoreBtn = document.getElementById('load-more-btn');
  const myReactions = getMyReactions();
  const displayedWishes = wishes.slice(0, visibleCount);

  container.innerHTML = displayedWishes.map(wish => {
    const icons = { heart: '❤️', flower: '🌸', beer: '🍻', ring: '💍', party: '🎉' };
    const safeName = escapeHTML(wish.name);
    const safeContent = escapeHTML(wish.content);

    const buttonsHtml = Object.keys(icons).map(type => {
      const isActive = myReactions[wish.id] && myReactions[wish.id][type] ? 'active' : '';
      const count = wish.reactions ? (wish.reactions[type] || 0) : 0;
      
      return `
        <button 
          onclick="window.handleToggleReaction('${wish.id}', '${type}')" 
          class="reaction-btn ${isActive}"
          data-wish-id="${wish.id}"
          data-type="${type}"
        >
          <span>${icons[type]}</span> 
          <small>${count}</small>
        </button>`;
    }).join('');

    return `
      <div class="wish-card animate-fade-in">
        <div class="wish-header">
          <h4>${safeName}</h4>
          <span>${new Date(wish.timestamp).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</span>
        </div>
        <p>${safeContent}</p>
        <div class="reaction-group">
          ${buttonsHtml}
        </div>
      </div>
    `;
  }).join('');

  if (loadMoreBtn) {
    if (wishes.length > visibleCount) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  }
  
}

function escapeHTML(str) {
  if (!str) return "";
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

window.handleToggleReaction = async (wishId, type) => {
  const myReactions = getMyReactions();
  const isAlreadyReacted = !!(myReactions[wishId] && myReactions[wishId][type]);
  const reactionRef = ref(db, `wishes/${wishId}/reactions/${type}`);

  saveMyReaction(wishId, type, !isAlreadyReacted);
  const btn = document.querySelector(`button[data-wish-id="${wishId}"][data-type="${type}"]`);
  if (btn) {
    btn.classList.toggle('active', !isAlreadyReacted);
  }

  try {
    await runTransaction(reactionRef, (currentCount) => {
      if (isAlreadyReacted) {
        return (currentCount || 1) - 1;
      } else {
        return (currentCount || 0) + 1;
      }
    });
  } catch (error) {
    console.error("Transaction failed, reverting local state:", error);
    saveMyReaction(wishId, type, isAlreadyReacted);
  }
};