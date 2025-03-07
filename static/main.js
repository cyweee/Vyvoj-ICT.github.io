document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 3000, // Длительность анимации (1 секунда)
        once: true      // Анимация проигрывается только один раз
    });
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

    // Эффект отталкивания карточек от курсора
    cards.forEach(card => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.05;
            card.style.transform = `translateX(${offsetX}px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
});
