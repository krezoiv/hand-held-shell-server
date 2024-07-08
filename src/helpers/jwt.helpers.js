const jwt = require("jsonwebtoken");
const generateJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }; // Asegúrate de que sea 'userId', no 'uid'

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject("Token could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validatingJWT = (token = "") => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_KEY);
    return [true, userId];
  } catch (error) {
    return [false, null];
  }
};

// Exportar la función
module.exports = { generateJWT, validatingJWT };
