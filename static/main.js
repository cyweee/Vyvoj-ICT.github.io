document.addEventListener("DOMContentLoaded", function () {
    const events = document.querySelectorAll(".event");

    events.forEach(event => {
        event.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
});
