import id from "./config/id.js";

const button = document.querySelector(".dynamic_rewrite");

button.addEventListener("click", rewriteElements);

async function rewriteElements(e) {
  e.preventDefault();
  const container = this.closest(".dynamic_container");
  let elements = container.querySelectorAll(".dynamic_element");

  let newOrder = [];
  for (let element of elements) {
    if (!!element.id) newOrder.push(element.id);
  }

  const { pageID, blockID } = id(window.location.pathname);

  let putUrl;

  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  };

  if (blockID) {
    putUrl = `/admin/${pageID}/${blockID}/rewrite`;

    const formData = new FormData();
    const inputs = document.querySelectorAll(".element_file-input");

    for await (let input of inputs) {
      formData.append("image", input.files[0] || new Blob(), input.id);
    }

    options = {
      method: "POST",
      body: formData,
    };
  } else if (pageID) {
    putUrl = `/admin/${pageID}/rewrite`;
    console.log(pageID);
    return;

    const formData = new FormData();
    const inputs = document.querySelectorAll(".element_file-input");

    for await (let input of inputs) {
      formData.append("image", input.files[0] || new Blob(), input.id);
    }

    options = {
      method: "POST",
      body: formData,
    };
  } else {
    putUrl = `/admin/${container.id}/rewrite`;
  }

  try {
    await fetch(putUrl, options);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
