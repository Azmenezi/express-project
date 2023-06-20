const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { errorHandler } = require("./middlewares/errorHandler");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo connection is established!");
  } catch (error) {
    return next({ status: error.status, message: error.message });
  }
};
