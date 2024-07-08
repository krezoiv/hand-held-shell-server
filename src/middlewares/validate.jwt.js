const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token found",
    });
  }

  try {
    console.log("JWT_KEY:", process.env.JWT_KEY);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("Decoded token:", decoded);
    req.userId = decoded.userId;
    console.log("Set req.userId to:", req.userId);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        ok: false,
        msg: "Token has expired. Please log in again.",
      });
    }
    return res.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
};

module.exports = { validateJWT };
