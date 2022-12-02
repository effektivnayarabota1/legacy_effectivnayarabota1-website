import multer from "multer";
import path from "path";
import fs from "fs";

import isEmpty from "../helpers/isEmpty.js";

const __dirname = path.resolve();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		/* TODO Конвертация изображенй в веб-формат */
		/* FIX Конвертация изображенй в веб-формат */
		/* TODO Подгонка изображений в подходящее разрешение */

		let dir = __dirname + "/uploads/";
		if (isEmpty(req.params)) {
			!fs.existsSync(dir) && fs.mkdirSync(dir);
			dir = dir + "temp/";
			!fs.existsSync(dir) && fs.mkdirSync(dir);
		} else {
			dir = dir + req.params.url + "/";
		}
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		/* if (!isEmpty(req.params)) { */
		/* 	const oldFilePath = */
		/* 		__dirname + "/uploads/" + req.params.url + "/" + file.fieldname; */
		/* 	if (fs.existsSync(oldFilePath)) { */
		/* 		fs.unlink(oldFilePath, () => { */
		/* 			console.log(oldFilePath, "deleted!"); */
		/* 		}); */
		/* 	} */
		/* } */
		cb(null, `${file.fieldname}`);
	},
});

export const upload = multer({ storage: storage });
