import slug from "mongoose-slug-updater";
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
		slug_padding_size: 2,
		index: true,
		unique: true,
	},
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
