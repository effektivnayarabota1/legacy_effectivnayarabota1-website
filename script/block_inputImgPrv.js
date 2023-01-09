const imgInputs = document.querySelectorAll(".input_elem-img");
for (let input of imgInputs) {
  input.addEventListener("change", (e) => {
    e.preventDefault();

    const elemSlug = input.id.split("_").at(-1);
    const file = e.target.files[0];
    readImage(file, elemSlug);
  });
}

function readImage(file, elemSlug) {
  const reader = new FileReader();
  const containerId = `#img-container_${elemSlug}`;
  // const imgContainer = document.querySelector("#img-container", `#${elemSlug}`);
  const imgContainer = document.querySelector(containerId);
  let img = imgContainer.querySelector("img");
  console.log(imgContainer);
  console.log(img);
  if (!img) {
    img = document.createElement("img");
    img.setAttribute("id", "cover-preview");
    imgContainer.appendChild(img);
  }
  reader.addEventListener("load", (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}
