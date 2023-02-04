import bcrypt from "bcrypt";

import Admin from "../models/admin.js";

export default class AdminController {
  static async showLoginFrom(_req, res) {
    const admin = await Admin.findOne({});
    if (!admin) res.render("admin/create");
    else res.render("admin/login");
  }

  static async create(req, res) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    await Admin.create({ email: req.body.email, hashed_password: hash });
    await res.redirect("/admin");
  }

  static async newSession(req, res) {
    const admin = await Admin.findOne({});

    if (req.body.email != admin.email) {
      await res.redirect("/admin/login");
      return;
    }

    const valid = await bcrypt.compare(
      req.body.password,
      admin.hashed_password
    );

    if (!valid) {
      await res.redirect("/admin/login");
      return;
    }
    req.session.admin = true;
    await res.redirect("/admin");
  }
  static async outSession(req, res) {
    req.session = null;
    await res.redirect("/admin");
  }
}
