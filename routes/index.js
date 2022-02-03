const routes = require("express").Router();
const userRoute = require("./userRoute");
const errorHandler = require("../middleware/errorHandler");
const { authentication } = require("../middleware/authentication");
// const productRoute = require("");

routes.use("/", userRoute);
routes.use(authentication);
// routes.use("/products", productRoute);
routes.use(errorHandler);
module.exports = routes;
