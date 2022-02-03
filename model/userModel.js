const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (email) {
          return isEmail(email);
        },
        message: (props) => {
          `${props.value} is not an email!`;
        },
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
