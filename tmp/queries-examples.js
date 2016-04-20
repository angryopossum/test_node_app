var q  = {"$and":[{"brand":{"$in":["Lamy","Pentel"]}}]};

//console.log(JSON.stringify(q1));

//SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) AND (brand="Pentel" OR brand="Lamy") 
var q2 = {"$and":[{"$or":[{"price":{"$lte":"2"}},{"price":{"$gt":"3","$lte":"15"}},{"price":{"$gt":"20"}}]},{"brand":{"$in":["Lamy", "Pentel"]}}]}
                 
// SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) ;                                             
var q3 ={"$or":[{"price":{"$lte":"2"}},{"price":{"$gt":"3","$lte":"15"}},{"price":{"$gt":"20"}}]};



//console.log(JSON.stringify(q3));

exports.q = q; 
exports.q2 = q2;
exports.q3 = q3;