import { marked } from "marked";

import File from "./config/file.js";

import Header from "../models/header.js";

export default class HeaderController {
  static async index(req, res) {
    const header = await Header.findOne({});
    await header.elements.sort((a, b) => {
      return a.position - b.position;
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

  static async meta(req, res) {
    const header = await Header.findOne({});

    const { title, color, mixBlendMode } = req.body;
    header.title = title;
    header.markup = marked.parse(title);
    header.color.current = color;
    header.mixBlendMode = mixBlendMode;

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

    const delay = req.body.delay;
    header.gif = await File.gif(elements, "header", delay);

    header.delay = delay;
    header.objectFit = req.body.objectFit;

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
    header.gif = await File.gif(header.elements, "header", header.delay);
    await header.save();
    await res.send("OK");
  }
}
