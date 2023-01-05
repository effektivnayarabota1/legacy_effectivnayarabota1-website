import Page from "../models/page.js";

export default class ElementController {
  static async blank(req, res) {
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.blockSlug;

    const page = await Page.findOne({ slug: pageSlug });
    const block = page.blocks.find((block) => block.slug === blockSlug);

    await block.elements.push({});
    await page.save();
    const slug = block.elements.at(-1).slug;
    res.send(slug);
  }
}
