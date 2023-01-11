import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storageElems = multer.diskStorage({
  destination: function (req, _file, cb) {
    const pageSlug = req.params.pageSlug;
    const blockSlug = req.params.blockSlug;

    let dir = __dirname + "/uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    dir = dir + pageSlug + "/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    dir = dir + blockSlug + "/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, _file, cb) {
    // console.log(req.body["element-slug"]);
    let elemSlug = req.body["element-slug"];
    if (!Array.isArray(elemSlug)) elemSlug = [elemSlug];
    cb(null, elemSlug.at(-1));
  },
});

const uploadElems = multer({ storage: storageElems });
export default uploadElems;
