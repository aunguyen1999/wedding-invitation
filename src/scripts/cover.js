export function initCover() {
  const cover = document.getElementById('wedding-cover');

  document.body.style.overflow = 'hidden';

  function openInvitation() {
    if (cover && !cover.classList.contains('is-dismissed')) {
      cover.classList.add('is-dismissed');
      document.body.style.overflow = 'auto';
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('play-wedding-music'));
      setTimeout(() => {
        cover.style.display = 'none';
      }, 1200);
    }
  }

  cover?.addEventListener('click', openInvitation);

  cover?.addEventListener('touchmove', (e) => {
    if (!cover.classList.contains('is-dismissed')) {
      e.preventDefault();
    }
  }, { passive: false });
}
