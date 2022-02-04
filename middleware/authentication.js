const { verifyToken } = require("../helpers/jwt");
const User = require("../model/userModel");
const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      const verifiedUser = verifyToken(access_token);
      console.log(verifiedUser);
      if (verifiedUser) {
        const findUser = await User.findOne({ email: verifiedUser.email });
        if (findUser) {
          req.user = {
            id: findUser.id,
            email: findUser.email,
          };
          next();
        } else {
          throw { name: "Unauthorized" };
        }
      } else {
        throw { name: "Unauthorized" };
      }
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
