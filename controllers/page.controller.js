import { marked } from "marked";

import getPixels from "get-pixels";
import palette from "image-palette";

import Page from "../models/page.js";

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
        element.text = marked.parse(element.text);
      });
    });

    await res.render("admin/page", { page });
  }

  static async meta(req, res) {
    let pageID = req.params.pageID;
    const page = await Page.findById(pageID);

    const { title, text, color, objectFit } = req.body;

    page.title = title;
    page.text = text;
    page.objectFit = objectFit;
    page.color.current = color;

    if (!!req.file) {
      const { mimetype, destination, filename } = req.file;

      page.img = await File.write(mimetype, destination, filename);
      page.thumbnail = await File.thumbnail(destination, filename);

      const url = `${destination}${filename}`;
      await new Promise((resolve, reject) => {
        getPixels(url, mimetype, async (err, pixels) => {
          if (err) {
            console.log("Bad image path");
            return;
          }
          const { _ids, colors } = palette(pixels, 9);
          page.color.other = colors;
          resolve();
        });
      });
    }

    await page.save();

    await res.redirect(`/admin/${pageID}`);
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

    for (let id of newOrder) {
      const index = newOrder.indexOf(id);

      const block = await blocks.find((block) => {
        return block._id.toString() == id;
      });
      block.position = index;
    }

    await page.save();
    await res.send("OK");
  }
}
