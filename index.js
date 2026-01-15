const me = document.getElementById("me");
const tux = document.getElementById("tux");

// Show tux on name click
const showTux = () => {
  tux.classList.toggle("show");
};

me.addEventListener("click", showTux);

document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
