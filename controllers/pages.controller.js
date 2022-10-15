import Page from "../models/page.js";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export class PagesController {
	static index(res) {
		Page.find({}, async (err, items) => {
			if (err) {
				console.log(err);
				res.status(500).send("An error occurred", err);
			} else {
				await res.render("admin", { items: items });
			}
		});
	}

	static showPage(req, res) {
		const pageId = req.params.pageId;

		Page.find({ pageId: pageId }, async (err, item) => {
			if (err) {
				console.log(err);
				res.status(500).send("An error occurred", err);
			} else {
				await res.render("admin_create-page", { item: item[0] });
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
					console.log("delete");
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

	static showPageConstructor(res) {
		res.render("admin_create-page.hbs");
	}

	static async createPage(req, res) {
		const { title, desc } = req.body;

		let obj = {
			title: title,
			desc: desc,
		};

		let slug;
		await Page.create(obj).then((page) => {
			slug = page.slug;
			const newDir = __dirname + `/uploads/${slug}`;
			fs.renameSync(req.file.destination, newDir);
			console.log(req.file.filename);
			obj.img = {
				data: fs.readFileSync(
					path.join(newDir + "/" + req.file.filename)
				),
				contentType: req.file.mimetype,
			};
			Page.findOneAndUpdate({ slug: slug }, obj, (err, item) => {
				if (err) {
					console.log(err);
				} else {
					item.save();
				}
			});
		});

		await res.redirect("/admin");
	}

	static updatePage(req, res) {
		const query = { pageId: req.body.oldPageId };
		let obj = {
			pageId: req.body.pageId,
			title: req.body.title,
			desc: req.body.desc,
		};
		if (req.file) {
			/* TODO Удаление старого файла */
			const dir = req.file.destination;
			obj.img = {
				data: fs.readFileSync(path.join(dir + "/" + req.file.filename)),
				contentType: req.file.mimetype,
			};
		}
		Page.findOneAndUpdate(query, obj, (err, item) => {
			if (err) {
				console.log(err);
			} else {
				item.save();
				res.redirect("/admin");
			}
		});
	}
}
