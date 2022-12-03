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
        // await res.render("admin/index", { items: items });
        await res.render("admin/index");
      }
    });
  }

  static createPage(_req, res) {
    Page.create({ title: "titile" }).then(async (page) => {
      await res.redirect(`/admin/${page.slug}`);
    });
  }

  static showPageConstructor(req, res) {
    const slug = req.params.slug;
    res.render("admin/constructor-blank", { slug: slug });
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

  // static createPage(req, res) {
  //   const { title, desc } = req.body;
  //
  //   let obj = {
  //     title: title,
  //     desc: desc,
  //   };
  //
  //   Page.create(obj).then(async (page) => {
  //     const newDir = __dirname + `/uploads/${page.slug}`;
  //     fs.renameSync(req.file.destination, newDir);
  //
  //     page.img = {
  //       data: fs.readFileSync(path.join(newDir + "/" + req.file.filename)),
  //       contentType: req.file.mimetype,
  //     };
  //     await page.save((err) => console.log(err));
  //     await res.redirect("/admin");
  //   });
  // }

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
