const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || email === "" || !password || password === "") {
    throw Error("All Fields Must Be Filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email Not Valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is Not Strong Enough");
  }

  const exists = await this.findOne({ email });
  if (exists) throw Error("Email is already Exist");
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hash,
  });
  return user;
};
userSchema.statics.login = async function (email, password) {
  if (!email || email === "" || !password || password === "") {
    throw Error("All Fields Must Be Filled");
  }
  const user = await this.findOne({ email });

  if (!user) throw Error("Invalid Email");
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw Error("Incorrect Password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
