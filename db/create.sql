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
  id_order INT,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_order)
);

CREATE TABLE Orders(
  id_item INT,
  id_order INT,
  amount int NOT NULL,
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
(1, 'REGISTERED'),
(2, 'DELIVERED'),
(3, 'REGISTERED');

INSERT INTO Orders VALUES
(1, 1, 1),
(6, 1, 1),
(11, 1, 1),
(16, 1, 1);

INSERT INTO Orders VALUES
(3, 2, 1),
(4, 2, 1),
(7, 2, 1),
(10, 2, 1),
(13, 2, 2),
(21, 2, 1);

INSERT INTO Orders VALUES
(2, 3, 1),
(3, 3, 2),
(8, 3, 1),
(9, 3, 1),
(10, 3, 1),
(11, 3, 1),
(14, 3, 1),
(15, 3, 1),
(16, 3, 3),
(19, 3, 2);

-- Test query
select name, type, amount, amount * price as total_for_item from Item
inner join Orders on Item.id_item = Orders.id_item
where id_order = 3;