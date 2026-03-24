import { getProjects, getProjectById} from "./projects";
import { selectProject, openEditProjectModal, deleteProject} from "./projectController";
import { createEl, createIconButton } from "../../utils/dom";

const editSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
  </svg>
`;

const deleteSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6l-1 14H6L5 6"></path>
    <path d="M10 11v6"></path>
    <path d="M14 11v6"></path>
    <path d="M9 6V4h6v2"></path>
  </svg>
`;

export function renderProjectList() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.innerHTML = "";

  const projects = getProjects();

  projects.forEach((project) => {
    const item = createEl("div", null, "project-item");

    const navButton = createEl("button", null, "btn", "btn-secondary", "project-nav-btn");
    navButton.type = "button";
    navButton.dataset.projectId = project.id;
    navButton.textContent = project.name;

    const editButton = createIconButton(
      "Edit project",
      editSvg,
      "iconBtn",
      "project-edit-btn"
    );
    editButton.dataset.projectId = project.id;

    const deleteButton = createIconButton(
      "Delete project",
      deleteSvg,
      "iconBtn",
      "project-delete-btn"
    );
    deleteButton.dataset.projectId = project.id;

    item.append(navButton, editButton, deleteButton);
    container.appendChild(item);
  });
}

export function bindProjectNavButtons() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const editButton = e.target.closest(".project-edit-btn");
    if (editButton) {
      const projectId = editButton.dataset.projectId;
      if (!projectId) return;

      openEditProjectModal(projectId);
      return;
    }

    const deleteButton = e.target.closest(".project-delete-btn");
    if (deleteButton) {
      const projectId = deleteButton.dataset.projectId;
      if (!projectId) return;

      deleteProject(projectId);
      renderProjectButtons();
      return;
    }

    const navButton = e.target.closest(".project-nav-btn");
    if (!navButton) return;

    const projectId = navButton.dataset.projectId;
    if (!projectId) return;

    const project = getProjectById(projectId);
    if (!project) return;

    selectProject(project.name);
  });
}


