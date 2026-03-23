import { bindAddProjectButton } from "./modules/projects/projectController";
import { bindProjectNavButtons, renderProjectButtons, } from "./modules/projects/projectNav";
import { sidebarBtns, showView, } from "./modules/screenController";
import "./styles.css";

const init = () => {
    sidebarBtns();
    showView("day");
    bindAddProjectButton();
    bindProjectNavButtons();
    renderProjectButtons();
};

init();
