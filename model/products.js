const mongoose=require("mongoose");
/*
->Here I will create a schema that will act as a blueprint for a specific document
*/ 

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"product name must be provided"]
    },
    price:{
        type:Number,
        required:[true,"product price must be provided"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:"{VALUE IS NOT SUPPORTED}"
        }
    }
})

/*
->Now we will be exporting a model made from this schema
->A model is an interface that uses a schema to create a document in a collection
*/

module.exports=mongoose.model("Product",productSchema);
