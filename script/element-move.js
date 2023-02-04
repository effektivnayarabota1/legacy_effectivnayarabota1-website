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
  console.log("up");

  const form = this.closest("form");

  const elementContainer = this.closest(".element-container");
  const prevElementContainer = elementContainer.previousElementSibling;

  if (prevElementContainer && prevElementContainer.nodeName == "FIELDSET")
    form.insertBefore(elementContainer, prevElementContainer);
}

async function moveElementDown(e) {
  e.preventDefault();
  const form = this.closest("form");

  const elementContainer = this.closest(".element-container");
  const nextElementContainer = elementContainer.nextElementSibling;

  if (nextElementContainer && nextElementContainer.nodeName == "FIELDSET")
    form.insertBefore(nextElementContainer, elementContainer);
}
