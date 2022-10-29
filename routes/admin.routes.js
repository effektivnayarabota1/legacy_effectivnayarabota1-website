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
	PagesController.showPageConstructor(_req, res);
});

router.post("/create-page", upload.single("cover"), (req, res) => {
	PagesController.createPage(req, res);
});

router.post("/update-page/:url", upload.single("cover"), (req, res) => {
	PagesController.updatePage(req, res);
});

router.get("/:url", (req, res) => {
	PagesController.showPageConstructor(req, res);
});
