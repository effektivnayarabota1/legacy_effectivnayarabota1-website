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
    cb(null, req.body["element-slug"]);
  },
});

export const upload = multer({ storage: storage });
export const uploadElems = multer({ storage: storageElems });
