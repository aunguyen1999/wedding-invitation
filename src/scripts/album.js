import { initPhotoSwipeDimensions } from './photoswipe-helper.js';

export function initAlbum() {
  const gallery = document.querySelector('#wedding-gallery');
  if (!gallery) return;

  const initLightbox = async () => {
    // Dynamically import PhotoSwipe and its styles to avoid loading them on page load.
    // We import both Lightbox and Core in parallel so clicking a thumbnail is instant and
    // doesn't trigger additional dynamic import requests over the network.
    const [PhotoSwipeLightboxModule, _, PhotoSwipeModule] = await Promise.all([
      import('photoswipe/lightbox'),
      import('photoswipe/style.css'),
      import('photoswipe')
    ]);
    
    const PhotoSwipeLightbox = PhotoSwipeLightboxModule.default;
    const PhotoSwipe = PhotoSwipeModule.default;

    initPhotoSwipeDimensions('#wedding-gallery');

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#wedding-gallery',
      children: 'a',
      pswpModule: PhotoSwipe,
    });

    // Dynamically detect and update natural dimensions of images on load to prevent stretching
    // and allow zooming to the full high-res size instead of hardcoded/thumbnail limits.
    lightbox.on('contentLoad', ({ content }) => {
      if (content.type === 'image' && content.data) {
        const img = new Image();
        img.src = content.data.src;
        img.onload = () => {
          if (img.naturalWidth && img.naturalHeight) {
            content.data.w = img.naturalWidth;
            content.data.h = img.naturalHeight;
            if (lightbox.pswp) {
              lightbox.pswp.refreshSlideContent(content.index);
            }
          }
        };
      }
    });

    lightbox.init();
  };

  // Only initialize when the gallery is close to the viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initLightbox();
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    observer.observe(gallery);
  } else {
    // Fallback if IntersectionObserver is not supported
    initLightbox();
  }
}
