const jwt = require("jsonwebtoken");
const Store = require("../models/stores.js");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifiedToken = jwt.verify(token, process.env.secret);
    const rootUser = await Store.findOne({
      _id: verifiedToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(error);
  }
};

module.exports = auth;
