import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storageElems = multer.diskStorage({
  destination: function (req, _file, cb) {
    let dir = __dirname + "/uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    dir = dir + "header/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, _file, cb) {
    let elemSlug = req.body["element-slug"];
    if (!Array.isArray(elemSlug)) elemSlug = [elemSlug];
    console.log(elemSlug);
    cb(null, elemSlug.at(-1));
  },
});

const uploadElems = multer({ storage: storageElems });
export default uploadElems;
