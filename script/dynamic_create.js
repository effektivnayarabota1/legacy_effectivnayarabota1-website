const buttons = document.querySelectorAll(".dynamic_create");

for (let button of buttons) {
  button.addEventListener("click", create);
}

export default async function create(e) {
  e.preventDefault();

  let type;
  const currentUrl = window.location.href;
  const urlLength = currentUrl.split("/").length;

  if (urlLength == 4) type = "page";
  else if (urlLength == 5) type = "block";
  else if (urlLength == 6) type = "element";

  let postUrl;

  if (type == "page") {
    postUrl = "/admin";
  }

  if (type == "block") {
    const newBlockType = this.className.split(" ").at(-1);
    const pageId = currentUrl.split("/").at(-1);
    postUrl = `/admin/${pageId}/${newBlockType}`;
  }

  if (type == "element") {
    console.log("Функционал не прописан.");
  }

  try {
    await fetch(postUrl, {
      method: "POST",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
