import { deleteElemClick } from "./block_deleteElem.js";

addElemBttn.addEventListener("click", async function (e) {
  e.preventDefault();

  const slugs = location.pathname.split("/");
  const pageSlug = slugs.at(-2);
  const blockSlug = slugs.at(-1);

  const response = await fetch(`/admin/${pageSlug}/${blockSlug}/blank`, {
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
  newUpElemBttn.addEventListener("click", upClickFunction);

  const newDownElemBttn = document.createElement("button");
  newDownElemBttn.textContent = "Вниз";
  newDownElemBttn.addEventListener("click", downClickFunction);

  const deleteImgBttn = document.createElement("button");
  deleteImgBttn.textContent = "Удалить изображение";
  deleteImgBttn.addEventListener("click", deleteImgClick);

  const imgContainer = document.createElement("div");
  imgContainer.setAttribute("id", `img-container_${elemSlug}`);

  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("name", "input_elem-img");
  input.setAttribute("accept", "image/*");
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    readImage(file, elemSlug);
  });

  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "desc");
  textarea.setAttribute("form", "block_form");
  textarea.setAttribute("placeholder", "desc");

  const deleteBttn = document.createElement("button");
  deleteBttn.textContent = "Удалить элемент";
  deleteBttn.addEventListener("click", deleteElemClick);
  const hr = document.createElement("hr");

  field.appendChild(legend);

  field.appendChild(newUpElemBttn);
  field.appendChild(newDownElemBttn);
  field.appendChild(document.createElement("hr"));

  field.appendChild(deleteImgBttn);
  field.appendChild(document.createElement("hr"));

  field.appendChild(imgContainer);
  field.appendChild(document.createElement("hr"));

  field.appendChild(input);
  field.appendChild(document.createElement("br"));
  field.appendChild(textarea);
  field.appendChild(hr);

  field.appendChild(deleteBttn);

  block_form.insertBefore(field, button_container);
}
