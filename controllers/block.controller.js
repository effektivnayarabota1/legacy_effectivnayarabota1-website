import Page from "../models/page.js";

import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

const __dirname = path.resolve();

export default class BlockController {
  static async create(req, res) {
    const { pageId, type } = req.params;

    const page = await Page.findById(pageId);
    await page.blocks.push({ type, elements: {} });

    await page.save();
    await res.send("OK");
  }

  // static async editor(req, res) {
  //   const pageSlug = req.params.pageSlug;
  //   const blockSlug = req.params.blockSlug;
  //
  //   const page = await Page.findOne({ slug: pageSlug });
  //   const block = page.blocks.find((block) => block.slug === blockSlug);
  //   const blockType = block.type;
  //   const blockElems = block.elements;
  //
  //   await res.render("admin/block", {
  //     pageSlug,
  //     blockSlug,
  //     blockType,
  //     blockElems,
  //   });
  // }
  //
  // static async update(req, res) {
  //   const pageSlug = req.params.pageSlug;
  //   const blockSlug = req.params.blockSlug;
  //   const blockType = req.body.blockType;
  //
  //   let page = await Page.findOne({ slug: pageSlug });
  //   let block = page.blocks.find((block) => block.slug === blockSlug);
  //   let elements = block.elements;
  //   block.type = blockType;
  //
  //   let reqBody = [];
  //   if (!Array.isArray(req.body.desc)) {
  //     req.body.desc = [req.body.desc];
  //   }
  //   if (!Array.isArray(req.body["element-slug"])) {
  //     req.body["element-slug"] = [req.body["element-slug"]];
  //   }
  //   req.body["element-slug"].forEach(async (elemSlug, index) => {
  //     reqBody.push({ slug: elemSlug, desc: req.body.desc[index] });
  //   });
  //
  //   for (let file of req.files) {
  //     const element = reqBody.find((element) => element.slug === file.filename);
  //     element.img = {
  //       data: fs.readFileSync(
  //         path.join(
  //           `${__dirname}/uploads/${pageSlug}/${blockSlug}/${file.filename}`
  //         )
  //       ),
  //       contentType: file.mimetype,
  //     };
  //   }
  //
  //   let outputElems = [];
  //   for (let reqElem of reqBody) {
  //     const reqElemSlug = reqElem.slug;
  //
  //     const dbElem = await elements.find(
  //       (element) => element.slug === reqElemSlug
  //     );
  //     if (!!dbElem) {
  //       if (!!dbElem.img && !reqElem.img) reqElem.img = dbElem.img;
  //     }
  //     outputElems.push(reqElem);
  //   }
  //
  //   block.elements = outputElems;
  //
  //   await page.save();
  //   await res.redirect(303, `/admin/${pageSlug}`);
  // }
  //
  // static async delete(req, res) {
  //   const pageSlug = req.params.pageSlug;
  //   const blockSlug = req.params.blockSlug;
  //
  //   let page = await Page.findOne({ slug: pageSlug });
  //   const block = await page.blocks.find((block) => block.slug === blockSlug);
  //   // page.blocks = await page.blocks.filter((block) => block.slug !== blockSlug);
  //   await block.remove();
  //
  //   const dir = `${__dirname}/uploads/${pageSlug}/${blockSlug}/`;
  //   if (fs.existsSync(dir)) {
  //     await fsPromises.rm(dir, {
  //       force: true,
  //       recursive: true,
  //     });
  //   }
  //
  //   await page.save();
  //   await res.redirect(303, `/admin/${pageSlug}`);
  // }
}
