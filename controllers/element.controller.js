// import Element from "../models/element.js";
import fs from "fs";

export default class ElementController {
  static async clear() {
    Element.find({}, async (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        for (let item of items) {
          await Element.deleteOne({ slug: item.slug });
        }
        // fs.rmSync(__dirname + "/uploads/", {
        //   force: true,
        //   recursive: true,
        // });
      }
    });
  }
}
