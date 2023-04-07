import Page from "../../models/page.js";
import File from "../../config/file.js";

export default class BlockController {
  static async index(req, res) {
    const { pageID, blockID } = req.params;

    const page = await Page.findById(pageID);
    const block = await page.blocks.find((block) => {
      return block._id.toString() == blockID;
    });
    await block.elements.sort((a, b) => {
      return a.position - b.position;
    });

    await res.render("admin_block", { pageID: page.id, block });
  }

  static async create(req, res) {
    const { pageID, type } = req.params;

    const page = await Page.findById(pageID);
    await page.blocks.push({ type, elements: {} });

    await page.save();
    await res.send("OK");
  }

  static async remove(req, res) {
    const pageID = req.params.pageID;
    const blockID = req.params.blockID;

    try {
      const page = await Page.findById(pageID);
      const block = page.blocks.id(blockID);
      await block.remove();
      await File.remove(pageID, blockID);
      await page.save();
      await res.send("OK");
    } catch (err) {
      await res.send(err);
    }
  }

  static async rewrite(req, res) {
    const { pageID, blockID } = req.params;
    const page = await Page.findById(pageID);
    const block = await page.blocks.id(blockID);

    block.type = req.body.type;
    if (!Array.isArray(req.body.title)) req.body.title = [req.body.title];
    if (!Array.isArray(req.body.text)) req.body.text = [req.body.text];

    const { elements } = block;
    const files = req.files;
    for (let file of files) {
      const index = files.indexOf(file);
      const { mimetype, destination, filename, size } = file;

      const element = await elements.find((element) => {
        return element._id.toString() == filename;
      });
      element.position = index;
      element.title = req.body.title[index];
      element.text = req.body.text[index];

      if (size > 0 && mimetype != "application/octet-stream") {
        element.img = await File.write(mimetype, destination, filename);
        element.thumbnail = await File.thumbnail(destination, filename);
      }
    }
    await page.save();
    await res.send("OK");
  }
}
