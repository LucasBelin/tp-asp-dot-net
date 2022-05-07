CREATE DATABASE restaurant;
USE restaurant;

CREATE TABLE Item(
  id_item INT AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY(id_item)
);

CREATE TABLE CustomerOrder(
  id_order INT AUTO_INCREMENT,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_order)
);

CREATE TABLE ItemOrder(
  id_item INT,
  id_order INT,
  amount int NOT NULL,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_item, id_order),
  FOREIGN KEY(id_item) REFERENCES Item(id_item),
  FOREIGN KEY(id_order) REFERENCES CustomerOrder(id_order)
);

INSERT INTO Item VALUES
(1, 'Oysters', 'STARTER', 21.50),
(2, 'Amberjack', 'STARTER', 19),
(3, 'Honey Gem', 'STARTER', 18),
(4, 'Baby Kale', 'STARTER', 17),
(5, 'Raw Brussels Sprouts', 'STARTER', 19);

INSERT INTO Item VALUES
(6, 'Lasagne', 'DISH', 27),
(7, 'T-Bone', 'DISH', 70),
(8, 'Whole Branzino', 'DISH', 40),
(9, 'Chicken Parmesan', 'DISH', 28),
(10, 'Pork Chop', 'DISH', 57);

INSERT INTO Item VALUES
(11, 'Cannolis', 'DESSERT', 9),
(12, 'Fluffernutter', 'DESSERT', 14),
(13, 'Tiramisu', 'DESSERT', 11),
(14, 'Affogato', 'DESSERT', 10),
(15, 'Box of Italian Cookies', 'DESSERT', 14);

INSERT INTO Item VALUES
(16, 'East India Cocktail', 'DRINK', 15),
(17, 'Sierra Norte', 'DRINK', 17),
(18, 'Paloma', 'DRINK', 16),
(19, 'NV Prosecco  Extra Dry', 'DRINK', 56),
(20, 'Semillon', 'DRINK', 84),
(21, 'Santa Cruz Mountains', 'DRINK', 166);

INSERT INTO CustomerOrder VALUES
(1, "ONGOING"),
(2, "ONGOING"),
(3, "ONGOING"),
(4, "DELIVERED");

INSERT INTO ItemOrder VALUES
(1, 1, 1, 'DELIVERED'),
(6, 1, 1, 'REGISTERED'),
(11, 1, 1, 'REGISTERED'),
(16, 1, 1, 'REGISTERED');

INSERT INTO ItemOrder VALUES
(3, 2, 1, 'REGISTERED'),
(4, 2, 1, 'REGISTERED'),
(7, 2, 1, 'REGISTERED'),
(10, 2, 1, 'REGISTERED'),
(13, 2, 2, 'REGISTERED'),
(21, 2, 1, 'REGISTERED');

INSERT INTO ItemOrder VALUES
(2, 3, 1, 'DELIVERED'),
(3, 3, 2, 'DELIVERED'),
(8, 3, 1, 'DELIVERED'),
(9, 3, 1, 'DELIVERED'),
(10, 3, 1, 'DELIVERED'),
(11, 3, 1, 'REGISTERED'),
(14, 3, 1, 'REGISTERED'),
(15, 3, 1, 'REGISTERED'),
(16, 3, 3, 'REGISTERED'),
(19, 3, 2, 'REGISTERED');

INSERT INTO ItemOrder VALUES
(1, 4, 1, 'DELIVERED'),
(4, 4, 1, 'DELIVERED');

INSERT INTO ItemOrder VALUES
(8, 4, 1, 'DELIVERED'),
(9, 4, 1, 'DELIVERED');

INSERT INTO ItemOrder VALUES
(15, 4, 1, 'DELIVERED');

INSERT INTO ItemOrder VALUES
(16, 4, 2, 'DELIVERED');


-- Test queries
select name, type, amount, price * amount as total_price, status from Item
inner join ItemOrder on Item.id_item = ItemOrder.id_item
where ItemOrder.id_order = 3;

select name, type, amount, price, status from Item
inner join ItemOrder on Item.id_item = ItemOrder.id_item
where ItemOrder.id_order = 4 and ItemOrder.id_item = 1;

select name, type, amount, price * amount as total_price, ItemOrder.status as item_status, CustomerOrder.status as order_status from (CustomerOrder
inner join ItemOrder on CustomerOrder.id_order = ItemOrder.id_order)
inner join Item on ItemOrder.id_item = Item.id_item
where CustomerOrder.id_order = 3;