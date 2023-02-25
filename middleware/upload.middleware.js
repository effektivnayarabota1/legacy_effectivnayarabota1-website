import multer from "multer";
import path from "path";

import directory from "./config/directory.js";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { pageID, blockID, elementID } = req.params;
    const dir = await directory(pageID, blockID, elementID);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    if (req.url.split("/").includes("meta")) {
      cb(null, "cover-" + req.params.pageID);
    } else {
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage });
export default upload;
