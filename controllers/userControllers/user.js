const User = require("../../models/userModels/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ username: user.username, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// signup User
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);
  try {
    const user = await User.signup(email, password, username);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { loginUser, signupUser };
