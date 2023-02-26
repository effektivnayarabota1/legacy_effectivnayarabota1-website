import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import hbs from "hbs";
import path from "path";
import * as dotenv from "dotenv";

import { router as adminRoutes } from "./routes/admin.routes.js";
import { router as indexRoutes } from "./routes/index.routes.js";
import checkAuth from "./middleware/checkAuth.moddleware.js";

dotenv.config();

import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __dirname = path.resolve();

// MONGOOSE SETUP
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(process.env.MONGO_URL),
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//       console.log("connected");
//     };
// }
mongoose.connect(process.env.MONGO_URL, () =>
  console.log("Mongoose connected")
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

// COOKIE SETUP
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["admin2002"],
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", indexRoutes);
app.use("/admin", checkAuth, adminRoutes);
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/style", express.static(__dirname + "/style"));
app.use("/script", express.static(__dirname + "/script"));

// HBS SETUP
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/.partials/"));
hbs.registerHelper("is-image", function (img) {
  if (!img) return false;
  if (!img.data) return false;
  else return true;
});
hbs.registerHelper("preview", function (data) {
  if (data) {
    return data;
  } else {
    return " ";
  }
});

hbs.registerHelper("image", function (context, options) {
  if (!this.img || !this.img.data) return `ui/image_empty`;
  return `ui/image`;
});
hbs.registerHelper("base64", function (img) {
  if (!img.data) return;
  else return `data:${img.contentType};base64,${img.data.toString("base64")}`;
});

hbs.registerHelper("isRadioChecked", function (context, options) {
  const blockType = options.data.root.block.type;
  const radioType = context;
  if (blockType == radioType) return "checked";
  else return;
});

var port = process.env.PORT || "3000";
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port", port);
});
