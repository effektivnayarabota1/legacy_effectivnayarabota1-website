import { ElementSchema } from "./element.js";
import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

export const BlockSchema = new mongoose.Schema({
  title: String,
  type: String,
  pageSlug: String,
  elements: [ElementSchema],
  slug: {
    type: String,
    slug: "title",
    slugPaddingSize: 2,
    index: true,
    unique: true,
  },
});

const Block = new mongoose.model("ImageBlock", BlockSchema);
export default Block;
