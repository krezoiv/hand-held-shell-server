/**
 
 path: api/login
 */

const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
} = require("../../middlewares/validate.fields.middleware");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  login,
  renewToken,
  createUser,
} = require("../../controllers/users/auth.controller");
const router = Router();

router.post(
  "/new",
  [
    check("firstName", "El  nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido  es obligatorio").not().isEmpty(),
    check("workShift", "El turno es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    // check("roleId", "El rol  es obligatorio").not().isEmpty(),
    //check("statusId", "El status  es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),

    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
