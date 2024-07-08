/*
    path: /api/message
*/

const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const { getChat } = require("../../controllers/messages/messages.controller");

const router = Router();

router.get("/:from", validateJWT, getChat);

module.exports = router;
