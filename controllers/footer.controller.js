import Footer from "../models/footer.js";

import path from "path";

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

  static async rewrite(_req, res) {
    console.log("rewrite");
  }
}
