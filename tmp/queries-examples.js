var q  = {"$and":[{"brand":{"$in":["Lamy","Pentel"]}}]};

//console.log(JSON.stringify(q1));

//SELECT * FROM pens WHERE (category="drawing-pens" OR category="ballpoint-pens")
var q1 = {"$and":[{"category":{"$in":["drawing-pens","ballpoint-pens"]}}]};

// SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) ;                                             
var q2 ={"$or":[{"price":{"$lte":"2"}},{"price":{"$gt":"3","$lte":"15"}},{"price":{"$gt":"20"}}]};

//SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) AND (category="drawing-pens" OR category="ballpoint-pens")
var q3 = {"$and":[{"$or":[{"price":{"$lte":"2"}},{"price":{"$gt":"3","$lte":"15"}},{"price":{"$gt":"20"}}]},{"category":{"$in":["drawing-pens","ballpoint-pens"]}}]}
               
//SELECT * FROM pens WHERE (brand="Pentel" OR brand="Lamy")
var q4 ={"$and":[{"brand":{"$in":["Lamy","Pentel"]}}]};

//SELECT * FROM pens WHERE (category="drawing-pens" OR category="ballpoint-pens") AND (category="drawing-pens" OR category="ballpoint-pens")
var q5 = {"$and":[{"brand":{"$in":["Lamy","Pentel"]}},{"category":{"$in":["drawing-pens","ballpoint-pens"]}}]};

//SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) AND (brand="Pentel" OR brand="Lamy")
var q6 = {"$and":[{"$or":[{"price":{"$lte":"2"}},{"price":{"$gt":"3","$lte":"15"}},{"price":{"$gt":"20"}}]},{"brand":{"$in":["Lamy","Pentel"]}}]};

//SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) AND (brand="Pentel" OR brand="Lamy") AND  (category="drawing-pens" OR category="ballpoint-pens")
var q7 = {"$and":[{"$or":[{"price":{"$lte":"2"}},{"price":{"$gt":"3","$lte":"15"}},{"price":{"$gt":"20"}}]},{"brand":{"$in":["Lamy","Pentel"]}},{"category":{"$in":["drawing-pens","ballpoint-pens"]}}]};

//SELECT * FROM pens WHERE (price < 2 OR price BETWEEN 3 AND 15 OR price > 20) AND (brand="Pentel" OR brand="Lamy") AND  (category="drawing-pens" OR category="ballpoint-pens")
var q8 = {};

var sq1 = {"$and":[{"category":{"$in":["drawing-pens"]}}]};

//console.log(JSON.stringify(q3));

exports.q = q;
exports.q1 = q1;
exports.q2 = q2;
exports.q3 = q3;
exports.q4 = q4;
exports.q5 = q5;
exports.q6 = q6;
exports.q7 = q7;
exports.q8 = q8;
exports.sq1 = sq1;