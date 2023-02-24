import Page from "../models/page.js";
import File from "./config/file.js";

export default class ElementController {
  static async create(req, res) {
    const { pageID, blockID } = req.params;

    try {
      const page = await Page.findById(pageID);
      const block = await page.blocks.id(blockID);
      await block.elements.push({});
      await page.save();
      await res.send("OK");
    } catch (err) {
      await res.send(err);
    }
  }
  static async remove(req, res) {
    const { pageID, blockID, elementID } = req.params;

    try {
      const page = await Page.findById(pageID);
      const block = await page.blocks.id(blockID);
      if (block.elements.length - 1) {
        const element = await block.elements.id(elementID);
        await File.remove(pageID, blockID, elementID);
        await element.remove();
        await page.save();
      }
      await res.send("OK");
    } catch (err) {
      await res.send(err);
    }
  }
  // static async blank(req, res) {
  //   const pageSlug = req.params.pageSlug;
  //   const blockSlug = req.params.blockSlug;
  //
  //   const page = await Page.findOne({ slug: pageSlug });
  //   const block = page.blocks.find((block) => block.slug === blockSlug);
  //
  //   await block.elements.push({});
  //   await page.save();
  //   const slug = block.elements.at(-1).slug;
  //   res.send(slug);
  // }
  //
  // static async delete(req, res) {
  //   const pageSlug = req.params.pageSlug;
  //   const blockSlug = req.params.blockSlug;
  //   const elemSlug = req.params.elemSlug;
  //
  //   const page = await Page.findOne({ slug: pageSlug });
  //   let block = page.blocks.find((block) => block.slug === blockSlug);
  //
  //   block.elements = await block.elements.filter(
  //     (element) => element.slug !== elemSlug
  //   );
  //
  //   // если у элемента есть файл, то удалить его.
  //   const dir = `${__dirname}/uploads/${pageSlug}/${blockSlug}/${elemSlug}`;
  //   if (fs.existsSync(dir)) {
  //     await fsPromises.unlink(dir);
  //   }
  //
  //   await page.save();
  //
  //   await res.send("ok");
  // }
  //
  // static async deleteImage(req, res) {
  //   const pageSlug = req.params.pageSlug;
  //   const blockSlug = req.params.blockSlug;
  //   const elemSlug = req.params.elemSlug;
  //
  //   const page = await Page.findOne({ slug: pageSlug });
  //   let block = page.blocks.find((block) => block.slug === blockSlug);
  //
  //   let element = await block.elements.find(
  //     (element) => element.slug === elemSlug
  //   );
  //   // delete element.img;
  //   element.img = undefined;
  //
  //   console.log(element.img);
  //
  //   // если у элемента есть файл, то удалить его.
  //   const dir = `${__dirname}/uploads/${pageSlug}/${blockSlug}/${elemSlug}`;
  //   if (fs.existsSync(dir)) {
  //     await fsPromises.unlink(dir);
  //   }
  //
  //   await page.save();
  //
  //   await res.send("ok");
  // }
}
