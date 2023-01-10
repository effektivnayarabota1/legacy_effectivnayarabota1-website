import { moveUp, moveDown } from "./header_moveElem.js";
import HeaderRemoveElem from "./header_removeElem.js";
import readImage from "./header_inputImgPrv.js";

addElemBttn.addEventListener("click", async function (e) {
  e.preventDefault();

  const response = await fetch(`/admin/header/blank`, {
    method: "GET",
  });

  const elemSlug = await response.text();

  addElemMarkup(e, elemSlug);
});

function addElemMarkup(e, elemSlug) {
  e.preventDefault();

  const field = document.createElement("fieldset");

  const legend = document.createElement("legend");
  const legendInput = document.createElement("input");
  legendInput.setAttribute("type", "text");
  legendInput.setAttribute("name", "element-slug");
  legendInput.setAttribute("value", elemSlug);
  legendInput.setAttribute("readonly", true);
  legend.appendChild(legendInput);

  const newUpElemBttn = document.createElement("button");
  newUpElemBttn.textContent = "Вверх";
  newUpElemBttn.addEventListener("click", moveUp);

  const newDownElemBttn = document.createElement("button");
  newDownElemBttn.textContent = "Вниз";
  newDownElemBttn.addEventListener("click", moveDown);

  const imgContainer = document.createElement("div");
  imgContainer.setAttribute("id", "header-bcg_container");

  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("name", "header-bcg");
  input.setAttribute("accept", "image/*");
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    readImage(file, field);
  });

  const deleteBttn = document.createElement("button");
  deleteBttn.textContent = "Удалить элемент";
  deleteBttn.setAttribute("id", `removeElemBttn ${elemSlug}`);
  deleteBttn.addEventListener("click", HeaderRemoveElem);

  field.appendChild(legend);

  field.appendChild(newUpElemBttn);
  field.appendChild(newDownElemBttn);
  field.appendChild(document.createElement("hr"));

  field.appendChild(imgContainer);
  field.appendChild(document.createElement("hr"));

  field.appendChild(input);
  field.appendChild(document.createElement("br"));
  field.appendChild(document.createElement("hr"));

  field.appendChild(deleteBttn);

  const elementsContainer = document.querySelector("#elements-container");
  elementsContainer.appendChild(field);
}
