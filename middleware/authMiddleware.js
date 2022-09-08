const User = require("../models/userModels/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ msg: "Authorized Token Required" });
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.userId = await User.findById(_id).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ smg: "UnAuthorized Token" });
  }
};

module.exports = { authMiddleware };
