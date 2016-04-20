var underscore = require("underscore");

/**
 * Make query to MongoDB
 *
 * @param {Object[]} brands - array of brands
 * @example brand = ["Pentel", "Lamy", "Uni-ball"]
 * @param {Object[]} prices - array of prices 
 * @examples price = ["10_20","_20","30_"]
 * @return {string} query - MongoDb query
 */


function makeQuery (brands, prices){

     if(typeof(prices)==='string') {prices = [prices];}
     if(typeof(prices)==='undefined') {prices = null;}
    
    var query = {};
    
    
    // CASE #1 brand/price
    if(brands !== null && prices !== null){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[1] = {};
        query.$and[0].$or =  getQueryPrice (prices);
        query.$and[1].brand = {$in: brands};
        
    }
    
    // CASE #2 brand/null
    if(brands !== null && prices === null){
        
        query.$and = [];
        query.$and[0] = {};
        query.$and[0].brand = {$in: brands};
     
    }
    
    // CASE #3 null/price
    if(brands === null && prices !== null){
         
        query.$or = [];
        query.$or = getQueryPrice (prices);
        
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
