export const createEl = (tag, id = null, ...classes) => {
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (classes) el.classList.add(...classes);
    return el;
};

export const createIconButton = (label, svgMarkup, ...classes) => {
    const button = createEl("button", null, ...classes);
   button.type = "button";
   button.setAttribute("aria-label", label);
   button.innerHTML = svgMarkup;
   return button;
};