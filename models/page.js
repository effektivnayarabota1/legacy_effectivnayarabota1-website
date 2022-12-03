import { BlockSchema } from "./block.js";
import slug from "mongoose-slug-updater";
import mongoose from "mongoose";

mongoose.plugin(slug);

const PageSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  blocks: [BlockSchema],
  slug: {
    type: String,
    slug: "title",
    slugPaddingSize: 2,
    index: true,
    unique: true,
  },
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
