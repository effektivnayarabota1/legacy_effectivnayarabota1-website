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

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/script", express.static(__dirname + "/script"));

// HBS SETUP
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/.partials/"));
hbs.registerHelper("is-image", function (img) {
  if (!img) return false;
  if (!img.data) return false;
  else return true;
});
hbs.registerHelper("base64", function (img) {
  if (!img.data) return;
  else return `data:${img.contentType};base64,${img.data.toString("base64")}`;
});
hbs.registerHelper("preview", function (data) {
  if (data) {
    return data;
  } else {
    return " ";
  }
});
hbs.registerHelper("isImage", (blockType) => {
  if (blockType === "image") return true;
});
hbs.registerHelper("isText", (blockType) => {
  if (blockType === "text") return true;
});
hbs.registerHelper("isGallery", (blockType) => {
  if (blockType === "gallery") return true;
});

var port = process.env.PORT || "3000";
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port", port);
});
