import Page from "../models/page.js";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import isEmpty from "../helpers/isEmpty.js";

const __dirname = path.resolve();

export class PagesController {
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

  static createPage(_req, res) {
    Page.create({ title: "titile" }).then(async (page) => {
      await res.redirect(`/admin/${page.slug}`);
    });
  }

  static async updatePage(req, res) {
    let page = await Page.findOne({ slug: req.params.slug });
    page.title = req.body.title || "title";
    page.desc = req.body.desc;
    await page.save();
    await res.redirect("/admin");
  }

  static async deletePage(req, res) {
    console.log("delete");
    await Page.deleteOne({ slug: req.params.slug });
    await res.redirect(303, "/admin");
  }

  static async showPageConstructor(req, res) {
    const slug = req.params.slug;
    let page = await Page.findOne({ slug: slug });

    await res.render("admin/constructor-blank", {
      slug: slug,
      title: page.title,
      desc: page.desc,
    });
  }

  static showImageConstructor(req, res) {
    const slug = req.params.slug;
    res.render("admin/constructor_image", { slug: slug });
  }

  static showTextConstructor(req, res) {
    const slug = req.params.slug;
    res.render("admin/constructor_text", { slug: slug });
  }

  static showGalleryConstructor(req, res) {
    const slug = req.params.slug;
    res.render("admin/constructor_gallery", { slug: slug });
  }

  /* TODO Сервисный запрос. Избавиться от него. */
  static clear(res) {
    Page.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Page.deleteOne({ pageId: item.pageId });
        }
        fs.rmSync(__dirname + "/uploads/", {
          force: true,
          recursive: true,
        });
        await res.redirect("/admin");
      }
    });
  }
}
