document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 3000, // Длительность анимации (1 секунда)
        once: true      // Анимация проигрывается только один раз
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const sectionTitle = document.querySelector(".section-title");

    function revealTitle() {
        const rect = sectionTitle.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            sectionTitle.classList.add("show");
            window.removeEventListener("scroll", revealTitle); // Чтобы сработало 1 раз
        }
    }

    window.addEventListener("scroll", revealTitle);
    revealTitle(); // Проверяем при загрузке
});



document.addEventListener("DOMContentLoaded", () => {
    // Наблюдатель для анимации появления карточек
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.5,
    });

    // Выбираем карточки и следим за ними
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => observer.observe(card));
});

