document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.glitch');
    
    // Функция для случайных помех
    function triggerGlitch() {
      title.style.animation = 'none';
      void title.offsetWidth; // Триггер reflow
      title.style.animation = 'glitch-blink 0.3s 2';
      
      // Следующая помеха через случайный интервал (2-5 сек)
      setTimeout(triggerGlitch, 2000 + Math.random() * 3000);
    }
    
    // Первая помеха через 3 секунды
    setTimeout(triggerGlitch, 3000);
  });

// Появление при скролле
function checkMessageVisibility() {
    const message = document.querySelector('.matrix-end-message');
    const rect = message.getBoundingClientRect();
    
    if (rect.top < window.innerHeight - 100) {
      message.classList.add('show');
      window.removeEventListener('scroll', checkMessageVisibility);
    }
  }
  
  // Запускаем проверку через 1 сек после загрузки
  setTimeout(() => {
    window.addEventListener('scroll', checkMessageVisibility);
    checkMessageVisibility(); // Проверить сразу
  }, 1000);