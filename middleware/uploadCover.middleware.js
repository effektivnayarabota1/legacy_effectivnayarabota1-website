import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    const pageSlug = req.params.slug;

    let dir = __dirname + "/uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    dir = dir + pageSlug + "/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    cb(null, dir);
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname);
  },
});

const uploadCover = multer({ storage: storage });
export default uploadCover;
