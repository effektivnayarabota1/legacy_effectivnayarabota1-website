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
    await res.render("admin/header", {
      title: header.title,
      elements: header.elements,
    });
  }

  static async update(req, res) {
    let header = await Header.findOne({});

    if (!Array.isArray(req.body["element-slug"])) {
      req.body["element-slug"] = [req.body["element-slug"]];
    }
    if (!Array.isArray(req.files)) {
      req.files = [req.files];
    }

    header.title = req.body["header-title"];

    const files = req.files;

    const oldElems = header.elements;
    let newElems = [];

    for (let elemSlug of req.body["element-slug"]) {
      const file = files.find((file) => file.filename === elemSlug);
      if (file) {
        newElems.push({
          slug: elemSlug,
          img: {
            data: fs.readFileSync(
              path.join(`${__dirname}/uploads/header/${file.filename}`)
            ),
            contentType: file.mimetype,
          },
        });
      } else {
        const oldElem = oldElems.find((elem) => elem.slug === elemSlug);
        if (!!oldElem.img.data) {
          newElems.push({
            slug: oldElem.slug,
            img: oldElem.img,
          });
        }
      }
    }

    header.elements = newElems;
    await header.save();
    await res.redirect("/admin");
  }

  static async create(_req, res) {
    let header = await Header.findOne({});
    await header.elements.push({});
    await header.save();
    const slug = header.elements.at(-1).slug;
    res.send(slug);
  }

  static async remove(req, res) {
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
