import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

export const imgModel = new mongoose.model('Image', imageSchema);
