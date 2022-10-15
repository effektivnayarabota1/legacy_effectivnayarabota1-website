import slug from "mongoose-slug-generator";
import mongoose from "mongoose";

mongoose.plugin(slug);
const PageSchema = new mongoose.Schema({
	title: String,
	desc: String,
	img: {
		data: Buffer,
		contentType: String,
	},
	slug: {
		type: String,
		slug: "title",
		slug_padding_size: 4,
		unique: true,
	},
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
