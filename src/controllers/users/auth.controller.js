const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../../models/user.model");
const { generateJWT } = require("../../helpers/jwt.helpers");

const createUser = async (req, res = response) => {
  const { email } = req.body;
  try {
    // Verificar si ya existe un usuario con ese correo electrónico
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    // Si no existe, crear un nuevo usuario
    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    await user.save();

    // Generar token
    const token = await generateJWT(user._id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    //console.error("Error al crear usuario:", error.message);
    res.status(500).json({
      ok: false,
      error: "Error al crear usuario",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password es incorrecto",
      });
    }

    const token = await generateJWT(userDB._id);

    res.json({
      ok: true,
      user: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al iniciar sesión",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.userId;

  console.log("renewToken - uid:", uid); // Log para verificar el `uid`

  try {
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    console.log("renewToken - user:", user); // Log para verificar el usuario encontrado

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error al renovar token:", error.message);
    res.status(500).json({
      ok: false,
      error: "Error al renovar token",
    });
  }
};

// const renewToken = async (req, res = response) => {
//   const userId = req.userId;

//   try {
//     const token = await generateJWT(userId);
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         ok: false,
//         msg: "Usuario no encontrado",
//       });
//     }

//     res.json({
//       ok: true,
//       user,
//       token,
//     });
//   } catch (error) {
//     console.error("Error al renovar token:", error.message);
//     res.status(500).json({
//       ok: false,
//       error: "Error al renovar token",
//     });
//   }

module.exports = {
  createUser,
  login,
  renewToken,
};
