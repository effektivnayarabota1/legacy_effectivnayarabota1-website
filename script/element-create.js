const button = document.querySelector(".create-element");

button.addEventListener("click", createElement);

export default async function createElement(e) {
  e.preventDefault();

  await fetch(`/admin/header/create`, {
    method: "GET",
  });

  window.location.reload();
}
