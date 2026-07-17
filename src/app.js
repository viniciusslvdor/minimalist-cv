import { buildHeader } from "./components/header.js";
import { buildAbout } from "./components/about.js";
import { buildSkills } from "./components/skills.js";
import { buildExperience } from "./components/experience.js";
import { buildEducation } from "./components/education.js";
import { buildProjects } from "./components/projects.js";
import { buildFooter } from "./components/footer.js";

(function () {
  "use strict";

  const root = document.getElementById("cv");
  const d = CV;
  const storedTheme = localStorage.getItem("cv-theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const initialTheme = "light";

  document.body.setAttribute("data-theme", initialTheme);
  document.title = "Minimalist CV";

  const themeToggle = document.getElementById("theme-switch");

  function setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    document.body.classList.toggle("darkmode", theme === "dark");
    localStorage.setItem("cv-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  setTheme(initialTheme);

  const parts = [
    buildHeader(d),
    buildAbout(d),
    buildSkills(d),
    buildExperience(d),
    buildEducation(d),
    buildProjects(d),
    buildFooter(d),
  ];

  for (const part of parts) {
    if (part) root.appendChild(part);
  }
})();
