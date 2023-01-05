import Page from "../models/page.js";

import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import isEmpty from "../helpers/isEmpty.js";

const __dirname = path.resolve();

export default class PageController {
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

  static async create(_req, res) {
    const page = await Page.create({ title: "title" });
    await res.redirect(`/admin/${page.slug}`);
  }

  static async update(req, res) {
    let pageSlug = req.params.slug;
    let page = await Page.findOne({ slug: pageSlug });
    page.title = req.body.title || "title";
    page.desc = req.body.desc;

    if (!!req.file) {
      page.img = {
        data: fs.readFileSync(
          path.join(`${__dirname}/uploads/${pageSlug}/${req.file.filename}`)
        ),
        contentType: req.file.mimetype,
      };
    }

    await page.save();

    if (pageSlug !== page.slug) {
      const oldPath = `${__dirname}/uploads/${pageSlug}/`;
      const newPath = `${__dirname}/uploads/${page.slug}/`;
      await fsPromises.rename(oldPath, newPath);

      if (!!req.file) {
        page.img = {
          data: fs.readFileSync(
            path.join(`${__dirname}/uploads/${page.slug}/${req.file.filename}`)
          ),
          contentType: req.file.mimetype,
        };
      }
    }

    page.save();

    await res.redirect("/admin");
  }

  static async delete(req, res) {
    const pageSlug = req.params.slug;
    const page = await Page.findOne({ slug: pageSlug });
    const pageDir = `${__dirname}/uploads/${pageSlug}/`;
    await page.remove();
    await fsPromises.rm(pageDir, {
      force: true,
      recursive: true,
    });

    await res.redirect(303, "/admin");
  }

  static async editor(req, res) {
    const slug = req.params.slug;
    const page = await Page.findOne({ slug: slug });

    await res.render("admin/constructor_page", {
      slug: slug,
      title: page.title || "title",
      desc: page.desc,
      blocks: page.blocks,
    });
  }

  /* TODO Сервисный запрос. Избавиться от него. */
  static async clear(res) {
    Page.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Page.deleteOne({ pageId: item.pageId });
        }
        await fsPromises.rm(__dirname + "/uploads/", {
          force: true,
          recursive: true,
        });
      }
    });
  }

  static async clearAll(res) {
    // await ElementController.clear();
    // await BlockController.clear();
    await this.clear();
    await res.redirect("/admin");
  }
}
