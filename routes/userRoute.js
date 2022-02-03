const userRoute = require("express").Router();
const UserController = require("../controller/userController");
userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);
userRoute.get("/users", UserController.findAll);
module.exports = userRoute;
