import Page from "../models/page.js";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export class PagesController {
	static index(res) {
		/* res.render("admin"); */

		Page.find({}, async (err, items) => {
			if (err) {
				console.log(err);
				res.status(500).send("An error occurred", err);
			} else {
				await res.render("admin", { items: items });
			}
		});
	}

	static clear(res) {
		Page.find({}, async (err, items) => {
			if (err) {
				console.log(err);
				res.status(500).send("An error occurred", err);
			} else {
				for (let item of items) {
					await Page.deleteOne({ pageId: item.pageId });
				}
				await res.render("admin", { items: items });
			}
		});
	}

	static createPage(res) {
		res.render("admin_create-page.hbs");
	}

	static create(req, res) {
		const dir = req.file.destination;
		console.log(req.file);
		var obj = {
			pageId: req.body.pageId,
			title: req.body.title,
			desc: req.body.desc,
			img: {
				data: fs.readFileSync(path.join(dir + "/" + req.file.filename)),
				contentType: req.file.mimetype,
			},
		};
		console.log(obj.img.data);

		Page.create(obj, (err, item) => {
			if (err) {
				console.log(err);
			} else {
				item.save();
				res.redirect("/admin");
			}
		});
	}
}
