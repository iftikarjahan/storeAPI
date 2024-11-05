const Product = require("../model/products");
const { options } = require("../routes/products");

const getAllProductsStatic = async (req, res, next) => {
  const { name } = req.query;
  /*
    ->Instead of passing the req.query object directly, we should create the query object
    and then pass it to the find method
    */
  const queryObject = {};
  // if(name){
  //     queryObject.name={$regex:name,$options:"i"}
  // }

  const products = await Product.find(queryObject).sort("-price -name");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  let queryObject = {};
  let filterObject = {}; //would be created from the numericFilters string
  if (numericFilters) {
    // create an operator map
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    // Now I need to replace the specific character from the numeric filter string
    // numericFilter is a string. So we use the replace method
    const regEx = /\b(<|>|>=|=|<|<=)\b/g; //the characters that needs to be replaced
    let filterdString = numericFilters.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`;
    });
    // Now using this filtered string, I need to create an object that would be passed as a parameter
    const options = ["price", "rating"]; //these are the numeric values in which filters could be applied
    let filters = filterdString.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        filterObject[field] = { [operator]: Number(value) };
      }
    });
  }
  queryObject = filterObject;
  let result = Product.find(queryObject); //this creates a query object
  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (sort) {
    sortList = sort.split(",").join(" ");
    // console.log(sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  /*
    ->Note that the result is a query object. 
    ->When we use a method like Product.find({}), mongoose creates a query object
    ->However the query operation is not yet executed until it is explicitly called with'
    the await syntax
    ->This gives you flexibility to chain multiple methods together
    */
  if (fields) {
    fieldsList = fields.split(",").join(" ");
    result.select(fieldsList);
  }

  // setting up the pagination feature
  let pageNo = Number(req.query.pageNo) || 1;
  let limit = Number(req.query.limit) || 4;
  let skip = (pageNo - 1) * limit;

  console.log(pageNo, limit, skip);

  result = result.skip(skip).limit(limit);

  // console.log(typeof(result));   //object

  const products = await result;
  res.status(200).json({ products: products, nbHits: products.length });
};

/*
->Each file in nodejs is treated as a module. 
->Each file has an empty module.exports object and you can add functions, variables etc to a file
*/

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
