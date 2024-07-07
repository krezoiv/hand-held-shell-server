const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //  useCreateIndex: true,
    });

    console.log("Base de datos _'shellDB'_ conectada...");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = { dbConnection };
