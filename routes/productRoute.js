const productRoute = require("express").Router();
const ProductController = require("../controller/productController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const toCloudinary = require("../middleware/cloudinary");
productRoute.get("/", ProductController.getAll);
productRoute.post(
  "/",
  upload.single("image"),
  toCloudinary,
  ProductController.postProduct
);
productRoute.get("/:id", ProductController.details);
productRoute.get("/cart/:userId", ProductController.cartUser);
productRoute.put("/cart/:productId", upload.single(), ProductController.cart);
module.exports = productRoute;
