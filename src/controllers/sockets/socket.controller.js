const User = require("../../models/user.model");

const connectedUser = async (userId = "") => {
  const user = await User.findById(userId);

  user.online = true;
  await user.save();
  return user;
};

const disconnectedUser = async (userId = "") => {
  const user = await User.findById(userId);

  user.online = false;
  await user.save();
  return user;
};

module.exports = {
  connectedUser,
  disconnectedUser,
};
