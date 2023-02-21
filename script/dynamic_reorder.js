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

  const url = `/admin/${container.id}/reorder`;

  try {
    await fetch(url, {
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
