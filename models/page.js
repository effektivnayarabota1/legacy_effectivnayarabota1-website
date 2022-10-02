import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img: {
		data: Buffer,
		contentType: String,
	},
});

export const Page = new mongoose.model("Page", PageSchema);
