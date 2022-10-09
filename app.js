import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import hbs from "hbs";
import path from "path";
import * as dotenv from "dotenv";
import { router as adminRoutes } from "./routes/admin.routes.js";
import { router as indexRoutes } from "./routes/index.routes.js";
dotenv.config();

import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
/* const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); */
const __dirname = path.resolve();

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(process.env.MONGO_URL),
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(err) => {
			console.log("connected");
		};
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "partials"));

hbs.registerHelper("base64", function (img) {
	return `data:${img.contentType};base64,${img.data.toString("base64")}`;
	/* return `data:image/${ */
	/* 	img.contentType */
	/* };base64, ${img.data.toString("base64")}`; */
});

var port = process.env.PORT || "3000";
app.listen(port, (err) => {
	if (err) throw err;
	console.log("Server listening on port", port);
});
