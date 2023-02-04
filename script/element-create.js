const buttons = document.querySelectorAll(".element-create");

for (let button of buttons) {
  button.addEventListener("click", createElement);
}

export default async function createElement(e) {
  e.preventDefault();
  let url = "/admin";

  const form = this.closest("form");
  const type = form.id;

  if (type == "pages") {
    url += "/page/create";
  }

  try {
    await fetch(url, {
      method: "POST",
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
