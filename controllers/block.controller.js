// import Block from "../models/block.js";
import { Page } from "../models/page.js";
import fs from "fs";

export default class BlockController {
  static async create(req, res) {
    const { type, slug } = req.params;
    const page = await Page.findOne({ slug: slug });

    await page.blocks.push({
      type: type,
    });
    await page.save();
    const block = page.blocks.at(-1);
    await res.redirect(`/admin/${page.slug}/${block.slug}`);
  }

  static async editor(req, res) {
    const { pageSlug, blockSlug } = req.params;
    const page = await Page.findOne({ slug: pageSlug });
    const blocks = page.blocks;
    const block = blocks.find((block) => block.slug == blockSlug);

    const type = block.type;
    const slug = block.slug;
    let elements = block.elements;
    if (!elements.length) elements = [{ desc: "" }];
    if (type == "image") {
      await res.render("admin/constructor_image", {
        pageSlug: pageSlug,
        slug: slug,
        elements: elements,
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

  static async clear() {
    Block.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Block.deleteOne({ slug: item.slug });
        }
        // fs.rmSync(__dirname + "/uploads/", {
        //   force: true,
        //   recursive: true,
        // });
      }
    });
  }
}
