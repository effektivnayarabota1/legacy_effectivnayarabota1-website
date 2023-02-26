import sharp from "sharp";
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

  static async write(mimetype, destination, filename) {
    return {
      data: fs.readFileSync(path.join(destination, filename)),
      contentType: mimetype,
    };
  }

  static async thumbnail(destination, filename) {
    const image = fs.readFileSync(path.join(destination, filename));
    filename += "-thumbnail";
    await sharp(image)
      .resize({ width: 512, height: 512, fit: "inside", kernel: "mitchell" })
      .gif({ reoptimise: true, colours: 16 })
      .toFile(`${destination}/${filename}`);

    return await this.write("image/gif", destination, filename);
  }
}
