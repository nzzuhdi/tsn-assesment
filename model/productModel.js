const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    price: {
      type: Number,
      min: [10000, "Must be at least 10000, got {VALUE}"],
      required: [true, "Price is required!"],
    },
    image: {
      type: String,
    },
    gender: {
      type: Array,
      // enum: { values: ["Pria", "Wanita"], message: "{VALUE} is not available" },
      required: [true, "gender is required!"],
    },
    size: {
      type: Array,
      // enum: {
      //   values: ["S", "M", "L", "XL"],
      //   message: "{VALUE} is not available",
      // },
      required: [true, "size is required!"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
