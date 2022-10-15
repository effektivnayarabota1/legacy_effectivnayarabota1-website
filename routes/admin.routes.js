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

router.get("/create-page", (_req, res) => {
	PagesController.showPageConstructor(res);
});

router.post("/create-page", upload.single("cover"), (req, res) => {
	PagesController.createPage(req, res);
});

router.post("/update-page/:id", upload.single("cover"), (req, res) => {
	PagesController.updatePage(req, res);
});

router.get("/:pageId", (req, res) => {
	PagesController.showPage(req, res);
});
