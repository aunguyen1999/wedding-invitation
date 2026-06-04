const songs = [
  {
    title: "Beautiful In White",
    artist: "Shane Filan",
    src: "/music/song1.mp3"
  },
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    src: "/music/song2.mp3"
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "/music/song3.mp3"
  }
];

let currentIndex = 0;
let isPlaying = false;
let audio = null;
let noteInterval = null;

export function initMusicPlayer() {
  const container = document.getElementById('wedding-music-player');
  const vinylWrapper = document.getElementById('vinyl-toggle-wrapper');
  const playPauseBtn = document.getElementById('music-play-pause-btn');
  const nextBtn = document.getElementById('music-next-btn');
  const titleEl = document.getElementById('music-track-title');
  const artistEl = document.getElementById('music-track-artist');

  if (!container || !vinylWrapper || !playPauseBtn || !nextBtn || !titleEl || !artistEl) {
    return;
  }

  audio = new Audio();
  audio.src = songs[currentIndex].src;
  audio.volume = 0.5;

  updateTrackDisplay();

  function updateTrackDisplay() {
    titleEl.textContent = songs[currentIndex].title;
    artistEl.textContent = songs[currentIndex].artist;
  }

  function playTrack() {
    audio.play().then(() => {
      isPlaying = true;
      container.classList.remove('is-paused');
      container.classList.add('is-playing');
      updatePlayPauseIcon(true);
      startNoteSpawner();
    }).catch(() => {
      isPlaying = false;
      container.classList.remove('is-playing');
      container.classList.add('is-paused');
      updatePlayPauseIcon(false);
    });
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    container.classList.remove('is-playing');
    container.classList.add('is-paused');
    updatePlayPauseIcon(false);
    stopNoteSpawner();
  }

  function togglePlay() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  function playNext() {
    currentIndex = (currentIndex + 1) % songs.length;
    audio.src = songs[currentIndex].src;
    updateTrackDisplay();
    playTrack();
  }

  function updatePlayPauseIcon(playing) {
    const playSvg = playPauseBtn.querySelector('.play-svg');
    const pauseSvg = playPauseBtn.querySelector('.pause-svg');
    if (playing) {
      playSvg.style.display = 'none';
      pauseSvg.style.display = 'block';
    } else {
      playSvg.style.display = 'block';
      pauseSvg.style.display = 'none';
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

  function handleVinylClick(event) {
    event.stopPropagation();
    container.classList.toggle('is-expanded');
  }

  document.addEventListener('click', (event) => {
    if (container.classList.contains('is-expanded') && !container.contains(event.target)) {
      container.classList.remove('is-expanded');
    }
  });

  vinylWrapper.addEventListener('click', handleVinylClick);
  playPauseBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', playNext);
  audio.addEventListener('ended', playNext);

  window.addEventListener('play-wedding-music', () => {
    if (!isPlaying) {
      playTrack();
    }
  });
}
