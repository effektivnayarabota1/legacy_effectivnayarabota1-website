import express from "express";
import { PagesController } from "../controllers/pages.controller.js";
import { upload } from "../middleware/uploadImage.middleware.js";

export const router = express.Router();

router.get("/", (_req, res) => {
  PagesController.index(res);
});

router.get("/clear", (_req, res) => {
  PagesController.clear(res);
});

router.get("/constructor", (_req, res) => {
  PagesController.createPage(_req, res);
});

router.get("/:slug", (_req, res) => {
  PagesController.showPageConstructor(_req, res);
});

router.post("/:slug", upload.single("cover"), (req, res) => {
  PagesController.updatePage(req, res);
});

router.delete("/:slug", (req, res) => {
  PagesController.deletePage(req, res);
});

router.get("/:slug/:type/constructor", (req, res) => {
  PagesController.createBlock(req, res);
});

router.get("/:pageSlug/:slug", (req, res) => {
  PagesController.showBlockConstructor(req, res);
});

router.post("/:pageSlug/:slug", upload.single("image"), (req, res) => {
  PagesController.updateBlock(req, res);
});
