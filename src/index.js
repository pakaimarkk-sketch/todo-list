import { updateUI } from "./modules/screenController";
import { sidebarBtns } from "./modules/screenController";
import { createForm } from "./components/createView";

import "./styles.css";


const init = () => {
    updateUI("today");
    bindNavEvents();

};

const bindNavEvents = () => {
    const todayBtn = document.getElementById("today");
    const projectBtn = document.getElementById("project1");

    todayBtn.addEventListener("click", () => updateUI("today"));
    projectBtn.addEventListener("click", () => updateUI("project"));
};



init();
