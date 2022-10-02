import { Page } from "../models/page.js";

import fs from "fs";

export class PagesController {
	static index(res) {
		res.render("admin");

		/* pageModel.find({}, (err, items) => { */
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
		console.log("create");

		/* var obj = { */
		/* 	name: req.body.name, */
		/* 	desc: req.body.desc, */
		/* 	img: { */
		/* 		data: fs.readFileSync( */
		/* 			path.join(__dirname + "/uploads/" + req.file.filename) */
		/* 		), */
		/* 		contentType: "image/png", */
		/* 	}, */
		/* }; */
		/* Page.create(obj, (err, item) => { */
		/* 	if (err) { */
		/* 		console.log(err); */
		/* 	} else { */
		/* 		// item.save(); */
		/* 		res.redirect("/"); */
		/* 	} */
		/* }); */
	}
}
