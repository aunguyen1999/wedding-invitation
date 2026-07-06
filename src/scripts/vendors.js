export function initVendorSlider() {
  const track = document.querySelector('.brand-slider-track');
  if (!track) return;
  
  const originalItems = Array.from(track.querySelectorAll('.brand-item'));
  if (!originalItems.length) return;

  // 1. Clone items to create [Copy 1] [Original] [Copy 2] for infinite loop
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone); // Append Copy 2
  });
  
  originalItems.reverse().forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.insertBefore(clone, track.firstChild); // Prepend Copy 1
  });

  const allItems = track.querySelectorAll('.brand-item');
  const itemsPerSet = originalItems.length;

  // Intersection Observer for highlighting the center item
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    root: track,
    rootMargin: '0px -49% 0px -49%',
    threshold: 0
  });

  allItems.forEach(item => observer.observe(item));

  let isDown = false;
  let isDragging = false;
  let startX;
  let scrollLeft;
  let autoScrollInterval;
  let isJumping = false;
  
  // Calculate width of one full set of original items
  const getSetWidth = () => {
    const first = allItems[0];
    const lastOfSet = allItems[itemsPerSet - 1];
    // Distance from start of first item to end of last item in the set
    return (lastOfSet.offsetLeft + lastOfSet.offsetWidth) - first.offsetLeft + 32; // 32 is gap
  };

  // Set initial scroll to the middle set (Original)
  setTimeout(() => {
    track.scrollBehavior = 'auto';
    track.scrollLeft = getSetWidth();
    track.scrollBehavior = 'smooth';
  }, 100);

  const handleInfiniteScroll = () => {
    if (isJumping) return;
    const setWidth = getSetWidth();
    
    // If scrolled too far left (into Copy 1), jump forward to Original
    if (track.scrollLeft <= setWidth * 0.5) {
      isJumping = true;
      track.style.scrollBehavior = 'auto';
      track.style.scrollSnapType = 'none';
      track.scrollLeft += setWidth;
      
      // Allow browser to render jump before restoring smooth scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.scrollBehavior = '';
          track.style.scrollSnapType = '';
          isJumping = false;
        });
      });
    }
    // If scrolled too far right (into Copy 2), jump backward to Original
    else if (track.scrollLeft >= setWidth * 1.5) {
      isJumping = true;
      track.style.scrollBehavior = 'auto';
      track.style.scrollSnapType = 'none';
      track.scrollLeft -= setWidth;
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.scrollBehavior = '';
          track.style.scrollSnapType = '';
          isJumping = false;
        });
      });
    }
  };

  track.addEventListener('scroll', handleInfiniteScroll, { passive: true });

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
      if (!isDown && !isJumping) {
        const itemWidth = allItems[0].offsetWidth;
        track.scrollBy({ left: itemWidth, behavior: 'smooth' }); 
      }
    }, 1500); 
  };

  const stopAutoScroll = () => clearInterval(autoScrollInterval);

  // Mouse drag logic
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    track.style.cursor = 'grabbing';
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    stopAutoScroll();
  });

  const finishDrag = () => {
    if (!isDown) return;
    isDown = false;
    track.style.cursor = '';
    track.style.scrollSnapType = ''; 
    track.style.scrollBehavior = '';
    startAutoScroll();
  };

  track.addEventListener('mouseleave', finishDrag);
  track.addEventListener('mouseup', finishDrag);

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Prevent click on links if dragging
  track.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  });

  // Touch events for pausing auto scroll
  track.addEventListener('touchstart', stopAutoScroll, {passive: true});
  track.addEventListener('touchend', startAutoScroll, {passive: true});

  startAutoScroll();
}
