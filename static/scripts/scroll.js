let scrollInterval;
let isScrolling = false;

// старт автоскролла
function startAutoScroll(speed = 1) {
    if (isScrolling) return; 

    isScrolling = true;
    const scrollStep = 1; // плавность 
    const intervalTime = 15; 

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
        e.preventDefault(); // блокает стандартное поведение пробела
        if (isScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll(2.5);
        }
    }
});

// автоскролл через 2 секунды после загрузки
window.addEventListener("load", () => {
    setTimeout(() => {
        startAutoScroll(1);
    }, 2000);
});
