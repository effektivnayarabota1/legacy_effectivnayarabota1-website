const button = document.querySelector(".element-reorder");

button.addEventListener("click", reorderElements);

async function reorderElements(e) {
  e.preventDefault();
  const form = this.parentNode.parentNode;
  const elements = form.querySelectorAll("fieldset");
  let newOrder = [];
  for (let element of elements) {
    newOrder.push(element.id);
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
