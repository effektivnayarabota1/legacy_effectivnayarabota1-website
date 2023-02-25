import fs from "fs";
// import fsPromises from "fs/promises";
import path from "path";

const __dirname = path.resolve();

export default class File {
  static async remove(pageID, blockID, elementID) {
    let dir = `${__dirname}/uploads/${pageID}/`;
    if (blockID) dir += blockID + "/";
    if (elementID) dir += elementID;
    if (fs.existsSync(dir)) {
      // await fsPromises.unlink(dir);
      fs.rmSync(dir, { recursive: true, force: true });
    }
    return;
  }

  static async write(file) {
    const { mimetype, destination, filename } = file;

    return {
      data: fs.readFileSync(path.join(destination, filename)),
      contentType: mimetype,
    };
  }
}
