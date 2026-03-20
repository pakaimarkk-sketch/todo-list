import { createProjectModal } from "./createProjectModal";

import {
  createProjectObject,
  validateProject,
  addProject,
} from "./projects";

import { showView, appState, updateUI } from "../screenController";

export function openProjectModal() {
  let modal;

  modal = createProjectModal({
    onCancel: () => {
      modal.remove();
    },

    onSubmit: formData => {
      const project = createProjectObject(formData);
      const errors = validateProject(project);

      if (errors.length > 0) {
        return { error: errors[0] };
      }

      addProject(project);

      appState.selectedProject = project.name;
      appState.currentView = "day";

      modal.remove();
      showView("day");
      updateUI();
    },
  });

  document.body.append(modal);
}