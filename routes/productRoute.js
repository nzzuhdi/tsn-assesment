const productRoute = require("express").Router();
const ProductController = require("");
productRoute.get("/", ProductController.getAll);
productRoute.get("/:id", ProductController.details);
productRoute.post("/cart", ProductController.cart);
module.exports = productRoute;
