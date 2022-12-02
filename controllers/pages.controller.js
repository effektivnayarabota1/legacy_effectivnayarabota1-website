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

  static showPageConstructor(_req, res) {
    Page.create({ title: "titile" }).then(async (page) => {
      res.render("admin/constructor-blank", { slug: page.slug });
    });
  }

  static showImageConstructor(_req, res) {
    res.render("admin/constructor_image");
  }

  static showTextConstructor(_req, res) {
    res.render("admin/constructor_text");
  }

  static showGalleryConstructor(_req, res) {
    res.render("admin/constructor_gallery");
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

  static async updatePage(req, res) {
    const { title, desc } = req.body;
    const slug = req.params.url;

    Page.findOne({ slug: slug }, async (err, page) => {
      if (err) {
        console.log(err);
      } else {
        page.title = title;
        page.desc = desc;
        await page.save(async (err, page) => {
          if (err) {
            console.log(err);
          } else {
            /* При создании страницы используется таже функция. ОБЪЕДИНИТЬ. */
            const oldDir = __dirname + `/uploads/${slug}`;
            const newDir = __dirname + `/uploads/${page.slug}`;
            await fsPromises.rename(oldDir, newDir);
            const files = await fsPromises.readdir(newDir);
            for (let file of files) {
              page.img.data = await fsPromises.readFile(
                path.join(newDir + "/" + file)
              );
            }
            await page.save((err) => console.log(err));
            await res.redirect("/admin");
          }
        });
      }
    });
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
