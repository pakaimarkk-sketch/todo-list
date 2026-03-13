import { updateUI } from "./modules/screenController";
import { sidebarBtns } from "./modules/screenController";


import "./styles.css";


const init = () => {
    updateUI("today");
    sidebarBtns();

};




init();
