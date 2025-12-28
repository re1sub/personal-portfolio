const projectsContainer = document.querySelector(".projects");

// Theme toggle functionality
const initThemeToggle = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
};

const populateProjects = async () => {
  const projectsSection = document.getElementById("projects-section");

  projectsContainer.innerHTML = "";

  try {
    const response = await fetch("./projects.json");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const projects = await response.json();

    projects.forEach((project) => {
      projectsContainer.innerHTML +=
        /* HTML */
        `
          <article class="project-card" id="${project.id}">
            <a
              href="${project.url}"
              target="_blank"
              rel="nofollow"
              class="project-link"
            >
              <img src="${project.logo_url}" width="40" height="40" />
              <div>
                <h3>${project.name}</h3>
                <span class="link-with-icon"
                  >${project.url.replace("https://", "")}<i
                    data-lucide="external-link"
                  ></i
                ></span>
              </div>
            </a>
            <p>${project.description}</p>
          </article>
        `;
    });

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    projectsContainer.innerHTML = "Error fetching projects";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Fallback for when lucide is not loaded
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  initThemeToggle();
  populateProjects();
});
