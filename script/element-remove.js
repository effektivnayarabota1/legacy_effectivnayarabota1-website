const buttons = document.querySelectorAll(".element-remove");

for (let button of buttons) {
  button.addEventListener("click", removeElement);
}

export default async function removeElement(e) {
  e.preventDefault();
  let url = "/admin";

  const elementContainer = this.parentNode.parentNode.parentNode;
  const id = elementContainer.id;

  const type = elementContainer.parentNode.id;
  if (type == "pages") {
    url += `/page/${id}`;
  }
  console.log(url);

  try {
    await fetch(url, {
      method: "DELETE",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
