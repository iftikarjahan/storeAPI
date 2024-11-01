require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const notFound = require("./middleware/notFound");
const errorHandlingMiddleware = require("./middleware/errorHandler");
const connectDb = require("./db/connect");

app.use("/store", (req, res, next) => {
  res.send("<h1>Welcomeee</h1>");
});

app.use(notFound);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    
    const result = await connectDb(process.env.MONGO_URI);
    console.log("Connected to DB👻");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.log("Error 🚩: ", error);    
  }
};

start();
