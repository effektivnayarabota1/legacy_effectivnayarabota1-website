import slug from "mongoose-slug-updater";
import mongoose from "mongoose";

mongoose.plugin(slug);

const ElementSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "***",
  },
  desc: {
    type: String,
    default: "***",
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  // slug: {
  //   slug: "slug",
  //   type: String,
  //   forceIdSlug: true,
  //   permanent: true,
  // },
});

const BlockSchema = new mongoose.Schema({
  type: String,
  title: {
    type: String,
    default: "**",
  },
  desc: {
    type: String,
    default: "**",
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  // slug: {
  //   slug: "slug",
  //   type: String,
  //   forceIdSlug: true,
  //   permanent: true,
  // },
  elements: [ElementSchema],
});

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "*",
  },
  desc: {
    type: String,
    default: "*",
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  // slug: {
  //   slug: "slug",
  //   type: String,
  //   forceIdSlug: true,
  //   permanent: true,
  // },
  blocks: [BlockSchema],
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
