const errorHandlingMiddleware=async(err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).json({msg:"Something went wrong. Please try again later"});   
}

module.exports=errorHandlingMiddleware;