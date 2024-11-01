const mongoose = require("mongoose");

const connectDb = (url) => {
  // the function below returns a promise
  return mongoose.connect(url);
};

module.exports = connectDb;
