export default function checkAuth(req, res, next) {
  if (req.url == "/login") return next();
  if (!!req.session && req.session.admin) return next();
  else return res.redirect("/admin/login");
}
