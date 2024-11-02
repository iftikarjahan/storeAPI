// This file would be used to populate the database
// This would be a seperate file that needs to be run seperately to populate the db
// This file acts as a helper file

const connectDb=require("./db/connect");
require("dotenv").config();
const Product=require("./model/products");
const jsonProducts=require("./products.json");

const start=async()=>{
    try {
        const result=await connectDb(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("Successfully populated the db🎗️");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


start();