const buttons = document.querySelectorAll(".element-remove");

for (let button of buttons) {
  button.addEventListener("click", removeElement);
}

export default async function removeElement(e) {
  e.preventDefault();
  let url = "/admin";

  const elementContainer = this.closest(".element-container");
  const id = elementContainer.id;

  const form = this.closest("form");
  const type = form.id;

  if (type == "pages") {
    url += `/page/${id}`;
  }

  try {
    await fetch(url, {
      method: "DELETE",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
