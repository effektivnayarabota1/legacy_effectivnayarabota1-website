import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  text: String,
  url: String,
});

const FooterSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  "link-group-1": [LinkSchema],
  "link-group-2": [LinkSchema],
  "link-group-3": [LinkSchema],
  "link-group-4": [LinkSchema],
});

const Footer = new mongoose.model("Footer", FooterSchema);
export default Footer;
