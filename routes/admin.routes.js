import express from "express";

import LoginController from "../controllers/login.controller.js";

import PageController from "../controllers/page.controller.js";
import BlockController from "../controllers/block.controller.js";
import ElementController from "../controllers/element.controller.js";

import HeaderController from "../controllers/header.controller.js";
import FooterController from "../controllers/footer.controller.js";

import upload from "../middleware/upload.middleware.js";

export const router = express.Router();

// LOGIN ROUTES

router.get("/login", (req, res) => {
  LoginController.showLoginFrom(req, res);
});

router.post("/create", (req, res) => {
  LoginController.create(req, res);
});

router.post("/login", (req, res) => {
  LoginController.newSession(req, res);
});

router.get("/logout", (req, res) => {
  LoginController.outSession(req, res);
});

// HEADER ROUTES

// PAGE ROUTES
router.get("/", (req, res) => {
  PageController.index(req, res);
});
router.post("/page/create", (req, res) => {
  PageController.create(req, res);
});
router.delete("/page/:id", (req, res) => {
  PageController.remove(req, res);
});
router.put("/page/reorder", (req, res) => {
  PageController.reorder(req, res);
});

router.get("/:id", (req, res) => {
  PageController.indexPage(req, res);
});
router.post("/meta/:pageId", upload.single("image"), (req, res) => {
  PageController.meta(req, res);
});

// router.get("/header", (req, res) => {
//   HeaderController.edit(req, res);
// });
//
// router.put("/header", uploadHeader.array("header-bcg"), (req, res) => {
//   HeaderController.update(req, res);
// });
//
// router.get("/header/create", (req, res) => {
//   HeaderController.create(req, res);
// });
//
// router.delete("/header/:slug", (req, res) => {
//   HeaderController.remove(req, res);
// });
//
// router.get("/footer", (_req, res) => {
//   FooterController.index(_req, res);
// });
//
// router.post("/footer", uploadFooter.single("footer-bcg"), (req, res) => {
//   FooterController.update(req, res);
// });
//
// router.put("/pages", (_req, res) => {
//   PageController.create(_req, res);
// });
//
// router.get("/create", (_req, res) => {
//   PageController.create(_req, res);
// });
//
// router.get("/:slug", (req, res) => {
//   PageController.editor(req, res);
// });
//
// router.post("/:slug", uploadCover.single("cover"), (req, res) => {
//   PageController.update(req, res);
// });
//
// router.delete("/:slug", (req, res) => {
//   PageController.delete(req, res);
// });
//
// router.get("/clear", (_req, res) => {
//   PageController.clearAll(res);
// });
//
// // BLOCK ROUTES
// router.get("/:pageSlug/block/create", (req, res) => {
//   BlockController.create(req, res);
// });
//
// router.get("/:pageSlug/:blockSlug", (req, res) => {
//   BlockController.editor(req, res);
// });
//
// router.post(
//   "/:pageSlug/:blockSlug",
//   uploadElems.array("input_elem-img"),
//   (req, res) => {
//     BlockController.update(req, res);
//   }
// );
//
// router.delete("/:pageSlug/:blockSlug", (req, res) => {
//   console.log("delete");
//   BlockController.delete(req, res);
// });
//
// // ELEMENT ROUTES
// router.get("/:pageSlug/:blockSlug/blank", (req, res) => {
//   ElementController.blank(req, res);
// });
//
// router.delete("/:pageSlug/:blockSlug/:elemSlug", (req, res) => {
//   ElementController.delete(req, res);
// });
//
// router.delete("/:pageSlug/:blockSlug/:elemSlug/image", (req, res) => {
//   ElementController.deleteImage(req, res);
// });
