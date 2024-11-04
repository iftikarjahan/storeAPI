const Product=require("../model/products");
const { options } = require("../routes/products");


const getAllProductsStatic=async(req,res,next)=>{
    const {name}=req.query;
    /*
    ->Instead of passing the req.query object directly, we should create the query object
    and then pass it to the find method
    */ 
    const queryObject={};
    // if(name){
    //     queryObject.name={$regex:name,$options:"i"}
    // }

    const products=await Product.find(queryObject).sort("-price -name");
    res.status(200).json({products,nbHits:products.length});
}

const getAllProducts=async(req,res,next)=>{
    const {featured,company,name,sort}=req.query;
    let queryObject={};
    if(featured){
        queryObject.featured=featured
    }
    if(company){
        queryObject.company=company;
    }
    if(name){
        queryObject.name={$regex:name,$options:"i"};
    }
    let result=Product.find(queryObject);   //this creates a query object
    if(sort){
        sortList=sort.split(",").join(" ");
        // console.log(sortList);
        result=result.sort(sortList);
    }
    else{
        result=result.sort("createdAt");
    }
    /*
    ->Note that the result is a query object. 
    ->When we use a method like Product.find({}), mongoose creates a query object
    ->However the query operation is not yet executed until it is explicitly called with'
    the await syntax
    ->This gives you flexibility to chain multiple methods together
    */ 
    console.log(typeof(result));   //object
    
    const products=await result;
    res.status(200).json({products:products,nbHits:products.length});
}

/*
->Each file in nodejs is treated as a module. 
->Each file has an empty module.exports object and you can add functions, variables etc to a file
*/ 

module.exports={
    getAllProductsStatic,
    getAllProducts
}