document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".event").forEach(event => {
        event.addEventListener("click", () => {
            let dropdown = event.querySelector(".dropdown");
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
    });

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            let content = card.querySelector(".card-content");
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
});
