const User = require("../model/userModel");
const { ObjectId } = require("mongodb");

const { encrypt, compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, name, phoneNumber } = req.body;
      const user = new User({
        email,
        password: encrypt(password),
        name,
        phoneNumber,
      });
      const result = await user.save();
      if (result) {
        res.status(201).json({
          message: "Success register new user",
          data: {
            name: result.name,
            email: result.email,
          },
        });
      } else {
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "insertEmail" };
      }
      if (!password) {
        throw { name: "insertPassword" };
      }
      const result = await User.findOne({ email }).exec();
      if (result) {
        const compared = compare(password, result.password);
        if (compared) {
          const access_token = signToken({
            id: result._id,
            email: result.email,
          });
          res.status(200).json({
            message: "Success Login",
            data: access_token,
          });
        } else if (compared == false) {
          throw { name: "cannotLogin" };
        }
      } else if (result == null) {
        throw { name: "cannotLogin" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async findAll(req, res) {
    try {
      const result = await User.find(
        {},
        { password: false, createdAt: false, updatedAt: false, __v: false }
      );
      if (result) {
        res.status(200).json({
          data: result,
        });
      }
    } catch (error) {}
  }
}

module.exports = UserController;
