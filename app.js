require('express-async-errors');  //using this you wont need the try-catch block to handle the errors
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const notFound = require("./middleware/notFound");
const errorHandlingMiddleware = require("./middleware/errorHandler");
const connectDb = require("./db/connect");
const productsRouter=require("./routes/products");


app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// app.use("/api/v1/products",(req,res,next)=>{
//   res.send("<h1>Papa Papa</h1>")
// });
app.use("/api/v1/products",productsRouter);

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
