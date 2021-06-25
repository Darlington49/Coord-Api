const path = require("path");
const express = require("express");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");

//Import MODELS
const userModel = require("./models/user.model");
const { Role, ROLES } = require("./models/role.model");

// Relations

Role.belongsToMany(userModel, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
userModel.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

console.log(ROLES);

//IMPORT ROUTERS

const file_route = require("./routes/file");
const auth_route = require("./routes/auth.routes");
const user_route = require("./routes/user.routes");

var app = express();

app.set("views", "./Views");

//app.use(express.urlencoded({extended: true, }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    Role.create({
      id: 1,
      name: "user",
    });

    Role.create({
      id: 2,
      name: "moderator",
    });

    Role.create({
      id: 3,
      name: "admin",
    });

    app.listen(3000);
    // console.log("srv");
  })
  .catch((err) => {
    console.log(err);
  });

// routes

app.use("/file", file_route);
app.use("/api/auth", auth_route);
app.use("/api/test", user_route);
