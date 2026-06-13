const songs = [
  { src: "https://media.auyenwedding.com/music/song1.mp3" },
  { src: "https://media.auyenwedding.com/music/song2.mp3" },
  { src: "https://media.auyenwedding.com/music/song3.mp3" }
];

let currentIndex = Math.floor(Math.random() * songs.length) ;
let isPlaying = false;
let audio = null;
let noteInterval = null;

export function initMusicPlayer() {
  const container = document.getElementById('wedding-music-player');
  const vinylWrapper = document.getElementById('vinyl-toggle-wrapper');

  if (!container || !vinylWrapper) {
    return;
  }

  audio = new Audio();
  audio.crossOrigin = "anonymous";
  audio.src = songs[currentIndex].src;
  audio.volume = 0.5;

  audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    audio.src = songs[currentIndex].src;
    playTrack();
  });

  function playTrack() {
    audio.play().then(() => {
      isPlaying = true;
      container.classList.remove('is-paused');
      container.classList.add('is-playing');
      startNoteSpawner();
    }).catch(() => {
      isPlaying = false;
      container.classList.remove('is-playing');
      container.classList.add('is-paused');
    });
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    container.classList.remove('is-playing');
    container.classList.add('is-paused');
    stopNoteSpawner();
  }

  function togglePlay() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }


  function startNoteSpawner() {
    if (noteInterval) return;
    noteInterval = setInterval(spawnNote, 250);
  }

  function stopNoteSpawner() {
    if (noteInterval) {
      clearInterval(noteInterval);
      noteInterval = null;
    }
  }

  function spawnNote() {
    const items = ['♪', '♫', '♩', '♬', '❤', '♥', '💖', '💕'];
    const colors = ['#d4af37', '#f5f5dc', '#ffb6c1', '#ff4d6d', '#ffb5a7', '#ffd166', '#ff85a1'];
    const note = document.createElement('span');
    note.className = 'floating-note';
    note.textContent = items[Math.floor(Math.random() * items.length)];

    const rect = vinylWrapper.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const xOffset = (Math.random() * 120 - 60) + 'px';
    const rotation = (Math.random() * 180 - 90) + 'deg';
    const fontSize = (Math.floor(Math.random() * 10) + 12) + 'px';
    const duration = (Math.random() * 1.2 + 1.8) + 's';
    const delay = (Math.random() * 0.2) + 's';

    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    note.style.color = colors[Math.floor(Math.random() * colors.length)];
    note.style.fontSize = fontSize;
    note.style.animationDuration = duration;
    note.style.animationDelay = delay;
    note.style.setProperty('--x-offset', xOffset);
    note.style.setProperty('--rotation', rotation);

    document.body.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, 3200);
  }

  document.addEventListener('click', (event) => {
    if (container.classList.contains('is-expanded') && !container.contains(event.target)) {
      container.classList.remove('is-expanded');
    }
  });

  vinylWrapper.addEventListener('click', togglePlay);

  window.addEventListener('play-wedding-music', () => {
    if (!isPlaying) {
      playTrack();
    }
  });
}
