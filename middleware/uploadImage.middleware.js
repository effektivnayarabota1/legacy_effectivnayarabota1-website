import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		/* TODO Конвертация изображенй в веб-формат */
		/* TODO Подгонка изображений в подходящее разрешение */

		const id = req.body.id;
		const dir = __dirname + "/uploads/" + id;
		!fs.existsSync(dir) && fs.mkdirSync(dir);
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		/* TODO Сделать замену пробелов на подчеркивания в названии файлов */

		const id = req.body.id;
		const format = file.mimetype.split("/")[1];
		cb(null, `${id}-${file.fieldname}.${format}`);
	},
});

export const upload = multer({ storage: storage });
