import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img: {
		data: Buffer,
		/* contentType: String, */
	},
});

const Page = new mongoose.model("Page", PageSchema);
export default Page;
