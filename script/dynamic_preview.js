const inputs = document.querySelectorAll(".element_file-input");

for (let input of inputs) {
  input.addEventListener("change", readImage);
}

function readImage(e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.target.files[0];

  const elementContainer = this.closest(".dynamic_element");
  const previewContainerS = elementContainer.querySelectorAll(
    ".dynamic_preview-container"
  );

  for (let container of previewContainerS) {
    let img = container.querySelector("img");

    if (!img) {
      container.querySelector(".empty").remove();

      img = document.createElement("img");
      container.appendChild(img);
    }

    reader.addEventListener("load", (event) => {
      img.src = event.target.result;
    });
  }
  reader.readAsDataURL(file);
}
