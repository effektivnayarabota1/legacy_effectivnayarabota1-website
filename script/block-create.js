const buttons = document.querySelectorAll(".block-create");

for (let button of buttons) {
  button.addEventListener("click", createBlock);
}

export default async function createBlock(e) {
  e.preventDefault();

  let type;
  if (this.className.includes("image")) type = "image";
  else if (this.className.includes("text")) type = "text";
  else if (this.className.includes("gallery")) type = "gallery";

  const pageId = window.location.href.split("/").at(-1);
  console.log(pageId);
  const url = `/admin/${pageId}/${type}/create`;
  try {
    await fetch(url, {
      method: "POST",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
