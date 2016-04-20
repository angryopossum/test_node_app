/* Example for SQLite3 base - test.db */ 

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE pens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(10),
  brand VARCHAR(10),
  code  VARCHAR(10),
  price FLOAT 
);

INSERT INTO "pens" (title, brand, code, price) VALUES('Cool pen','Lamy','CP10023',1);   
INSERT INTO "pens" (title, brand, code, price) VALUES('Cool pen1','Lamy','CP10013',2);
INSERT INTO "pens" (title, brand, code, price) VALUES('FB pen','Faber-castell','FB10023',4);   
INSERT INTO "pens" (title, brand, code, price) VALUES('Fb pen1','Faber-castell','FB10013',5);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Uni-ball','UN10013',5);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Uni-ball','UN10015',5);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Uni-ball','UN10018',6);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Uni-ball','UN10019',7);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Uni-ball','UN10053',8);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Uni-ball','UN10067',5);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Pentel','PE10067',1);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Pentel','PE10061',2);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Pentel','PE10089',5);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Pentel','PE10012',25);
INSERT INTO "pens" (title, brand, code, price) VALUES('Uni pen1','Pentel','PE10034',50);




COMMIT;