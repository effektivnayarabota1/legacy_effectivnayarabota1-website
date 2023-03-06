import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
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

const HeaderSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  delay: {
    type: Number,
    default: 0.667,
  },
  gif: {
    data: Buffer,
    contentType: String,
  },
  objectFit: {
    type: String,
    default: "contain",
  },
  color: {
    current: {
      type: String,
      default: "#a4a4a4",
    },
    other: [{ type: Array }],
  },
  elements: [ElementSchema],
});

const Header = new mongoose.model("Header", HeaderSchema);
export default Header;
