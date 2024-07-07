/**
 
 path: api/users
 */

const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const { getUsers } = require("../../controllers/users/users.controllers");
//const { getUsers } = require("../../controllers/users/users.controllers");

const router = Router();

router.get("/", getUsers);

module.exports = router;
