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
}
