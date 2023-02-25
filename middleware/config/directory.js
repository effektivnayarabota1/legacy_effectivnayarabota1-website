import path from "path";
import fs from "fs";
const __dirname = path.resolve();

export default async function (pageID, blockID, elementID) {
  let dir = __dirname + `/uploads/${pageID}/`;
  if (blockID) dir += `${blockID}/`;
  if (elementID) dir += `${elementID}/`;
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  return dir;
}
