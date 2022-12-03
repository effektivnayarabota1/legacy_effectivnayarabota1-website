import Page from "../models/page.js";
import Block from "../models/block.js";
import Element from "../models/element.js";

import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import isEmpty from "../helpers/isEmpty.js";

const __dirname = path.resolve();

export class PagesController {
  static index(res) {
    Page.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        await res.render("admin/index", { items: items });
      }
    });
  }

  static createPage(_req, res) {
    Page.create({ title: "titile" }).then(async (page) => {
      await res.redirect(`/admin/${page.slug}`);
    });
  }

  static async updatePage(req, res) {
    let page = await Page.findOne({ slug: req.params.slug });
    page.title = req.body.title || "title";
    page.desc = req.body.desc;
    await page.save();
    await res.redirect("/admin");
  }

  static async deletePage(req, res) {
    await Page.deleteOne({ slug: req.params.slug });
    await res.redirect(303, "/admin");
  }

  static async showPageConstructor(req, res) {
    const slug = req.params.slug;
    const page = await Page.findOne({ slug: slug });
    const blocks = await Block.find({ pageSlug: slug });
    // const elems = await Element.find({ pageSlug: slug });
    console.log(blocks);

    await res.render("admin/constructor", {
      slug: slug,
      title: page.title,
      desc: page.desc,
      blocks: blocks,
    });
  }

  static createBlock(req, res) {
    const { type, slug } = req.params;
    Block.create({ type: type, title: type + "-" + slug, pageSlug: slug }).then(
      async (block) => {
        await res.redirect(`/admin/${block.pageSlug}/${block.slug}`);
      }
    );
  }

  static async showBlockConstructor(req, res) {
    const { pageSlug, slug } = req.params;
    const type = slug.split("-").at(0);
    const block = await Block.findOne({ slug: slug });
    console.log(block);
    if (type == "image") {
      await res.render("admin/constructor_image", {
        pageSlug: pageSlug,
        slug: slug,
      });
    }
  }

  static async updateBlock(req, res) {
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.slug;
    const descs = req.body.desc;

    let block = await Block.findOne({ slug: blockSlug });
    for (let desc of descs) {
      await Element.create({ desc: desc, blockSlug: req.params.slug }).then(
        async (element) => {
          await block.elements.push(element);
        }
      );
    }
    let page = await Page.findOne({ slug: pageSlug });
    await page.blocks.push(block);
    await block.save();
    await page.save();

    await res.redirect(`/admin/${req.params.pageSlug}`);
  }

  /* TODO Сервисный запрос. Избавиться от него. */
  static clear(res) {
    Page.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Page.deleteOne({ pageId: item.pageId });
        }
        fs.rmSync(__dirname + "/uploads/", {
          force: true,
          recursive: true,
        });
      }
    });
    Block.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Block.deleteOne({ slug: item.slug });
        }
        fs.rmSync(__dirname + "/uploads/", {
          force: true,
          recursive: true,
        });
      }
    });
    Element.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Element.deleteOne({ slug: item.slug });
        }
        fs.rmSync(__dirname + "/uploads/", {
          force: true,
          recursive: true,
        });
        await res.redirect("/admin");
      }
    });
  }
}
