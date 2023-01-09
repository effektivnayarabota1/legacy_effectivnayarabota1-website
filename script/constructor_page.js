deleteBttn.addEventListener("click", async function (e) {
  e.preventDefault();
  const slug = location.pathname.split("/");
  const pageSlug = slug.at(-1);

  try {
    const response = await fetch(`/admin/${pageSlug}`, {
      method: "DELETE",
      // redirect: "follow",
    });

    window.location.href = "/admin";
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});

const fieldset = document.querySelector("#fieldset");
const coverInput = document.querySelector("#cover-input");
const labelTitle = document.querySelector("label[for=title]");

coverInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  readImage(file);
});

function readImage(file) {
  const reader = new FileReader();
  let img = document.querySelector("#cover-preview");
  if (!img) {
    img = document.createElement("img");
    img.setAttribute("id", "cover-preview");
    fieldset.insertBefore(img, labelTitle);
    fieldset.insertBefore(document.createElement("br"), labelTitle);
    fieldset.insertBefore(document.createElement("br"), labelTitle);
  }
  reader.addEventListener("load", (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}
// console.log(coverInput);
// field.appendChild(coverInput);
