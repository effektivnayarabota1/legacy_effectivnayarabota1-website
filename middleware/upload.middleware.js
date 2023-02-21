import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    let dir;
    const url = req.url;
    if (url.split("/").includes("meta")) {
      const { pageId, blockId, elementId } = req.params;

      dir = __dirname + `/uploads/${pageId}/`;
      !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });

      // console.log(!!pageId);
      // console.log(!!blockId);
      // console.log(!!elementId);
    } else if (url.split("/").includes("header")) {
      console.log("header");
    } else if (url.split("/").includes("footer")) {
      console.log("footer");
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let fileName = "image";
    const { pageId, blockId, elementId } = req.params;
    if (!!elementId) fileName = elementId;
    else if (!!blockId) fileName = blockId;
    else if (!!pageId) fileName = pageId;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
export default upload;
