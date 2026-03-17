import { updateUI } from "./modules/screenController";
import { sidebarBtns } from "./modules/screenController";
import { showView } from "./modules/screenController";
import "./styles.css";

const init = () => {
    sidebarBtns();
    showView("day")
};

init();
