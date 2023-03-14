import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  text: {
    type: String,
    default: "",
  },
});

const FooterSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  objectFit: {
    type: String,
    default: "cover",
  },
  objectPosition: {
    type: String,
    default: "50% 50%",
  },
  color: {
    current: {
      type: String,
      default: "#a4a4a4",
    },
    other: [{ type: Array }],
  },
  group1: [ElementSchema],
  group2: [ElementSchema],
  group3: [ElementSchema],
});

const Footer = new mongoose.model("Footer", FooterSchema);
export default Footer;
