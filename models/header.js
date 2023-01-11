import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const ElemSchema = new mongoose.Schema({
  slug: {
    slug: "slug",
    type: String,
    // unique: true,
    forceIdSlug: true,
    permanent: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const HeaderSchema = new mongoose.Schema({
  title: String,
  elements: [ElemSchema],
});

const Header = new mongoose.model("Header", HeaderSchema);
export default Header;
