deleteBlockBttn.addEventListener("click", async function (e) {
  e.preventDefault();
  const slugs = location.pathname.split("/");
  const pageSlug = slugs.at(-2);
  const blockSlug = slugs.at(-1);

  try {
    const response = await fetch(`/admin/${pageSlug}/${blockSlug}`, {
      method: "DELETE",
      // redirect: "follow",
    });

    window.location.href = `/admin/${pageSlug}`;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});
