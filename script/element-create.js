const buttons = document.querySelectorAll(".element-create");

for (let button of buttons) {
  button.addEventListener("click", createElement);
}

export default async function createElement(e) {
  e.preventDefault();
  let url = "/admin";

  const type = this.parentNode.parentNode.id;
  if (type == "pages") {
    url += "/page/create";
  }
  console.log(url);

  try {
    await fetch(url, {
      method: "POST",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
