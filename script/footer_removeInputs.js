const buttons = document.querySelectorAll(".removeInputsBttn");

for (let button of buttons) {
  button.addEventListener("click", removeInputs);
}

export default function removeInputs(e) {
  e.preventDefault();
  this.parentElement.remove();
}
