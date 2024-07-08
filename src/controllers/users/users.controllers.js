const { response } = require("express");
const mongoose = require("mongoose");
const User = require("../../models/user.model");

const getUsers = async (req, res = response) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).sort("-online");

    res.json({
      ok: true,
      users,
    });
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({
      ok: false,
      msg: "An error occurred",
      error: err.message,
    });
  }
};
module.exports = {
  getUsers,
};
