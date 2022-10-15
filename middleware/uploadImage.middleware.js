import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		/* TODO Конвертация изображенй в веб-формат */
		/* TODO Подгонка изображений в подходящее разрешение */

		let dir = __dirname + "/uploads/";
		!fs.existsSync(dir) && fs.mkdirSync(dir);
		dir = dir + "temp/";
		!fs.existsSync(dir) && fs.mkdirSync(dir);
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		/* TODO Сделать замену пробелов на подчеркивания в названии файлов */
		cb(null, `${file.fieldname}`);
	},
});

export const upload = multer({ storage: storage });
