function upClickFunction(e) {
  e.preventDefault();
  const fieldset = this.parentNode;
  const prevFieldset = fieldset.previousElementSibling;
  const form = fieldset.parentNode;

  // const elemSlug = button.id.split(" ").at(-1);
  // console.log(elemSlug);

  if (prevFieldset.nodeName == "FIELDSET") {
    form.insertBefore(fieldset, prevFieldset);
  }
}

function downClickFunction(e) {
  e.preventDefault();
  const fieldset = this.parentNode;
  const nextFieldset = fieldset.nextElementSibling;
  const form = fieldset.parentNode;

  // const elemSlug = button.id.split(" ").at(-1);
  // console.log(elemSlug);

  if (nextFieldset.nodeName == "FIELDSET") {
    form.insertBefore(nextFieldset, fieldset);
  }
}

const upElemBttns = document.querySelectorAll(".upElemBttn");
for (let button of upElemBttns) {
  button.addEventListener("click", upClickFunction);
}

const downElemBttns = document.querySelectorAll(".downElemBttn");
for (let button of downElemBttns) {
  button.addEventListener("click", downClickFunction);
}
