// TODO Добавить в корзину для удаленных элементов. Чтобы их можно было вернуть.
// 	корзина сохраняется только для текущей сессии

const deleteElemBttns = document.querySelectorAll(".deleteElemBttn");
for (let button of deleteElemBttns) {
  button.addEventListener("click", deleteElemClick);
}

export async function deleteElemClick(e) {
  e.preventDefault();

  const slugs = location.pathname.split("/");
  const pageSlug = slugs.at(-2);
  const blockSlug = slugs.at(-1);
  const elemSlug = this.id.split(" ").at(-1);

  await fetch(`/admin/${pageSlug}/${blockSlug}/${elemSlug}`, {
    method: "DELETE",
  });

  await this.parentElement.remove();
}
