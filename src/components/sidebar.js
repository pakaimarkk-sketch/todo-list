export const sidebarBtns = () => {
    const navbar = document.getElementById("navbar")
    
    navbar.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            const view = e.target.id;
            updateUI(viewID)
        }
    });
}