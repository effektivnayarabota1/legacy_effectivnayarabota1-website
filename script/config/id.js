export default function (url) {
  const pathList = url.split("/");
  return {
    pageID: pathList[2],
    blockID: pathList[3],
    elementID: pathList[4],
  };
}
