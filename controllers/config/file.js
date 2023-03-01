import sharp from "sharp";
import getPixels from "get-pixels";
import gifEncoder from "gif-encoder";

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export default class File {
  static async remove(pageID, blockID, elementID) {
    let dir = `${__dirname}/uploads/${pageID}/`;
    if (blockID) dir += blockID;
    if (elementID) dir += "/" + elementID;
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    dir += "-thumbnail";
    console.log(dir);
    if (fs.existsSync(dir)) {
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
      .resize({
        width: 512,
        height: 512,
        fit: "inside",
        kernel: "mitchell",
        withoutEnlargement: true,
      })
      .gif({ reoptimise: true, colours: 16 })
      .toFile(`${destination}/${filename}`);

    return await this.write("image/gif", destination, filename);
  }

  static async gif(directory, elements) {
    var gif = new gifEncoder(100, 100);
    let dir = `${__dirname}/uploads/${directory}/gif.gif`;

    var file = fs.createWriteStream(dir);
    gif.pipe(file);
    gif.writeHeader();
    gif.setDelay(1);
    gif.setRepeat(0);

    for (let element of elements) {
      const { data, contentType } = element.thumbnail;
      const pixel = await new Promise((resolve, _reject) => {
        getPixels(data, contentType, async (err, pixels) => {
          if (err) {
            console.log("Bad image path");
            return;
          }
          resolve(pixels);
        });
      });
      gif.addFrame(pixel.data);
    }

    gif.finish();
  }
}
