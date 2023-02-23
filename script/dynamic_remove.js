import id from "./config/id.js";

const buttons = document.querySelectorAll(".dynamic_remove");

for (let button of buttons) {
  button.addEventListener("click", removeElement);
}

async function removeElement(e) {
  e.preventDefault();

  const { pageID, blockID } = id(window.location.pathname);

  const dynamicElement = this.closest(".dynamic_element");
  const dynamicElementId = dynamicElement.id;

  let deleteUrl;

  if (blockID) {
    deleteUrl = `/admin/${pageID}/${blockID}/${dynamicElementId}`;
  } else if (pageID) {
    deleteUrl = `/admin/${pageID}/${dynamicElementId}`;
  } else {
    deleteUrl = `/admin/${dynamicElementId}`;
  }

  try {
    await fetch(deleteUrl, {
      method: "DELETE",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
