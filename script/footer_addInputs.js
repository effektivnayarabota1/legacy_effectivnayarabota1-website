import removeInputs from "./footer_removeInputs.js";

const buttons = document.querySelectorAll(".addInputsBttn");

for (let button of buttons) {
  button.addEventListener("click", addInputs);
}

function addInputs(e) {
  e.preventDefault();
  const groupId = this.id.split("_").at(-1);

  const div = document.createElement("div");
  div.setAttribute("div", `link-container_${groupId}`);

  const inputText = document.createElement("input");
  inputText.setAttribute("text", "text");
  inputText.setAttribute("name", `text-${groupId}`);
  inputText.setAttribute("placeholder", "text of link");

  const inputUrl = document.createElement("input");
  inputUrl.setAttribute("text", "text");
  inputUrl.setAttribute("name", `url-${groupId}`);
  inputUrl.setAttribute("placeholder", "url of link");

  const removeBttn = document.createElement("button");
  removeBttn.textContent = "rm";
  removeBttn.addEventListener("click", removeInputs);

  div.appendChild(document.createElement("hr"));
  div.appendChild(inputText);
  div.appendChild(document.createElement("br"));
  div.appendChild(inputUrl);
  div.appendChild(removeBttn);

  const fieldset = this.parentElement;
  let hr = fieldset.querySelectorAll("hr");
  hr = hr[hr.length - 1];
  fieldset.insertBefore(div, hr);
}
