document.addEventListener("DOMContentLoaded", () => {
    // Инициализация AOS
    AOS.init({
        duration: 3000,
        once: false
    });

    // Плавное появление заголовка
    const sectionTitle = document.querySelector(".section-title");

    function revealTitle() {
        const rect = sectionTitle.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            sectionTitle.classList.add("show");
            window.removeEventListener("scroll", revealTitle);
        }
    }

    window.addEventListener("scroll", revealTitle);
    revealTitle(); // при загрузке

    document.addEventListener("DOMContentLoaded", () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(document.querySelectorAll(".card")).indexOf(card);
                    
                    // Добавляем класс с задержкой
                    card.classList.add("visible");
                    card.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, {
            threshold: 0.5,  // карточка появляется, когда минимум 50% её видимой части на экране
        });
    
        document.querySelectorAll(".card").forEach(card => {
            observer.observe(card);
        });
    });
})