import express from "express";

import LoginController from "../controllers/login.controller.js";

import IndexController from "../controllers/index.controller.js";
import PageController from "../controllers/page.controller.js";
import BlockController from "../controllers/block.controller.js";
import ElementController from "../controllers/element.controller.js";

import HeaderController from "../controllers/header.controller.js";
import FooterController from "../controllers/footer.controller.js";

import upload from "../middleware/upload.middleware.js";

export const router = express.Router();

// LOGIN ROUTES
router.get("/login", (req, res) => {
  LoginController.index(req, res);
});
router.post("/login", (req, res) => {
  LoginController.newSession(req, res);
});
router.post("/create", (req, res) => {
  LoginController.create(req, res);
});
router.get("/logout", (req, res) => {
  LoginController.outSession(req, res);
});

// HEADER ROUTES
router.get("/header", (req, res) => {
  HeaderController.index(req, res);
});
router.post("/header/meta", (req, res) => {
  HeaderController.meta(req, res);
});
router.put("/header", upload.array("image"), (req, res) => {
  HeaderController.rewrite(req, res);
});
router.post("/header/dynamic_create", (req, res) => {
  HeaderController.create(req, res);
});
router.delete("/header/:elementID", (req, res) => {
  HeaderController.remove(req, res);
});

// FOOTER ROUTES
router.get("/footer", (req, res) => {
  FooterController.index(req, res);
});
router.post("/footer/meta", upload.single("image"), (req, res) => {
  console.log("meta");
  FooterController.meta(req, res);
});
router.put("/footer", (req, res) => {
  FooterController.rewrite(req, res);
});
router.post("/footer/:group", (req, res) => {
  FooterController.create(req, res);
});
router.delete("/footer/:elementID", (req, res) => {
  FooterController.remove(req, res);
});

// INDEX ROUTES
router.get("/", (req, res) => {
  IndexController.index(req, res);
});
router.put("/", (req, res) => {
  IndexController.rewrite(req, res);
});

// PAGE ROUTES
router.get("/:pageID", (req, res) => {
  PageController.index(req, res);
});
router.post("/", (req, res) => {
  PageController.create(req, res);
});
router.delete("/:pageID", (req, res) => {
  PageController.remove(req, res);
});
router.put("/:pageID", (req, res) => {
  PageController.rewrite(req, res);
});
router.post("/:pageID/meta", upload.single("image"), (req, res) => {
  PageController.meta(req, res);
});

// BLOCK ROUTES
router.get("/:pageID/:blockID", (req, res) => {
  BlockController.index(req, res);
});
router.post("/:pageID/:type", (req, res) => {
  BlockController.create(req, res);
});
router.delete("/:pageID/:blockID", (req, res) => {
  BlockController.remove(req, res);
});
router.put("/:pageID/:blockID", upload.array("image"), (req, res) => {
  BlockController.rewrite(req, res);
});

// ELEMENT ROUTES
router.post("/:pageID/:blockID/new", (req, res) => {
  ElementController.create(req, res);
});
router.delete("/:pageID/:blockID/:elementID", (req, res) => {
  ElementController.remove(req, res);
});
