import Footer from "../models/footer.js";

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export default class FooterController {
  static async index(_req, res) {
    let footer = await Footer.findOne({});
    if (!footer) {
      footer = await Footer.create({});
      footer.groups = [[], [], [], []];
    }
    await res.render("admin/footer", {
      footer: footer,
    });
  }

  static async update(req, res) {
    let footer = await Footer.findOne({});

    for (let id = 0; id < 4; id++) {
      let text = req.body[`text-${id}`];
      let url = req.body[`url-${id}`];
      if (!Array.isArray(url)) {
        url = [url];
      }
      if (!Array.isArray(text)) {
        text = [text];
      }
      const groupLength = text.length;
      footer.groups[id] = [];
      if (groupLength) {
        for (let i = 0; i < groupLength; i++) {
          let obj = {};

          obj.text = text[i];
          obj.url = url[i];
          if (!!text[i].length && !!url[i].length) footer.groups[id].push(obj);
        }
      }
    }

    if (!!req.file) {
      footer.img = {
        data: fs.readFileSync(
          path.join(`${__dirname}/uploads/footer/footer-bcg`)
        ),
        contentType: req.file.mimetype,
      };
    }

    await footer.save();
    await res.redirect(`/admin`);
  }
}