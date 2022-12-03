addParagraph.onclick = function (e) {
  e.preventDefault();

  const field = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Абзац";
  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "desc");
  textarea.setAttribute("form", "text_form");
  textarea.setAttribute("placeholder", "desc");
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("name", "image");
  input.setAttribute("accept", "image/*");
  const deleteBttn = document.createElement("button");
  deleteBttn.textContent = "Удалить абзац";
  deleteBttn.onclick = function (e) {
    e.preventDefault();
    this.parentElement.remove();
  };
  const hr = document.createElement("hr");

  field.appendChild(legend);
  field.appendChild(textarea);
  field.appendChild(input);
  field.appendChild(hr);
  field.appendChild(deleteBttn);

  text_form.insertBefore(field, button_container);
};
