import { createEl } from "../../utils/dom";

export function createProjectModal({
  onCancel,
  onSubmit,
  initialValues = {},
  titleText = "Create Project",
  submitText = "Create",
}) {
  const overlay = createEl("div", "projectModalOverlay", "modal-overlay");
  const modal = createEl("div", "projectModal", "modal");

  const title = createEl("h2", null, "modal-title");
  title.textContent = titleText;

  const form = createEl("form", "projectForm", "project-form");

  const nameLabel = createEl("label", null, "project-label");
  nameLabel.htmlFor = "projectName";
  nameLabel.textContent = "Project name";

  const nameInput = createEl("input", "projectName", "project-input");
  nameInput.name = "projectName";
  nameInput.type = "text";
  nameInput.required = true;
  nameInput.placeholder = "Enter project name";
  nameInput.value = initialValues.name ?? "";

  const descLabel = createEl("label", null, "project-label");
  descLabel.htmlFor = "projectDescription";
  descLabel.textContent = "Description";

  const descInput = createEl("textarea", "projectDescription", "project-textarea");
  descInput.name = "projectDescription";
  descInput.placeholder = "Optional description";
  descInput.value = initialValues.description ?? "";

  const errorText = createEl("p", null, "project-form-error");

  const actions = createEl("div", null, "modal-actions");

  const cancelBtn = createEl("button", null, "modal-cancel-btn");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";

  const submitBtn = createEl("button", null, "modal-submit-btn");
  submitBtn.type = "submit";
  submitBtn.textContent = submitText;

  actions.append(cancelBtn, submitBtn);
  form.append(nameLabel, nameInput, descLabel, descInput, errorText, actions);
  modal.append(title, form);
  overlay.append(modal);

  cancelBtn.addEventListener("click", () => onCancel?.());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) onCancel?.();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: nameInput.value.trim(),
      description: descInput.value.trim(),
    };

    const result = onSubmit?.(formData);

    if (result?.error) {
      errorText.textContent = result.error;
      return;
    }
  });

  queueMicrotask(() => nameInput.focus());
  return overlay;
}