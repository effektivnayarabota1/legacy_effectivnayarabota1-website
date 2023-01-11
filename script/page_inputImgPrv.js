const fieldset = document.querySelector("#fieldset");
const coverInput = document.querySelector("#cover-input");
const labelTitle = document.querySelector("label[for=title]");

coverInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  readImage(file);
});

function readImage(file) {
  const reader = new FileReader();
  let img = document.querySelector("#cover-preview");
  if (!img) {
    img = document.createElement("img");
    img.setAttribute("id", "cover-preview");
    fieldset.insertBefore(img, labelTitle);
    fieldset.insertBefore(document.createElement("br"), labelTitle);
    fieldset.insertBefore(document.createElement("br"), labelTitle);
  }
  reader.addEventListener("load", (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}
