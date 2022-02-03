const routes = require("express").Router();
const userRoute = require("");
const productRoute = require("");

routes.use("/", userRoute);
routes.use("/products", productRoute);
module.exports = routes;
