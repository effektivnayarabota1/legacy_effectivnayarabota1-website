const buttons = document.querySelectorAll(".deleteImgBttn");
for (let button of buttons) {
  button.addEventListener("click", deleteImgClick);
}

async function deleteImgClick(e) {
  e.preventDefault();

  const slugs = location.pathname.split("/");
  const pageSlug = slugs.at(-2);
  const blockSlug = slugs.at(-1);
  const elemSlug = this.id.split(" ").at(-1);

  await fetch(`/admin/${pageSlug}/${blockSlug}/${elemSlug}/image`, {
    method: "DELETE",
  });

  const containerId = `#img-container_${elemSlug}`;
  const imgContainer = document.querySelector(containerId);
  const img = imgContainer.querySelector("img");
  img.remove();
}
