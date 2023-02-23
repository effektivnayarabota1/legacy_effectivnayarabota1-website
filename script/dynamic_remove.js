const buttons = document.querySelectorAll(".dynamic_remove");

for (let button of buttons) {
  button.addEventListener("click", removeElement);
}

export default async function removeElement(e) {
  e.preventDefault();

  let type;
  const currentUrl = window.location.href;
  const urlLength = currentUrl.split("/").length;

  if (urlLength == 4) type = "page";
  else if (urlLength == 5) type = "block";
  else if (urlLength == 6) type = "element";

  let deleteUrl;
  const dynamicElement = this.closest(".dynamic_element");
  const dynamicElementId = dynamicElement.id;

  if (type == "page") {
    deleteUrl = `/admin/${dynamicElementId}`;
  }

  if (type == "block") {
    const pageID = currentUrl.split("/").at(-1);
    deleteUrl = `/admin/${pageID}/${dynamicElementId}`;
  }

  if (type == "element") {
    const pageID = currentUrl.split("/").at(-2);
    const blockID = currentUrl.split("/").at(-1);
    deleteUrl = `/admin/${pageID}/${blockID}/${dynamicElementId}`;
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
