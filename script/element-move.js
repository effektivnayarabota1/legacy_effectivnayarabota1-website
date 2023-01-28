const upButtons = document.querySelectorAll(".up-element");
const downButtons = document.querySelectorAll(".down-element");

for (let button of upButtons) {
  button.addEventListener("click", moveElementUp);
}

for (let button of downButtons) {
  button.addEventListener("click", moveElementDown);
}

function moveElementUp(e) {
  const regex = /element-container/gm;
  e.preventDefault();

  const elementContaiener = this.parentNode.parentNode.parentNode;
  const prevElementContainer = elementContaiener.previousElementSibling;
  const blockContainer = elementContaiener.parentNode;

  if (regex.exec(prevElementContainer.className)) {
    blockContainer.insertBefore(elementContaiener, prevElementContainer);
  }
}

async function moveElementDown(e) {
  const regex = /element-container/gm;
  e.preventDefault();

  const elementContaiener = this.parentNode.parentNode.parentNode;
  const nextElementContainer = elementContaiener.nextElementSibling;
  const blockContainer = elementContaiener.parentNode;

  if (!!nextElementContainer && regex.exec(nextElementContainer.className)) {
    blockContainer.insertBefore(nextElementContainer, elementContaiener);
  }
}
