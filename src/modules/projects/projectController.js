import { createProjectModal } from "./createProjectModal";

import {
  createProjectObject,
  validateProject,
  addProject,
} from "./projects";

import { showView, appState, } from "../screenController";

export function selectProject(projectName) {
  appState.selectedProject = projectName;
  showView("project");
}

export function openProjectModal() {
  let modal;

  modal = createProjectModal({
    onCancel: () => {
      modal.remove();
    },

    onSubmit: (formData) => {
      const project = createProjectObject(formData);
      const errors = validateProject(project);

      if (errors.length > 0) {
        return { error: errors[0] };
      }

      addProject(project);

      modal.remove();
      selectProject(project.name);
    },
  });

  document.body.append(modal);
}

let addProjectBound = false;

export function bindAddProjectButton() {
  if (addProjectBound) return;

  const addProjects = document.getElementById("addProjects");
  if (!addProjects) return;

  addProjects.addEventListener("click", openProjectModal);
  addProjectBound = true;
}


