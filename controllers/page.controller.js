import { marked } from "marked";

import Page from "../models/page.js";
import Header from "../models/header.js";
import Footer from "../models/footer.js";

import File from "./config/file.js";

export default class PageController {
  static async index(req, res) {
    let pageID = req.params.pageID;
    let page = await Page.findById(pageID);

    await page.blocks.sort((a, b) => {
      return a.position - b.position;
    });

    page.blocks.forEach((block) => {
      block.elements.forEach((element) => {
        element.desc = marked.parse(element.desc);
      });
    });

    await res.render("admin/page", { page });
  }

  static async create(_req, res) {
    try {
      await Page.create({});
      await res.send("OK");
    } catch (err) {
      await res.send(err);
    }
  }

  static async remove(req, res) {
    const pageID = req.params.pageID;

    try {
      await Page.deleteOne({ _id: pageID });
      await File.remove(pageID);
      await res.send("OK");
    } catch (err) {
      await res.send(err);
    }
  }

  static async rewrite(req, res) {
    const { pageID } = req.params;
    const newOrder = req.body;

    const page = await Page.findById(pageID);
    const { blocks } = page;

    await newOrder.forEach(async (id, index) => {
      const block = await blocks.find((block) => {
        return block._id.toString() == id;
      });
      block.position = index;
    });
    await page.save();

    await res.send("OK");
  }

  static async meta(req, res) {
    let pageID = req.params.pageID;
    const page = await Page.findById(pageID);

    const { title, desc, color } = req.body;

    page.title = title;
    page.desc = desc;
    page.color = color;

    if (!!req.file) {
      page.img = await File.write(req.file);
    }

    await page.save();

    await res.redirect(`/admin/${pageID}`);
  }
}
