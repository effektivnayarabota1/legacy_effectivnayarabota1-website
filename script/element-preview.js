const inputs = document.querySelectorAll(".element_file-input");

for (let input of inputs) {
  input.addEventListener("change", readImage);
}

function readImage(e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.target.files[0];

  const label = this.parentNode;

  // const imgContainer = document.querySelector(containerId);
  let img = label.querySelector("img");
  if (!img) {
    img = document.createElement("img");
    img.setAttribute("alt", "element image");
    label.appendChild(img);
  }
  reader.addEventListener("load", (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}
