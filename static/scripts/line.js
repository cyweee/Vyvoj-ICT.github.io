document.addEventListener("DOMContentLoaded", function () {
    // Создаем div для линии
    const divider = document.createElement("div");
    divider.classList.add("divider");

    // Добавляем стили для линии
    divider.style.width = "80%"; // Линия будет 80% ширины контейнера
    divider.style.height = "2px"; // Толщина линии
    divider.style.backgroundColor = "#FFFFFF"; // Цвет линии
    divider.style.margin = "20px auto"; // Отступы сверху и снизу, центрируем
    divider.style.opacity = "0.7"; // Линия сразу видимая
    divider.style.transition = "none"; // Убираем анимацию

    // Находим элементы, после которых будет вставлена линия
    const timelineSection = document.getElementById("timeline");
    const funfactsSection = document.getElementById("fun-facts");

    // Вставляем линию после секции timeline, если она найдена
    if (timelineSection) {
        timelineSection.insertAdjacentElement("afterend", divider.cloneNode(true));
    }

    // Вставляем линию после секции Důležité osobnosti, если она найдена
    if (funfactsSection) {
        funfactsSection.insertAdjacentElement("afterend", divider.cloneNode(true));
    }
});
