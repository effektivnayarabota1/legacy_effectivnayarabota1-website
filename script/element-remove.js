const buttons = document.querySelectorAll(".remove-element");

for (let button of buttons) {
  button.addEventListener("click", removeElement);
}

export default async function removeElement(e) {
  e.preventDefault();
  const elementContaiener = this.parentNode.parentNode.parentNode;
  const elementSlug = elementContaiener.id;

  await fetch(`/admin/header/${elementSlug}`, {
    method: "DELETE",
  });

  window.location.reload();
}
