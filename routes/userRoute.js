const userRoute = require("express").Router();
const UserController = require("");
userRoute.get("/register", UserController.register);
userRoute.get("/login", UserController.login);
userRoute.post("/users", UserController.findAll);
module.exports = userRoute;
