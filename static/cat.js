document.addEventListener("DOMContentLoaded", function () {
    const numKitties = 100; // Количество котиков
    const kittySize = 35; // Размер котика
    const kittySrc = "static/img/github-svgrepo-com.svg"; // Путь к изображению
    const minDistance = 60; // Минимальное расстояние между котиками
    const moveAmount = 30; // Насколько котики будут двигаться

    let positions = []; // Список занятых мест

    let bgContainer = document.createElement("div");
    bgContainer.classList.add("kitty-container");
    document.body.appendChild(bgContainer);

    let kitties = [];

    for (let i = 0; i < numKitties; i++) {
        let attempts = 0;
        let maxAttempts = 50;

        let x, y, validPosition;

        do {
            validPosition = true;
            x = Math.random() * (window.innerWidth - kittySize);
            y = Math.random() * (window.innerHeight - kittySize);

            for (let pos of positions) {
                let dx = pos.x - x;
                let dy = pos.y - y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }

            attempts++;
        } while (!validPosition && attempts < maxAttempts);

        if (!validPosition) continue;

        positions.push({ x, y });

        let kitty = document.createElement("img");
        kitty.src = kittySrc;
        kitty.classList.add("kitty");
        kitty.style.left = x + "px";
        kitty.style.top = y + "px";

        bgContainer.appendChild(kitty);
        kitties.push(kitty);
    }

    // Функция для анимации котиков
    function animateKitties() {
        kitties.forEach(kitty => {
            let dx = (Math.random() - 0.5) * moveAmount; // Смещение по X
            let dy = (Math.random() - 0.5) * moveAmount; // Смещение по Y

            // Применяем движение
            kitty.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        setTimeout(animateKitties, 2000); // Повторяем каждые 2 секунды
    }

    animateKitties(); // Запускаем анимацию
});
