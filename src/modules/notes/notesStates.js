export const notesState = {
  viewerMode: "empty",
  selectedNoteId: null,
  searchTerm: "",
  sortBy: "updated",
};

export const notesStates = {
  empty: {
    showForm: false,
    requiresSelectedNote: false,
    primaryAction: null,
    showDelete: false,
    prefillFromSelected: false,
  },
  create: {
    showForm: true,
    requiresSelectedNote: false,
    primaryAction: "Save",
    showDelete: false,
    prefillFromSelected: false,
  },
  read: {
    showForm: false,
    requiresSelectedNote: true,
    primaryAction: "Edit",
    showDelete: true,
    prefillFromSelected: false,
  },
  edit: {
    showForm: true,
    requiresSelectedNote: true,
    primaryAction: "Save",
    showDelete: true,
    prefillFromSelected: true,
  },
};

export function getCurrentNoteMode() {
  return notesStates[notesState.viewerMode];
}

