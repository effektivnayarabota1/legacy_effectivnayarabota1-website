const url = window.location.pathname;

window.addEventListener("load", () => {
  const linkContainer = document.querySelector(".admin-panel_left-side");

  const pageID = url.split("/").at(2);
  const blockID = url.split("/").at(3);
  const elementID = url.split("/").at(4);

  const IDs = [pageID, blockID, elementID];
  const names = ["Page", "Block", "Element"];

  let link = "/admin";
  for (let ID of IDs) {
    if (!!ID) {
      const index = IDs.indexOf(ID);
      const a = document.createElement("a");
      link = link + `/${ID}`;
      a.href = link;
      a.innerText = names[index];
      linkContainer.appendChild(a);
    } else break;
  }
});
