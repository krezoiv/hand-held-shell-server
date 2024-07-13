const mongoose = require("mongoose");
const Message = require("../../models/messages.model");

const getChat = async (req, res) => {
  try {
    const myUserId = mongoose.Types.ObjectId.createFromHexString(req.userId);
    const messageFrom = mongoose.Types.ObjectId.createFromHexString(
      req.params.from
    );

    // console.log(
    //   "Searching for messages between:",
    //   myUserId.toString(),
    //   "and",
    //   messageFrom.toString()
    // );

    const query = {
      $or: [
        { from: myUserId, to: messageFrom },
        { from: messageFrom, to: myUserId },
      ],
    };

    const last100Messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    // console.log("Messages found:", last100Messages.length);
    // console.log(
    //   "Query used:",
    //   JSON.stringify(query, (key, value) =>
    //     value instanceof mongoose.Types.OsbjectId ? value.toString() : value
    //   )
    // );

    // Búsqueda adicional para debug
    //const allMessages = await Message.find({}).limit(10);
    //console.log("Sample of all messages:", allMessages);

    res.json({
      ok: true,
      messages: last100Messages,
    });
  } catch (error) {
    // console.error("Error fetching messages:", error);
    res.status(500).json({
      ok: false,
      error: "Error fetching messages",
    });
  }
};

module.exports = {
  getChat,
};
