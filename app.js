const express = require("express");
const app = express();
const router = require("./routes/routes");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const models = require("./models");

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

app.set("view engine", "html"); // hace que res.render funcione con archivos html
app.engine("html", nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure("views"); // apunta a nunjucks al directorio correcto para los templates

models.db
  .sync({ force: true })
  .then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
      console.log("Server is listening on port 3000!");
    });
  })
  .catch(console.error);
