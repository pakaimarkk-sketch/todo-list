import { createEl } from "../../utils/dom";
import { notesState } from "./notesStates";

export function createNotesView() {
    const wrapper = createEl("div", "notesView", "notes-view");

    const sidebar = createEl("aside", null, "notes-sidebar");

    const sidebarHeader = createEl("div", null, "notes-sidebar-header");
    const title = createEl("h2", null, "notes-title");
    title.textContent = "Notes";

    const addBtn = createEl("button", "addNoteBtn", "add-note-btn");
    addBtn.type = "button";
    addBtn.textContent = "Add Note";

    sidebarHeader.append(title, addBtn);

    const controls = createEl("div", null, "notes-controls");

    const searchInput = createEl("input", "noteSearch", "notes-search");
    searchInput.type = "search";
    searchInput.name = "noteSearch";
    searchInput.placeholder = "Search notes...";
    searchInput.value = notesState.searchTerm;

    const sortSelect = createEl("select", "noteSort", "notes-sort");
    sortSelect.name = "noteSort";

    const newestOption = createEl("option");
    newestOption.value = "newest";
    newestOption.textContent = "Newest";

    const oldestOption = createEl("option");
    oldestOption.value = "oldest";
    oldestOption.textContent = "Oldest";

    const azOption = createEl("option");
    azOption.value = "az";
    azOption.textContent = "A-Z";

    const zaOption = createEl("option");
    zaOption.value = "za";
    zaOption.textContent = "Z-A";

    sortSelect.append(newestOption, oldestOption, azOption, zaOption);
    sortSelect.value = notesState.sortBy;

    controls.append(searchInput, sortSelect);

    const notesList = createEl("div", "notesList", "notes-list");

    sidebar.append(sidebarHeader, controls, notesList);


    const viewer = createEl("section", null, "notes-viewer");

    const viewerHeader = createEl("div", null, "notes-viewer-header");
    const viewerTitle = createEl("h2", "selectedNoteTitle", "selected-note-title");
    viewerTitle.textContent = "Select a note";

    const viewerActions = createEl("div", null, "selected-note-actions");

    const primaryActionBtn = createEl("button", "primaryActionBtn", "note-action-btn");
    primaryActionBtn.type = "button";
    primaryActionBtn.textContent = "Edit";

    const deleteBtn = createEl("button", "deleteNoteBtn", "note-action-btn");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";

    viewerActions.append(primaryActionBtn, deleteBtn);
    viewerHeader.append(viewerTitle, viewerActions);

    const viewerMeta = createEl("p", "selectedNoteMeta", "selected-note-meta");
    viewerMeta.textContent = "No note selected";

    const viewerContent = createEl("div", "selectedNoteContent", "selected-note-content");
    viewerContent.textContent = "Choose a note from the left side.";

    viewer.append(viewerHeader, viewerMeta, viewerContent);

    wrapper.append(sidebar, viewer);

    return wrapper;
}