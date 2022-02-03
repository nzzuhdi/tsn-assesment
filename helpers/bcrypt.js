const bcrypt = require("bcryptjs");

function encrypt(value) {
  if (!value || value === "") {
    throw { name: "insertPassword" };
  }
  return bcrypt.hashSync(value, bcrypt.genSaltSync(5));
}

function compare(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = {
  encrypt,
  compare,
};
