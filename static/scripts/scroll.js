let scrollInterval;
let isScrolling = false;

// старт автоскролла
function startAutoScroll(speed = 1.8) {
    if (isScrolling) return; 

    isScrolling = true;
    const scrollStep = 2; // шаг больше => быстрее прокрутка
    const intervalTime = 12; // чуть быстрее обновления

    scrollInterval = setInterval(() => {
        window.scrollBy(0, scrollStep * speed);

        // Остановка на самом низу
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            stopAutoScroll();
        }
    }, intervalTime);
}

// остановка автоскролла
function stopAutoScroll() {
    clearInterval(scrollInterval);
    isScrolling = false;
}

// Отслеживаем нажатие пробела
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        if (isScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll(2); // ручной запуск чуть быстрее
        }
    }
});

// автоскролл через 2 секунды после загрузки
window.addEventListener("load", () => {
    setTimeout(() => {
        startAutoScroll(1.8); // автозапуск чуть медленнее
    }, 2000);
});