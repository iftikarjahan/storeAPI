const getAllProductsStatic=async(req,res,next)=>{
    throw new Error("Testing the new express-async-error🍃🍃");
    res.status(200).json({msg:"Static products testing route"});
}

const getAllProducts=async(req,res,next)=>{
    res.status(200).json({msg:"producst route"});
}

/*
->Each file in nodejs is treated as a module. 
->Each file has an empty module.exports object and you can add functions, variables etc to a file
*/ 

module.exports={
    getAllProductsStatic,
    getAllProducts
}