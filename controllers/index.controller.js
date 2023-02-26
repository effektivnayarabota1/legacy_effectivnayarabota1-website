import Page from "../models/page.js";
import Header from "../models/header.js";
import Footer from "../models/footer.js";

export default class IndexController {
  static async index(req, res) {
    const pages = await Page.find({}).sort({ position: 1 });
    const header = await Header.findOne({});
    const footer = await Footer.findOne({});
    await res.render("admin/index", {
      pages: pages,
      header: header,
      footer: footer,
    });
  }

  static async rewrite(req, res) {
    const newOrder = req.body;

    await newOrder.forEach(async (id, index) => {
      const page = await Page.findById(id);
      page.position = index;
      await page.save();
    });
    await res.send("OK");
  }
}
