const upButtons = document.querySelectorAll(".element-move-up");
const downButtons = document.querySelectorAll(".element-move-down");

for (let button of upButtons) {
  button.addEventListener("click", moveElementUp);
}

for (let button of downButtons) {
  button.addEventListener("click", moveElementDown);
}

function moveElementUp(e) {
  e.preventDefault();
  const form = this.closest("form");

  const elementContainer = this.closest(".element-container");
  const prevElementContainer = elementContainer.previousElementSibling;

  if (
    prevElementContainer &&
    prevElementContainer.className.includes("element-container") &&
    !prevElementContainer.className.includes("pages_button-container")
  )
    form.insertBefore(elementContainer, prevElementContainer);
}

async function moveElementDown(e) {
  e.preventDefault();
  const form = this.closest("form");

  const elementContainer = this.closest(".element-container");
  const nextElementContainer = elementContainer.nextElementSibling;

  if (
    nextElementContainer &&
    nextElementContainer.className.includes("element-container") &&
    !nextElementContainer.className.includes("pages_button-container")
  )
    form.insertBefore(nextElementContainer, elementContainer);
}
