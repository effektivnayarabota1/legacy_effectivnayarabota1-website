import id from "./config/id.js";

const buttons = document.querySelectorAll(".dynamic_create");

for (let button of buttons) {
  button.addEventListener("click", create);
}

async function create(e) {
  e.preventDefault();

  const { pageID, blockID } = id(window.location.pathname);

  let postUrl;

  if (blockID) {
    postUrl = `/admin/${pageID}/${blockID}/new`;
  } else if (pageID == "footer") {
    const group = this.id;
    postUrl = `/admin/${pageID}/${group}`;
  } else if (pageID) {
    const type = this.className.split(" ").at(-1);
    postUrl = `/admin/${pageID}/${type}`;
  } else {
    postUrl = "/admin";
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
