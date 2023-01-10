const UpButtons = document.querySelectorAll(".upElemBttn");
const DownButtons = document.querySelectorAll(".downElemBttn");

export const moveUp = function (e) {
  e.preventDefault();

  const fieldset = this.parentNode;
  const parent = fieldset.parentNode;

  const prevContainer = fieldset.previousElementSibling;

  if (prevContainer.nodeName == "FIELDSET") {
    parent.insertBefore(fieldset, prevContainer);
  }
};

export const moveDown = function (e) {
  e.preventDefault();

  const fieldset = this.parentNode;
  const parent = fieldset.parentNode;

  const nextContainer = fieldset.nextElementSibling;

  if (nextContainer.nodeName == "FIELDSET") {
    parent.insertBefore(nextContainer, fieldset);
  }
};

for (let button of UpButtons) {
  button.addEventListener("click", moveUp);
}

for (let button of DownButtons) {
  button.addEventListener("click", moveDown);
}
