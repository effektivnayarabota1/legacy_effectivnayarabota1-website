const button = document.querySelector(".element-reorder");

console.log(button);

button.addEventListener("click", reorderElements);

function reorderElements(e) {
  e.preventDefault();
  const form = this.parentNode.parentNode;
  const elements = form.querySelectorAll("fieldset");
  let newOrder = [];
  for (let element of elements) {
    newOrder.push(element.id);
  }
  console.log(newOrder);
}
