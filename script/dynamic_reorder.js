const button = document.querySelector(".dynamic_reorder");

button.addEventListener("click", reorderElements);

async function reorderElements(e) {
  e.preventDefault();
  const container = this.closest(".dynamic_container");
  let elements = container.querySelectorAll(".dynamic_element");

  let newOrder = [];
  for (let element of elements) {
    if (!!element.id) newOrder.push(element.id);
  }

  const currentUrl = window.location.href;
  const urlLength = currentUrl.split("/").length;

  let putUrl;

  if (urlLength < 6) {
    putUrl = `/admin/${container.id}/reorder`;
  } else {
    const pageID = currentUrl.split("/").at(-2);
    const blockID = currentUrl.split("/").at(-1);
    putUrl = `/admin/${pageID}/${blockID}/reorder`;
  }

  try {
    await fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
