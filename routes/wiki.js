const express = require("express");
const router = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 

router.get("/", function (req, res, next) {
  res.redirect("/");
  next();
});

router.post("/", function (req, res, next) {

    Page.create({
    title: req.body.pageTitle,
    content: req.body.pageContent,
  }).then((res)=>{
    console.log('Pagina creada') 
    res.redirect('/wiki')
  }).catch((err) =>{
    res.send(err)
  })
  // const user = User.create({
  //   name: req.body.autorName,
  //   email: req.body.email,
  // });
});

router.get("/add", function (req, res, next) {
  res.render("addpage");
});





module.exports = router;
