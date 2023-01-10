const buttons = document.querySelectorAll(".removeElemBttn");

for (let button of buttons) {
  button.addEventListener("click", HeaderRemoveElem);
}

export default async function HeaderRemoveElem(e) {
  e.preventDefault();
  const id = this.id.split(" ").at(-1);

  await fetch(`/admin/header/${id}`, {
    method: "DELETE",
  });

  await this.parentElement.remove();
}
