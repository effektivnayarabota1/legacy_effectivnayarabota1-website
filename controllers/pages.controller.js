import Page from "../models/page.js";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export class PagesController {
	static index(res) {
		res.render("admin");

		/* Page.find({}, (err, items) => { */
		/*     if (err) { */
		/*         console.log(err); */
		/*         res.status(500).send('An error occurred', err); */
		/*     } */
		/*     else { */
		/*         res.render('admin', { items: items }); */
		/*     } */
		/* }); */
	}

	static createPage(res) {
		res.render("admin_create-page.hbs");
	}

	static create(req, res) {
		const dir = req.file.destination;
		var obj = {
			id: req.body.id,
			title: req.body.title,
			desc: req.body.desc,
			img: {
				data: fs.readFileSync(path.join(dir + "/" + req.file.filename)),
				/* contentType: "image/png", */
			},
		};

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
