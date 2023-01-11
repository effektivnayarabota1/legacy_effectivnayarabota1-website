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
  groups: [[LinkSchema], [LinkSchema], [LinkSchema], [LinkSchema]],
});

const Footer = new mongoose.model("Footer", FooterSchema);
export default Footer;
