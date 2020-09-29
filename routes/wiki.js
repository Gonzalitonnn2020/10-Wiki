const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.redirect("/");
  next();
});
router.post("/", function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
router.get("/add", function (req, res, next) {
  res.render("addpage");
});

module.exports = router;
