const imgInputs = document.querySelectorAll("#header-bcg_input");

for (let input of imgInputs) {
  input.addEventListener("change", (e) => {
    e.preventDefault();
    const parent = e.target.parentNode;

    const file = e.target.files[0];
    readImage(file, parent);
  });
}

export default function readImage(file, parent) {
  const reader = new FileReader();
  const containerId = "#header-bcg_container";
  const imgContainer = parent.querySelector(containerId);
  let img = imgContainer.querySelector("img");
  console.log(imgContainer);
  if (!img) {
    img = document.createElement("img");
    img.setAttribute("id", "footer-bcg");
    imgContainer.appendChild(img);
  }
  reader.addEventListener("load", (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}
