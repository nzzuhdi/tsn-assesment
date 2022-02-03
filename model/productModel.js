const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    gender: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
