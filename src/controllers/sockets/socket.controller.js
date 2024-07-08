const User = require("../../models/user.model");
const Message = require("../../models/messages.model");

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

const saveMessage = async (payload) => {
  /* 
  payload : {
  to: " ",
  from: " ",
  message: " "
  }
  */

  try {
    const message = new Message(payload);
    await message.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  connectedUser,
  disconnectedUser,
  saveMessage,
};
