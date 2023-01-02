import slug from "mongoose-slug-updater";
import mongoose from "mongoose";

mongoose.plugin(slug);

// const ElementSchema = new mongoose.Schema({
//   desc: {
//     type: String,
//     default: "",
//   },
//   img: {
//     data: Buffer,
//     contentType: String,
//   },
//   slug: {
//     slug: "title",
//     type: String,
//     slugPaddingSize: 2,
//     index: true,
//     unique: true,
//   },
// });

const BlockSchema = new mongoose.Schema({
  type: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  // elements: [ElementSchema],
  slug: {
    slug: "type",
    type: String,
    slugPaddingSize: 2,
    index: true,
    // unique: true,
    uniqueGroupSlug: "/_id",
  },
});

const PageSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  blocks: [BlockSchema],
  slug: {
    slug: "title",
    type: String,
    slugPaddingSize: 1,
    index: true,
    unique: true,
  },
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
