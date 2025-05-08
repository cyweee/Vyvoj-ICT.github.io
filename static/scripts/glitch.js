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