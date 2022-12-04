import express from "express";
import PageController from "../controllers/page.controller.js";
import BlockController from "../controllers/block.controller.js";
import ElementController from "../controllers/element.controller.js";
import { upload } from "../middleware/uploadImage.middleware.js";

export const router = express.Router();

router.get("/", (_req, res) => {
  PageController.index(res);
});

router.get("/clear", (_req, res) => {
  PageController.clearAll(res);
});

router.get("/create", (_req, res) => {
  PageController.create(_req, res);
});

router.get("/:slug", (_req, res) => {
  PageController.editor(_req, res);
});

router.post("/:slug", upload.single("cover"), (req, res) => {
  PageController.update(req, res);
});

router.delete("/:slug", (req, res) => {
  PageController.delete(req, res);
});

router.get("/:slug/:type/create", (req, res) => {
  BlockController.create(req, res);
});

router.get("/:pageSlug/:blockSlug", (req, res) => {
  BlockController.editor(req, res);
});

router.post("/:pageSlug/:slug", upload.single("image"), (req, res) => {
  BlockController.updateBlock(req, res);
});
