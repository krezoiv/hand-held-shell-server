const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token found",
    });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_KEY);
    console.log("User ID from token (validateJWT):", userId);
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
};

// Exportar el middleware
module.exports = { validateJWT };
