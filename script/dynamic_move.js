const upButtons = document.querySelectorAll(".dynamic_move-up");
const downButtons = document.querySelectorAll(".dynamic_move-down");

for (let button of upButtons) {
  button.addEventListener("click", moveElementUp);
}

for (let button of downButtons) {
  button.addEventListener("click", moveElementDown);
}

function moveElementUp(e) {
  e.preventDefault();
  const container = this.closest(".dynamic_container");

  const element = this.closest(".dynamic_element");
  const prevElement = element.previousElementSibling;

  if (prevElement && prevElement.className.includes("dynamic_element"))
    container.insertBefore(element, prevElement);
}

async function moveElementDown(e) {
  e.preventDefault();
  const container = this.closest(".dynamic_container");

  const element = this.closest(".dynamic_element");
  const nextElement = element.nextElementSibling;

  if (nextElement && nextElement.className.includes("dynamic_element"))
    container.insertBefore(nextElement, element);
}
