const button = document.querySelector(".element-reorder");

button.addEventListener("click", reorderElements);

async function reorderElements(e) {
  e.preventDefault();
  const form = this.parentNode.parentNode;
  let elements = form.querySelectorAll(".element-container");

  let newOrder = [];
  for (let element of elements) {
    if (!!element.id) newOrder.push(element.id);
  }

  try {
    await fetch("/admin/page/reorder", {
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
