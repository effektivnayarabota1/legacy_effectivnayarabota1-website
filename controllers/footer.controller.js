import File from "./config/file.js";

import Footer from "../models/footer.js";

export default class FooterController {
  static async index(_req, res) {
    let footer = await Footer.findOne({});
    if (!footer) {
      footer = await Footer.create({});
    }
    await res.render("admin/footer", {
      footer,
    });
  }

  static async meta(req, res) {
    let footer = await Footer.findOne({});

    console.log(req.body);

    footer.color.current = req.body.color;
    footer.objectFit = req.body.objectFit;

    if (!!req.file) {
      const { mimetype, destination, filename, size } = req.file;
      if (size > 0 && mimetype != "application/octet-stream") {
        footer.img = await File.write(mimetype, destination, filename);
        footer.thumbnail = await File.thumbnail(destination, filename);
      }
    }
    await footer.save();
    await res.redirect("/admin/footer");
  }

  static async create(req, res) {
    const { group } = req.params;
    const footer = await Footer.findOne({});
    footer[group].push({ text: "" });
    await footer.save();
    res.send("OK");
  }

  static async remove(req, res) {
    const elementID = req.params.elementID;
    const footer = await Footer.findOne({});

    // TODO Перепиши, это некрасиво.
    const element =
      (await footer.group1.id(elementID)) ||
      (await footer.group2.id(elementID)) ||
      (await footer.group3.id(elementID));

    await element.remove();
    await footer.save();
    await res.send("OK");
  }

  static async rewrite(req, res) {
    const footer = await Footer.findOne({});

    if (!Array.isArray(req.body.text)) req.body.text = [req.body.text];

    footer[req.body.group] = [];

    for (let text of req.body.text) {
      footer[req.body.group].push({ text });
    }

    footer.save();
    res.send("OK");
  }
}
