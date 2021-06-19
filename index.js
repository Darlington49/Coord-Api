const path = require('path');
const express = require("express");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");


//Import MODELS


//IMPORT ROUTERS

const file_route = require("./routes/file");

var app = express();

app.set("views", "./Views");

//app.use(express.urlencoded({extended: true, }));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// GET method route
app.get("/", function (req, res) {
 
res.send("GET request to the homepage");
});

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});


sequelize
  // .sync({ force: true })
  .sync() //{force : true}
  .then((result) => {
    app.listen(3000);
    // console.log("srv");
  })
  .catch((err) => {
    console.log(err);
  });

// routes

app.use("/file", file_route);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
