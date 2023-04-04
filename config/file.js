import sharp from "sharp";
import getPixels from "get-pixels";
import gifEncoder from "gif-encoder";

import fs from "fs";
import * as fsPromises from "node:fs/promises";
import stream from "stream";
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

  static async thumbnail(destination, filename, fit = "contain") {
    const image = fs.readFileSync(path.join(destination, filename));
    filename += "-thumbnail";
    await sharp(image)
      .resize({
        width: 512,
        height: 512,
        // fit: "inside",
        fit: fit,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
        kernel: "mitchell",
        withoutEnlargement: true,
      })
      .gif({ reoptimise: true, colours: 16 })
      .toFile(`${destination}/${filename}`);

    return await this.write("image/gif", destination, filename);
  }

  static async gif(elements, pageID, delay = 667) {
    let destination = `${__dirname}/uploads/${pageID}/`;
    // if (blockID) destination += blockID;

    const filename = `thumbmails`;
    await elements.sort((a, b) => {
      return a.position - b.position;
    });

    const gif = await new Promise(async (resolve, _reject) => {
      const width = 512;
      const height = 512;

      let gif = new gifEncoder(width, height);

      var file = fs.createWriteStream(path.join(destination, filename));
      gif.pipe(file);
      gif.writeHeader();
      gif.setDelay(delay);
      gif.setRepeat(0);

      for (let element of elements) {
        if (!element.thumbnail.data) continue;

        const { data, contentType } = element.thumbnail;
        const img = await sharp(data)
          .resize({
            width,
            height,
            fit: "contain",
          })
          .gif({ reoptimise: true, colours: 12 })
          .toBuffer();

        const pixels = await new Promise((resolve, _reject) => {
          getPixels(img, contentType, async (err, pixels) => {
            if (err) {
              console.log("Bad image path");
              return;
            }
            resolve(pixels);
          });
        });

        gif.read();
        gif.addFrame(pixels.data);
      }

      gif.on("finish#stop", async function () {
        stream.finished(file, (err) => {
          if (err) console.log(err);
          else {
            resolve();
          }
        });
      });

      gif.finish();
    });

    const dir = path.join(destination, filename);
    const data = await fsPromises.readFile(dir);

    return {
      data,
      contentType: "image/gif",
    };
  }
}
