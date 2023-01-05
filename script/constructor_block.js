// TODO Добавить в корзину для удаленных элементов. Чтобы их можно было вернуть.
// 	корзина сохраняется только для текущей сессии

function upClickFunction(e) {
  e.preventDefault();
  const fieldset = this.parentNode;
  const prevFieldset = fieldset.previousElementSibling;
  const form = fieldset.parentNode;

  // const elemSlug = button.id.split(" ").at(-1);
  // console.log(elemSlug);

  if (prevFieldset.nodeName == "FIELDSET") {
    form.insertBefore(fieldset, prevFieldset);
  }
}

function downClickFunction(e) {
  e.preventDefault();
  const fieldset = this.parentNode;
  const nextFieldset = fieldset.nextElementSibling;
  const form = fieldset.parentNode;

  // const elemSlug = button.id.split(" ").at(-1);
  // console.log(elemSlug);

  if (nextFieldset.nodeName == "FIELDSET") {
    form.insertBefore(nextFieldset, fieldset);
  }
}

function deleteClickFunction(e) {
  e.preventDefault();

  // const elemSlug = button.id.split(" ").at(-1);
  // console.log(elemSlug);

  this.parentElement.remove();
}

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

  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("name", "image");
  input.setAttribute("accept", "image/*");

  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "desc");
  textarea.setAttribute("form", "block_form");
  textarea.setAttribute("placeholder", "desc");

  const newUpElemBttn = document.createElement("button");
  newUpElemBttn.textContent = "Вверх";
  newUpElemBttn.addEventListener("click", upClickFunction);

  const newDownElemBttn = document.createElement("button");
  newDownElemBttn.textContent = "Вниз";
  newDownElemBttn.addEventListener("click", downClickFunction);

  const deleteBttn = document.createElement("button");
  deleteBttn.textContent = "Удалить элемент";
  deleteBttn.addEventListener("click", deleteClickFunction);
  const hr = document.createElement("hr");

  field.appendChild(legend);

  field.appendChild(newUpElemBttn);
  field.appendChild(newDownElemBttn);
  field.appendChild(document.createElement("hr"));

  field.appendChild(input);
  field.appendChild(textarea);
  field.appendChild(hr);

  field.appendChild(deleteBttn);

  block_form.insertBefore(field, button_container);
}

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

deleteBlockBttn.addEventListener("click", async function (e) {
  e.preventDefault();
  const slugs = location.pathname.split("/");
  const pageSlug = slugs.at(-2);
  const blockSlug = slugs.at(-1);

  try {
    const response = await fetch(`/admin/${pageSlug}/${blockSlug}`, {
      method: "DELETE",
      // redirect: "follow",
    });

    window.location.href = `/admin/${pageSlug}`;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});

const deleteElemBttns = document.querySelectorAll(".deleteElemBttn");
for (let button of deleteElemBttns) {
  button.addEventListener("click", deleteClickFunction);
}

const upElemBttns = document.querySelectorAll(".upElemBttn");
for (let button of upElemBttns) {
  button.addEventListener("click", upClickFunction);
}

const downElemBttns = document.querySelectorAll(".downElemBttn");
for (let button of downElemBttns) {
  button.addEventListener("click", downClickFunction);
}
