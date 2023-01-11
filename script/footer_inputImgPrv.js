const imgInput = document.querySelector("#footer-bcg_input");

imgInput.addEventListener("change", (e) => {
  e.preventDefault();

  const file = e.target.files[0];
  readImage(file);
});

function readImage(file) {
  const reader = new FileReader();
  const containerId = "#footer-bcg_container";
  const imgContainer = document.querySelector(containerId);
  let img = imgContainer.querySelector("img");
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
