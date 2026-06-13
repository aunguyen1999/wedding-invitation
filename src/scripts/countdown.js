export function initCountdown() {
  const countdownSection = document.querySelector('.countdown-section');
  if (!countdownSection) return;

  const targetDateStr = countdownSection.getAttribute('data-target');
  if (!targetDateStr) return;

  // Set the date we're counting down to
  const targetDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  let intervalId;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(intervalId);
      
      const container = document.querySelector('.countdown-container');
      if (container) container.style.display = 'none';
      
      const titleEl = document.querySelector('.countdown-title');
      if (titleEl) {
        titleEl.innerText = "Lễ cưới đã diễn ra thành công. Chân thành cảm ơn bạn!";
        titleEl.style.marginBottom = '0';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    function updateValue(el, val) {
      if (!el) return;
      const strVal = val.toString().padStart(2, '0');
      if (el.innerText !== strVal) {
        el.innerText = strVal;
        el.classList.add('tick');
        setTimeout(() => el.classList.remove('tick'), 200);
      }
    }

    updateValue(daysEl, days);
    updateValue(hoursEl, hours);
    updateValue(minsEl, mins);
    updateValue(secsEl, secs);
  }

  // Initial call
  update();
  
  // Update every second
  intervalId = setInterval(update, 1000);
}

// Initialize on DOMContentLoaded and Astro swap
document.addEventListener('DOMContentLoaded', initCountdown);
document.addEventListener('astro:page-load', initCountdown);
