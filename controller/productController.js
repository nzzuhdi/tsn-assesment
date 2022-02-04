const { ObjectId } = require("mongodb");
const { Error } = require("mongoose");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const { findOne } = require("../model/cartModel");

class ProductController {
  static async getAll(req, res, next) {
    try {
      const result = await Product.find(
        {},
        { createdAt: false, updatedAt: false, __v: false }
      );
      if (result) {
        res.status(200).json({
          data: result,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async postProduct(req, res, next) {
    try {
      const { title, price, image } = req.body;
      const product = new Product({
        title,
        price,
        image: image || "",
        size: ["S", "M", "L", "XL"],
        gender: ["Pria", "Wanita"],
      });
      const result = await product.save();
      if (result) {
        res.status(201).json({
          message: "Success post new product",
          data: result,
        });
      } else {
        throw Error;
      }
    } catch (error) {
      next(error);
    }
  }
  static async details(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Product.findById(id).exec();
      if (result) {
        res.status(200).json({
          message: "Success get details product",
          data: result,
        });
      } else if (result === null) {
        throw { name: "notFound" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async cart(req, res) {
    try {
      const { productId } = req.params;
      const { gender, size } = req.body;
      const { id } = req.user;
      const product = await Product.findOne({ _id: productId });
      const checkCart = await Cart.findOne({ userId: id });
      if (checkCart == null || !checkCart) {
        const cart = new Cart({
          userId: id,
          products: [product],
        });
        const result = await cart.save();
        if (result) {
          res.status(201).json({
            message: "Success add cart",
          });
        }
      } else {
        const updated = await Cart.updateOne(
          { userId: id },
          {
            $push: {
              products: {
                title: product.title,
                price: product.price,
                gender: gender,
                size: size,
                image: product.image,
              },
            },
          }
        );
        if (updated) {
          res.status(201).json({
            message: "Success update cart",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async cartUser(req, res, next) {
    try {
      const { userId } = req.params;
      const result = await Cart.findOne({ userId }).exec();
      if (result) {
        res.status(200).json({
          message: "Success get user cart",
          data: result,
        });
      } else if (result === null) {
        throw { name: "notFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
