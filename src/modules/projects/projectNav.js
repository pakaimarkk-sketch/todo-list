import { getProjects, getProjectById, removeProject } from "./projects";
import { selectProject } from "./projectController";
import { createEl, createIconButton } from "../../utils/dom";

export function renderProjectList() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.innerHTML = "";

  const projects = getProjects();

  projects.forEach((project) => {
    const item = createEl("div", null, "project-item");

    const navButton = createEl("button", null, "project-nav-btn");
    navButton.type = "button";
    navButton.dataset.projectId = project.id;
    navButton.textContent = project.name;

    const editButton = createIconButton(
    "Edit task",
    `
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M4 20h4l10.5-10.5a1.4 1.4 0 0 0 0-2L16.5 5.5a1.4 1.4 0 0 0-2 0L4 16v4z"></path>
    </svg>
    `,
    "iconBtn",
    "editBtn"
  );
    editButton.dataset.projectId = project.id;

    const deleteButton = createIconButton(
    "Delete task",
    `
    <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"></path>
    </svg>
    `,
    "iconBtn",
    "deleteBtn"
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
    const editBtn = e.target.closest(".project-edit-btn");
    if (editBtn) {
      const projectId = editBtn.dataset.projectId;

      return;
    }

    const deleteBtn = e.target.closest(".project-delete-btn");
    if (deleteBtn) {
      const projectId = deleteBtn.dataset.projectId;

      return;
    }

    const navBtn = e.target.closest(".project-nav-btn");
    if (navBtn) {
      const projectId = navBtn.dataset.projectId;

    }
});

}


