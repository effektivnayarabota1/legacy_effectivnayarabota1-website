import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  text: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
});

const FooterSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  group1: [LinkSchema],
  group2: [LinkSchema],
  group3: [LinkSchema],
});

const Footer = new mongoose.model("Footer", FooterSchema);
export default Footer;
