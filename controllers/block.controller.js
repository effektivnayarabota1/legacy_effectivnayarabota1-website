import Page from "../models/page.js";

import path from "path";
import fs from "fs";
// import fsPromises from "fs/promises";

const __dirname = path.resolve();

export default class BlockController {
  static async create(req, res) {
    const pageSlug = req.params.pageSlug;

    let page = await Page.findOne({ slug: pageSlug });
    await page.blocks.push({ title: "block", type: "image" });
    await page.save();
    const blockSlug = page.blocks.at(-1).slug;

    await res.redirect(`/admin/${pageSlug}/${blockSlug}`);
  }

  static async editor(req, res) {
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.blockSlug;

    const page = await Page.findOne({ slug: pageSlug });
    const block = page.blocks.find((block) => block.slug === blockSlug);
    const blockType = block.type;
    const blockElems = block.elements;

    await res.render("admin/constructor_block", {
      pageSlug,
      blockSlug,
      blockType,
      blockElems,
    });
  }

  static async update(req, res) {
    // TODO При обновлении блока, все старые ссылки слетают.
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.blockSlug;
    const blockType = req.body.blockType;

    let page = await Page.findOne({ slug: pageSlug });
    let block = page.blocks.find((block) => block.slug === blockSlug);
    block.type = blockType;

    block.elements = [];
    let descs = req.body.desc;
    let elemSlugs = req.body["element-slug"];

    if (!Array.isArray(elemSlugs)) {
      elemSlugs = [elemSlugs];
      descs = [descs];
    }

    elemSlugs.forEach((elemSlug, index) => {
      block.elements.push({ slug: elemSlug, desc: descs[index] });
    });

    if (req.files.length) {
      for (let file of req.files) {
        const filename = file.filename;
        const elements = block.elements;
        const element = await elements.find(
          (element) => element.slug === filename
        );
        element.img = {
          data: fs.readFileSync(
            path.join(
              `${__dirname}/uploads/${pageSlug}/${blockSlug}/${filename}`
            )
          ),
          contentType: file.mimetype,
        };
      }
    }

    await page.save();
    await res.redirect(303, `/admin/${pageSlug}`);
  }

  static async delete(req, res) {
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.blockSlug;

    let page = await Page.findOne({ slug: pageSlug });
    const block = await page.blocks.find((block) => block.slug === blockSlug);
    // page.blocks = await page.blocks.filter((block) => block.slug !== blockSlug);
    await block.remove();
    await page.save();
    await res.redirect(303, `/admin/${pageSlug}`);
  }
}
