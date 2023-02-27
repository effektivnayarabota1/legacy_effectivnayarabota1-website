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
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  position: {
    type: Number,
    default: Infinity,
  },
});

const BlockSchema = new mongoose.Schema({
  type: String,
  title: {
    type: String,
    default: "**",
  },
  text: {
    type: String,
    default: "",
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  position: {
    type: Number,
    default: Infinity,
  },
  elements: [ElementSchema],
});

const PageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "*",
    },
    color: {
      current: {
        type: String,
        default: "#a4a4a4",
      },
      other: [{ type: Array }],
    },
    text: {
      type: String,
      default: "",
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    position: {
      type: Number,
      default: Infinity,
    },
    thumbnail: {
      data: Buffer,
      contentType: String,
    },
    blocks: [BlockSchema],
  },
  { timestamps: true }
);

const Page = new mongoose.model("Page", PageSchema);
export default Page;
