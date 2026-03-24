import { bindAddProjectButton } from "./modules/projects/projectController";
import { bindProjectNavButtons, renderProjectList, } from "./modules/projects/projectNav";
import { sidebarBtns, showView, } from "./modules/screenController";
import "./styles.css";

const init = () => {
    sidebarBtns();
    showView("day");
    bindAddProjectButton();
    bindProjectNavButtons();
    renderProjectList();
};

init();
