/**
 * YKS Geri Sayım - Countdown Script
 * Dinamik renk geçişli sayaç sistemi + particles.js arka plan
 */

// YKS 2026 sınav tarihleri
const TYT_DATE = new Date('2026-06-20T10:15:00+03:00');
const AYT_DATE = new Date('2026-06-21T10:15:00+03:00');

// Maksimum gün sayısı (365 günden başlayarak)
const MAX_DAYS = 365;

/**
 * Renk hesaplama: 365 gün = yeşil, 0 gün = kırmızı
 * HSL renk uzayında: Yeşil = 120°, Kırmızı = 0°
 */
function calculateColor(days) {
  // 0-365 arası değeri 0-1 arasına normalize et
  const ratio = Math.min(days / MAX_DAYS, 1);
  
  // Hue: 0 (kırmızı) ile 120 (yeşil) arası
  const hue = ratio * 120;
  
  return {
    hue: hue,
    gradient: `linear-gradient(135deg, hsl(${hue}, 80%, 55%), hsl(${hue + 20}, 90%, 45%))`,
    shadow: `hsla(${hue}, 80%, 55%, 0.4)`
  };
}

/**
 * Sayaçları başlatır
 */
function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/**
 * Tüm sayaçları güncelleyen ana fonksiyon
 */
function updateCountdown() {
  const now = new Date();
  
  updateSpecificCountdown(
    TYT_DATE - now,
    'days', 'hours', 'minutes', 'seconds'
  );
  
  updateSpecificCountdown(
    AYT_DATE - now,
    'ayt-days', 'ayt-hours', 'ayt-minutes', 'ayt-seconds'
  );
}

/**
 * Belirli bir sayacı güncelleyen yardımcı fonksiyon
 */
function updateSpecificCountdown(timeDiff, daysId, hoursId, minutesId, secondsId) {
  const daysElement = document.getElementById(daysId);
  const hoursElement = document.getElementById(hoursId);
  const minutesElement = document.getElementById(minutesId);
  const secondsElement = document.getElementById(secondsId);
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }
  
  if (timeDiff <= 0) {
    daysElement.textContent = '0';
    hoursElement.textContent = '0';
    minutesElement.textContent = '0';
    secondsElement.textContent = '0';
    
    // Süre doldu - kırmızı
    applyColor([daysId, hoursId, minutesId, secondsId], 0);
  } else {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    
    // Dinamik renk uygula
    applyColor([daysId, hoursId, minutesId, secondsId], days);
  }
}

/**
 * Renk uygula
 */
function applyColor(elementIds, days) {
  const color = calculateColor(days);
  
  elementIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const item = el.closest('.countdown-item');
      if (item) {
        item.style.background = color.gradient;
        item.style.boxShadow = `0 10px 30px ${color.shadow}, inset 0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px ${color.shadow}`;
      }
    }
  });
}

/**
 * Particles.js arka plan başlatır
 */
function initParticles() {
  if (typeof particlesJS === 'undefined') {
    // particles.js not loaded yet, wait and retry
    setTimeout(initParticles, 100);
    return;
  }
  
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ['#b721ff', '#4facfe', '#00f260'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1 }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5 }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#8a2be2',
        opacity: 0.4
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        out_mode: 'out'
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'bubble' },
        onclick: { enable: true, mode: 'push' }
      },
      modes: {
        bubble: { distance: 150, size: 6, duration: 2 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

/**
 * Arka plan animasyonu ekle
 */
function initBackground() {
  const body = document.body;
  if (!document.querySelector('.bg-animation')) {
    const bg = document.createElement('div');
    bg.className = 'bg-animation';
    bg.innerHTML = '<div class="bg-glow"></div>';
    body.insertBefore(bg, body.firstChild);
  }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
  initBackground();
  initParticles();
  initCountdown();
});
