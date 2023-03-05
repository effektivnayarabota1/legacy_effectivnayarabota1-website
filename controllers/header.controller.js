import { marked } from "marked";

import File from "./config/file.js";
import path from "path";

import Header from "../models/header.js";

const __dirname = path.resolve();

export default class HeaderController {
  static async index(req, res) {
    const header = await Header.findOne({});
    await header.elements.sort((a, b) => {
      return a.position - b.position;
    });

    header.elements.forEach((element) => {
      element.HTMLtext = marked.parse(element.text);
    });
    await res.render("admin/header", { header });
  }

  static async create(_req, res) {
    try {
      const header = await Header.findOne({});
      await header.elements.push({});
      await header.save();
      await res.send("OK");
    } catch (err) {
      await res.send(err);
    }
  }

  static async title(req, res) {
    const header = await Header.findOne({});
    const { title, color } = req.body;
    header.title = title;
    header.color.current = color;
    await header.save();
    await res.redirect("/admin/header");
  }

  static async rewrite(req, res) {
    const header = await Header.findOne({});

    if (!Array.isArray(req.body.title)) req.body.title = [req.body.title];
    if (!Array.isArray(req.body.text)) req.body.text = [req.body.text];

    const { elements } = header;
    const files = req.files;
    for (let file of files) {
      const index = files.indexOf(file);
      const { mimetype, destination, filename, size } = file;

      const element = await elements.find((element) => {
        return element._id.toString() == filename;
      });
      element.position = index;
      element.title = req.body.title[index];
      element.text = req.body.text[index];

      if (size > 0 && mimetype != "application/octet-stream") {
        element.img = await File.write(mimetype, destination, filename);
        element.thumbnail = await File.thumbnail(destination, filename);
      }
    }

    const destination = req.files[0].destination;
    // const order = req.files.map((file) => [file.originalname]);
    const delay = req.body.delay;
    header.gif = await File.gif(elements, destination, delay);

    header.delay = delay;

    await header.save();
    await res.send("OK");
  }

  static async remove(req, res) {
    const elementID = req.params.elementID;
    const header = await Header.findOne({});
    const element = await header.elements.id(elementID);
    if (header.elements.length - 1) {
      await File.remove("header", elementID);
      await element.remove();
    }
    await header.save();
    await res.send("OK");
  }

  // static async edit(req, res) {
  //   let header = await Header.findOne({});
  //   if (!header) header = await Header.create({});
  //   if (!header.elements.length) await header.elements.push({});
  //   await header.save();
  //   await res.render("admin/header", {
  //     title: header.title,
  //     elements: header.elements,
  //   });
  // }
  //
  // static async update(req, res) {
  //   let header = await Header.findOne({});
  //
  //   if (!Array.isArray(req.body["element-slug"])) {
  //     req.body["element-slug"] = [req.body["element-slug"]];
  //   }
  //   if (!Array.isArray(req.files)) {
  //     req.files = [req.files];
  //   }
  //
  //   header.title = req.body["header-title"];
  //
  //   const files = req.files;
  //
  //   const oldElems = header.elements;
  //   let newElems = [];
  //
  //   for (let elemSlug of req.body["element-slug"]) {
  //     const file = files.find((file) => file.filename === elemSlug);
  //     if (file) {
  //       newElems.push({
  //         slug: elemSlug,
  //         img: {
  //           data: fs.readFileSync(
  //             path.join(`${__dirname}/uploads/header/${file.filename}`)
  //           ),
  //           contentType: file.mimetype,
  //         },
  //       });
  //     } else {
  //       const oldElem = oldElems.find((elem) => elem.slug === elemSlug);
  //       if (!!oldElem.img.data) {
  //         newElems.push({
  //           slug: oldElem.slug,
  //           img: oldElem.img,
  //         });
  //       }
  //     }
  //   }
  //
  //   header.elements = newElems;
  //   await header.save();
  //   await res.redirect("/admin");
  // }
  //
  // static async create(_req, res) {
  //   let header = await Header.findOne({});
  //   await header.elements.push({});
  //   await header.save();
  //   const slug = header.elements.at(-1).slug;
  //   res.send(slug);
  // }
  //
  // static async remove(req, res) {
  //   const slug = req.params.slug;
  //   let header = await Header.findOne({});
  //
  //   header.elements = await header.elements.filter(
  //     (element) => element.slug !== slug
  //   );
  //
  //   // если у элемента есть файл, то удалить его.
  //   const dir = `${__dirname}/uploads/header/${slug}`;
  //   if (fs.existsSync(dir)) {
  //     await fsPromises.unlink(dir);
  //   }
  //
  //   await header.save();
  //
  //   await res.send("ok");
  // }
}
