import Page from "../models/page.js";
import Header from "../models/header.js";
import Footer from "../models/footer.js";

import File from "./config/file.js";

export default class PageController {
  static async index(req, res) {
    const pages = await Page.find({}).sort({ position: 1 });
    const header = await Header.findOne({});
    const footer = await Footer.findOne({});
    await res.render("admin/index", {
      pages: pages,
      header: header,
      footer: footer,
    });
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

    // const page = await Page.findOne({ slug: pageSlug });
    // const pageDir = `${__dirname}/uploads/${pageSlug}/`;
    // await page.remove();
    // await fsPromises.rm(pageDir, {
    //   force: true,
    //   recursive: true,
    // });
    // await res.redirect(303, "/admin");
  }

  static async rewriteIndex(req, res) {
    const newOrder = req.body;

    await newOrder.forEach(async (id, index) => {
      const page = await Page.findById(id);
      page.position = index;
      await page.save();
    });
    await res.send("OK");
  }

  static async rewrite(req, res) {
    const { pageID } = req.params;
    const newOrder = req.body;

    const page = await Page.findById(pageID);
    const { blocks } = page;

    await newOrder.forEach(async (id, index) => {
      const block = await blocks.find((block) => {
        return block._id.toString() == id;
      });
      block.position = index;
    });
    await page.save();

    await res.send("OK");
  }

  static async indexPage(req, res) {
    let pageID = req.params.pageID;
    let page = await Page.findById(pageID);

    await page.blocks.sort((a, b) => {
      return a.position - b.position;
    });

    await res.render("admin/page", { page });
  }

  static async meta(req, res) {
    let pageID = req.params.pageID;
    const page = await Page.findById(pageID);

    const { title, desc, color } = req.body;

    page.title = title;
    page.desc = desc;
    page.color = color;

    if (!!req.file) {
      page.img = await File.write(req.file);
    }

    await page.save();

    await res.redirect(`/admin/${pageID}`);
  }

  // static async update(req, res) {
  //   let pageSlug = req.params.slug;
  //   let page = await Page.findOne({ slug: pageSlug });
  //   page.title = req.body.title || "title";
  //   page.desc = req.body.desc;
  //
  //   if (!!req.file) {
  //     page.img = {
  //       data: fs.readFileSync(
  //         path.join(`${__dirname}/uploads/${pageSlug}/${req.file.filename}`)
  //       ),
  //       contentType: req.file.mimetype,
  //     };
  //   }
  //
  //   await page.save();
  //
  //   if (pageSlug !== page.slug) {
  //     const oldPath = `${__dirname}/uploads/${pageSlug}/`;
  //     const newPath = `${__dirname}/uploads/${page.slug}/`;
  //     await fsPromises.rename(oldPath, newPath);
  //
  //     if (!!req.file) {
  //       page.img = {
  //         data: fs.readFileSync(
  //           path.join(`${__dirname}/uploads/${page.slug}/${req.file.filename}`)
  //         ),
  //         contentType: req.file.mimetype,
  //       };
  //     }
  //   }
  //
  //   page.save();
  //
  //   await res.redirect("/admin");
  // }

  // static async editor(req, res) {
  //   const slug = req.params.slug;
  //   const page = await Page.findOne({ slug: slug });
  //
  //   await res.render("admin/page", {
  //     slug: slug,
  //     title: page.title,
  //     img: page.img,
  //     desc: page.desc,
  //     blocks: page.blocks,
  //   });
  // }
}
