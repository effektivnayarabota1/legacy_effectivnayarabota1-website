const inputs = document.querySelectorAll(".element_file-input");

for (let input of inputs) {
  input.addEventListener("change", readImage);
}

function readImage(e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.target.files[0];

  const container = this.closest(".element_img-container");
  if (!!container) {
    let img = container.querySelector("img");
    reader.addEventListener("load", (event) => {
      img.src = event.target.result;
    });
  } else {
    const form = this.closest("form");
    if (form.className.includes("meta")) {
      const imgContainers = form.querySelectorAll(".element_img-container");
      for (let container of imgContainers) {
        let img = container.querySelector("img");
        reader.addEventListener("load", (event) => {
          img.src = event.target.result;
        });
      }
    }
  }

  reader.readAsDataURL(file);
}
