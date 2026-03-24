import { createProjectModal } from "./createProjectModal";
import {
  createProjectObject,
  validateProject,
  addProject,
  getProjectById,
  updateProject,
  removeProject,
} from "./projects";
import { renameTaskProject, clearTaskProject } from "../tasks";
import { showView, appState, updateUI } from "../screenController";
import { renderProjectList } from "./projectNav";

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
      renderProjectList();

      modal.remove();
      selectProject(project.name);
    },
  });

  document.body.append(modal);
}

export function openEditProjectModal(projectId) {
  const existingProject = getProjectById(projectId);
  if (!existingProject) return;

  let modal;

  modal = createProjectModal({
    initialValues: {
      name: existingProject.name,
      description: existingProject.description,
    },
    titleText: "Edit Project",
    submitText: "Save",
    onCancel: () => {
      modal.remove();
    },
    onSubmit: (formData) => {
      const updatedProject = {
        ...existingProject,
        name: formData.name,
        description: formData.description,
      };

      const errors = validateProject(updatedProject, existingProject.id);
      if (errors.length > 0) {
        return { error: errors[0] };
      }

      const oldName = existingProject.name;

      updateProject(existingProject.id, {
        name: formData.name,
        description: formData.description,
      });

      if (oldName !== formData.name) {
        renameTaskProject(oldName, formData.name);

        if (appState.selectedProject === oldName) {
          appState.selectedProject = formData.name;
        }
      }

      modal.remove();
      renderProjectList();
      updateUI();
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

export function deleteProject(projectId) {
  const project = getProjectById(projectId);
  if (!project) return;

  clearTaskProject(project.name);
  removeProject(projectId);

  if (appState.selectedProject === project.name) {
    appState.selectedProject = null;
    appState.currentView = "day";
  }

  updateUI();
}