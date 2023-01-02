deleteBttn.onclick = async function (e) {
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
};
