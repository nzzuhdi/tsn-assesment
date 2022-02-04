require("dotenv").config();
const cloudinary = require("cloudinary").v2;
console.log(cloudinary.config().cloud_name);

const upload = async (req, res, next) => {
  if (!req.file) next();
  else {
    if (req.file.size > 255000) {
      throw { name: "fileSizeError" };
    }
    if (
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png"
    ) {
      throw { name: "fileTypeError" };
    } else {
      const buff = req.file.buffer.toString("base64");
      cloudinary.uploader
        .upload(`data:${req.file.mimetype};base64,${buff}`)
        .then((result) => {
          req.body.image = result.url;
          next();
        })
        .catch((err) => {
          next(err);
        });
    }
  }
};

module.exports = upload;
