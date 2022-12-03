deleteBttn.onclick = async function (e) {
  e.preventDefault();
  const slug = location.pathname.split("/").slice(1).at(-1);
  try {
    const response = await fetch(`/admin/${slug}`, {
      method: "DELETE",
      // redirect: "follow",
    });

    window.location.href = "/admin";
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
