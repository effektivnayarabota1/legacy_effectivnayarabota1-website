import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

import Header from "../models/header.js";

const __dirname = path.resolve();

export default class HeaderController {
  static async edit(req, res) {
    let header = await Header.findOne({});
    if (!header) header = await Header.create({});
    if (!header.elements.length) await header.elements.push({});
    await header.save();
    await res.render("admin/header", { elements: header.elements });
  }

  static async blank(_req, res) {
    let header = await Header.findOne({});
    await header.elements.push({});
    await header.save();
    const slug = header.elements.at(-1).slug;
    res.send(slug);
  }

  static async update(req, res) {
    console.log("update");
  }

  static async delete(req, res) {
    const slug = req.params.slug;
    let header = await Header.findOne({});

    header.elements = await header.elements.filter(
      (element) => element.slug !== slug
    );

    // если у элемента есть файл, то удалить его.
    const dir = `${__dirname}/uploads/header/${slug}`;
    if (fs.existsSync(dir)) {
      await fsPromises.unlink(dir);
    }

    await header.save();

    await res.send("ok");
  }
}
