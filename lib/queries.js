var underscore = require("underscore");

/**
 * Make query to MongoDB
 *
 * @param {Object[]} brands - array of brands
 * @example brand = ["Pentel", "Lamy", "Uni-ball"]
 * @param {Object[]} prices - array of prices 
 * @examples price = ["10_20","_20","30_"]
 * @param {Object[]} categories - array of categories
 * @example categories = ["drawing-pens","ballpoint-pens"]
 * @return {string} query - MongoDb query
 */


function makeQuery (brands, prices, categories){

     if(typeof(prices)==='string') {prices = [prices];}
     if(typeof(prices)==='undefined') {prices = null;}
     
     if(typeof(categories)==='string') {categories = [categories];}
     if(typeof(categories)==='undefined') {categories = null;}
     
     if(typeof(brands)==='string') {brands = [brands];}
     if(typeof(brands)==='undefined') {brands = null;}
     
    
    var query = {};
    
    // CASE #001 null/null/categories
    if (brands == null && prices == null && categories !==null){
        
       query.$and = [];
       query.$and[0] = {};
       query.$and[0].category = {$in: categories}; 
    }
    
    // CASE #010 null/price/null
    if(brands === null && prices !== null && categories ==null){
         
        query.$or = [];
        query.$or = getQueryPrice (prices);
        
    }
    
    // CASE #011 null//prices/categories
    if(brands == null && prices !== null && categories !==null ){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[1] = {};
        query.$and[0].$or =  getQueryPrice (prices);
        query.$and[1].category = {$in: categories};
        
    }
    
    // CASE #100 brands/null
    if(brands !== null && prices === null && categories ==null){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[0].brand = {$in: brands};
     
    }
    
    // CASE #101 brands/null/categories
    if(brands !== null && prices == null && categories !==null ){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[1] = {};
        query.$and[0].brand = {$in: brands};
        query.$and[1].category = {$in: categories};
        
    }
    
     // CASE #110 brands/prices/null
    if(brands !== null && prices !== null && categories ==null ){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[1] = {};
        query.$and[0].$or =  getQueryPrice (prices);
        query.$and[1].brand = {$in: brands};
        
    }

     // CASE #111 brands/prices/null
    if(brands !== null && prices !== null && categories !==null ){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[1] = {};
        query.$and[2] = {};
        query.$and[0].$or =  getQueryPrice (prices);
        query.$and[1].brand = {$in: brands};
        query.$and[2].category = {$in: categories};
        
    }


    return query;
}

/**
 * Get query array for MongoDB
 *
 * @param {Object[]} prices - array of prices 
 * @example prices = ["10_20","_20","30_"]
 * 
 * @return {Object[]} price - array of mongo queries
 * @example price = [
 *  
 * 
 * ]
 */

function getQueryPrice (prices){

   var price = [];
      
      underscore.each(prices, function(price_value, i){
        
        if (/^_[0-9]+/.test(price_value)){
         price[i] = {price: {$lte: price_value.split("_")[1]}};
        }
        
        if (/^[0-9]+_[0-9]+/.test(price_value)){
         price[i] = {price: {$gt: price_value.split("_")[0], $lte: price_value.split("_")[1]}}; 
        }
        
         if (/^[0-9]+_$/.test(price_value)){
         price[i] = {price: {$gt: price_value.split("_")[0]}};
        }
        
        
      });    
    
  return price;
}


exports.makeQuery = makeQuery;
