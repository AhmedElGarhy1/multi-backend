const User = require("../models/workoutsModels/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.header;
  if (!authorization)
    return res.status(401).json({ msg: "Authorization Token Required" });
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.userId = await User.findById(_id).select("_id");
    next();
  } catch (err) {
    res.json({ smg: "UnAuthorization Token" });
  }
};

module.exports = { authMiddleware };
