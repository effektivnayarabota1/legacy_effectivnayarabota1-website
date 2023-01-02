import Page from "../models/page.js";

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

    await res.render("admin/constructor_block", {
      pageSlug,
      blockSlug,
      blockType,
    });
  }

  static async update(req, res) {
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.blockSlug;
    const blockType = req.body.blockType;

    let page = await Page.findOne({ slug: pageSlug });
    let block = page.blocks.find((block) => block.slug === blockSlug);
    block.type = blockType;

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
