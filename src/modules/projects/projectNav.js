import { getProjects } from "./projects";
import { selectProject } from "./projectController";

export function renderProjectButtons() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.innerHTML = "";

  const projects = getProjects();

  projects.forEach((project) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "btn-secondary", "project-nav-btn");
    button.dataset.projectName = project.name;
    button.textContent = project.name;

    container.appendChild(button);
  });
}

export function bindProjectNavButtons() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const button = e.target.closest(".project-nav-btn");
    if (!button) return;

    const projectName = button.dataset.projectName;
    if (!projectName) return;

    selectProject(projectName);
  });
}


