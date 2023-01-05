import express from "express";
import PageController from "../controllers/page.controller.js";
import BlockController from "../controllers/block.controller.js";
import ElementController from "../controllers/element.controller.js";
import { upload, uploadElems } from "../middleware/uploadImage.middleware.js";

export const router = express.Router();

// PAGE ROUTES
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

// BLOCK ROUTES
router.get("/:pageSlug/block/create", (req, res) => {
  BlockController.create(req, res);
});

router.get("/:pageSlug/:blockSlug", (req, res) => {
  BlockController.editor(req, res);
});

router.post(
  "/:pageSlug/:blockSlug",
  uploadElems.array("element-image"),
  (req, res) => {
    BlockController.update(req, res);
  }
);

router.delete("/:pageSlug/:blockSlug", (req, res) => {
  BlockController.delete(req, res);
});

// ELEMENT ROUTES
router.get("/:pageSlug/:blockSlug/blank", (req, res) => {
  ElementController.blank(req, res);
});
