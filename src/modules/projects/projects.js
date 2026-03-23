import { loadProjects, saveProjects } from "../storage";

let projects = loadProjects() ?? [];

export function getProjects() {
  return projects;
}

export function createProjectObject(data) {
  return {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    description: data.description.trim(),
    createdAt: Date.now(),
  };
}

export function validateProject(project) {
  const errors = [];

  if (!project.name) errors.push("Project name is required");

  const nameExists = projects.some(
    existing => existing.name.toLowerCase() === project.name.toLowerCase()
  );

  if (nameExists) errors.push("Project name already exists");

  return errors;
}

export function addProject(project) {
  projects.push(project);
  saveProjects(projects);
}

export function getProjectById(id) {
  return projects.find(project => project.id === id);
}

export function getProjectByName(name) {
  return projects.find(project => project.name === name);
}

export function removeProject(projectId) {
  const index = projects.findIndex((project) => project.id === projectId);

  if (index !== -1) {
    projects.splice(index, 1);
    saveProjects(projects);
  }
}