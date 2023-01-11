import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    let dir = __dirname + "/uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    dir = dir + "/footer/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    cb(null, dir);
  },
  filename: function (_req, file, cb) {
    cb(null, "footer-bcg");
  },
});

const uploadFooter = multer({ storage: storage });
export default uploadFooter;
