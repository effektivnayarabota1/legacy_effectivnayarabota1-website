import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const __dirname = path.resolve();

export default class HeaderController {
  static async edit(req, res) {
    console.log("header");
  }
}
