import slug from "mongoose-slug-updater";
import mongoose from "mongoose";

mongoose.plugin(slug);

const ElementSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "***",
  },
  text: {
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
    forceIdSlug: true,
    permanent: true,
  },
});

const BlockSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "**",
  },
  type: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  elements: [ElementSchema],
  slug: {
    slug: "slug",
    type: String,
    forceIdSlug: true,
    permanent: true,
  },
});

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "*",
  },
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  blocks: [BlockSchema],
  slug: {
    slug: "slug",
    type: String,
    forceIdSlug: true,
    permanent: true,
  },
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
