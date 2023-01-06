import slug from "mongoose-slug-updater";
import mongoose from "mongoose";

mongoose.plugin(slug);

const ElementSchema = new mongoose.Schema({
  desc: {
    type: String,
    default: "",
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  slug: {
    slug: "slug",
    type: String,
    // unique: true,
    forceIdSlug: true,
    permanent: true,
  },
});

const BlockSchema = new mongoose.Schema({
  title: String,
  type: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  elements: [ElementSchema],
  slug: {
    slug: "title",
    type: String,
    slugPaddingSize: 2,
    index: true,
    uniqueGroupSlug: "/_id",
    permanent: true,
    // unique: true,
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
