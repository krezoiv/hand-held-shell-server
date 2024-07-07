const { response } = require("express");
const mongoose = require("mongoose");
const User = require("../../models/user.model");

const getUsers = async (req, res = response) => {
  try {
    const users = await User.find({ _id: { $ne: req.uid } }).sort("-online");
    console.log("User ID:", req.userId);
    res.json({
      ok: true,
      users,
    });
  } catch (err) {
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
