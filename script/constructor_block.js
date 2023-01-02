addImageBttn.onclick = function (e) {
  e.preventDefault();

  const field = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Изображение";
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("name", "image");
  input.setAttribute("accept", "image/*");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "desc");
  textarea.setAttribute("form", "image_form");
  textarea.setAttribute("placeholder", "desc");
  const deleteBttn = document.createElement("button");
  deleteBttn.textContent = "Удалить изображение";
  deleteBttn.onclick = function (e) {
    e.preventDefault();
    this.parentElement.remove();
  };
  const hr = document.createElement("hr");

  field.appendChild(legend);
  field.appendChild(input);
  field.appendChild(textarea);
  field.appendChild(hr);
  field.appendChild(deleteBttn);

  image_form.insertBefore(field, button_container);
};

deleteBlockBttn.onclick = async function (e) {
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
};
