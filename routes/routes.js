const express = require("express");
const router = express.Router();
const Page = require("../models").Page;
const User = require("../models").User;
const wikiRouter = require("./wiki");
const userRouter = require("./users");

router.use("/wiki", wikiRouter, (req, res, next) => {
  res.send("todo bien");
  next();
});

router.get("/", (req, res, next) => {
  res.send("Hola, funcionando");
});

router.get("/wiki/:id", wikiRouter, (req, res) => {
  console.log(req.params);
  Page.findByPk(req.params.id)
    .then((page) => {
      res.send(page);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
