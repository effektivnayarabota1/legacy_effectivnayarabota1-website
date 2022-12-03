import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

export const ElementSchema = new mongoose.Schema({
  blockSlug: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  desc: String,
  slug: {
    type: String,
    slug: "blockSlug",
    slugPaddingSize: 2,
    index: true,
    unique: true,
  },
});

const Element = new mongoose.model("ImageElement", ElementSchema);
export default Element;
