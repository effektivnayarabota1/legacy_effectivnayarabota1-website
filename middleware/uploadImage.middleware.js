import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		/* TODO Конвертация изображенй в веб-формат */
		/* TODO Подгонка изображений в подходящее разрешение */

		const pageId = req.body.pageId;
		const dir = __dirname + "/uploads/" + pageId;
		!fs.existsSync(dir) && fs.mkdirSync(dir);
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		/* TODO Сделать замену пробелов на подчеркивания в названии файлов */

		const pageId = req.body.pageId;
		const format = file.mimetype.split("/")[1];
		/* cb(null, `${pageId}-${file.fieldname}.${format}`); */
		cb(null, `${pageId}-${file.fieldname}`);
	},
});

export const upload = multer({ storage: storage });
