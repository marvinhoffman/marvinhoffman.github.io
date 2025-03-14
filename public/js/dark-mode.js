document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", currentTheme);

    toggleButton.textContent = currentTheme === "dark" ? "☀️" : "🌙";

    toggleButton.addEventListener("click", function () {
        let newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        toggleButton.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
});