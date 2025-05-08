document.addEventListener("DOMContentLoaded", () => {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-back'
    });

    // Анимация для карточек
    const cards = document.querySelectorAll('.card-pers');
    
    cards.forEach((card, index) => {
        // Начальное состояние (скрыто)
        card.style.opacity = '0';
        card.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s`;
        card.style.willChange = 'transform, opacity';
        
        // Разные направления анимации
        if (index < 2) { // Первая строка
            if (index % 2 === 0) {
                card.style.transform = 'translateX(-100px)';
            } else {
                card.style.transform = 'translateX(100px)';
            }
        } 
        else if (index < 4) { // Вторая строка
            if (index % 2 === 0) {
                card.style.transform = 'translateX(-100px)';
            } else {
                card.style.transform = 'translateX(100px)';
            }
        } 
        else { // Центральная карточка (5-я)
            card.style.transform = 'translateY(100px)';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = '1';
                card.style.transform = 'translateX(0) translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
});