import Footer from "../models/footer.js";

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export default class FooterController {
  static async index(_req, res) {
    let footer = await Footer.findOne({});
    if (!footer) footer = await Footer.create({});
    await res.render("admin/footer");
  }

  static async update(req, res) {
    let footer = await Footer.findOne({});

    console.log(req.body);

    for (let id = 1; id <= 4; id++) {
      const text = req.body[`text-${id}`];
      const url = req.body[`url-${id}`];
      const groupLength = text.length;
      footer[`link-group-${id}`] = [];
      if (groupLength) {
        for (let i = 0; i < groupLength; i++) {
          let obj = {};

          obj.text = text[i];
          obj.url = url[i];

          footer[`link-group-${id}`].push(obj);
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
