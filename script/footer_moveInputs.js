const UpButtons = document.querySelectorAll(".moveUpInputsBttn");
const DownButtons = document.querySelectorAll(".moveDownInputsBttn");

export const moveUp = function (e) {
  e.preventDefault();

  const linkContainer = this.parentNode;
  const fieldset = linkContainer.parentNode;

  const prevContainer = linkContainer.previousElementSibling;

  if (prevContainer.nodeName == "DIV") {
    fieldset.insertBefore(linkContainer, prevContainer);
  }
};

export const moveDown = function (e) {
  e.preventDefault();

  const linkContainer = this.parentNode;
  const fieldset = linkContainer.parentNode;

  const nextContainer = linkContainer.nextElementSibling;

  if (nextContainer.nodeName == "DIV") {
    fieldset.insertBefore(nextContainer, linkContainer);
  }
};

for (let button of UpButtons) {
  button.addEventListener("click", moveUp);
}

for (let button of DownButtons) {
  button.addEventListener("click", moveDown);
}
