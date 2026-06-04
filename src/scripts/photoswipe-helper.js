/**
 * Automatically updates pswp width/height attributes for gallery items 
 * based on their child images' natural dimensions to prevent stretching.
 * 
 * @param {string} gallerySelector CSS Selector for the gallery container
 */
export function initPhotoSwipeDimensions(gallerySelector) {
  const updateGalleryDimensions = () => {
    const links = document.querySelectorAll(`${gallerySelector} a`);
    console.log(links);
    links.forEach(link => {
      const img = link.querySelector('img');
      if (img) {
        if (img.width && img.height) {
            const aspect = img.width / img.height;
            const targetWidth = 2400;
            const targetHeight = Math.round(targetWidth / aspect);
            link.setAttribute('data-pswp-width', targetWidth.toString());
            link.setAttribute('data-pswp-height', targetHeight.toString());
          }
      }
    });
  };

  updateGalleryDimensions();
  document.addEventListener('DOMContentLoaded', updateGalleryDimensions);
}
