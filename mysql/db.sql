
---------******************* CREATE TABLE QUERIES
--users
create table users(
    id int not null auto_increment,
    username varchar(100) not null,
    password varchar(200) not null,
    first_name varchar(200) not null,
    last_name varchar(200) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

create table user_address(
    id int not null auto_increment,
    user_id int not null,
    street_address varchar(500) not null,
    city varchar(100) not null,
    postal_code varchar(20) not null,
    country varchar(100) not null,
    primary key (id),
    foreign key(user_id) references users(id)
);

create table user_payment(
    id int not null auto_increment,
    user_id int not null,
    payment_type varchar(20) not null,
    account_number varchar(20) not null,
    expiry varchar(5) not null,
    primary key (id),
    foreign key(user_id) references users(id)
);

create table cart(
    id int not null auto_increment,
    user_id int not null,
    product_id int not null,
    total decimal not null,
    primary key (id),
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);

alter table cart add column quantity int;

--product
create table product_category(
    id int not null auto_increment,
    name varchar(100) not null,
    description varchar(1000) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

create table product_inventory(
    id int not null auto_increment,
    product_id int not null,
    quantity int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key(product_id) references products(id)
);

create table products(
    id int not null auto_increment,
    name varchar(100) not null,
    description varchar(1000) not null,
    category_id int not null,
    price decimal(10,2) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key(category_id) references product_category(id)
);

create table orders(
    id int not null auto_increment,
    user_id int not null,
    user_payment_id int not null,
    product_id int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total decimal(10,2) not null,
    quantity int not null,
    primary key (id),
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id),
    foreign key(user_payment_id) references user_payment(id)
);


---**************************** INSERT TABLE QUERIES
insert into users(username, password,first_name,last_name) values('genesis', 'genesis', 'Genesis', 'Benitez');

insert into user_address(user_id, street_address, city,postal_code,country) values(1,'1200 Washington Cir', 'Atlanta', '20067', 'The United States of America');

insert into user_payment(user_id,payment_type,account_number,expiry) values(1, 'Visa', '4538878462747638', '09/25');

insert into product_category(name,description) values('Sugarcane', 'Sugarcane, Saccharum officinarum, is a perennial grass in the family Poaceae grown for its stem (cane) which is primarily used to produce sucrose. Sugarcane has a thick, tillering stem which is clearly divided into nodes and internodes. ');

insert into products(name,description,category_id,price, quantity, product_img)values('Kandahar Pomegranate','Kandahar pomegranate is a variety of Afghan pomegranate that hails from the province of Kandahar. Known as Kandahari anar in Afghanistan, this fruit is renowned for its juiciness, ruby-red arils, and its remarkable size. The fruit is said to have an exceptional flavor and can sometimes weigh up to a kilogram.',3,8.00, 300,'https://cdn.tasteatlas.com/images/ingredients/164935cbffbb48d8ab05ed7ac5848c19.jpg?w=600&h=450');

insert into product_inventory(product_id,quantity)values(1,'250');

insert into cart(user_id,product_id, quantity)values(1,1, 4);

insert into orders(user_id,product_id,total, quantity, user_payment_id)values(1,1,10.00,1);

--conditional insert
SELECT IF(user_id=1 AND product_id=1, 'true', 'false')
FROM cart;



----*****************************JOIN TABLE QUERIES
--join user products
select products.name, products.description, products.category_id, 
products.price, products.quantity, product_category.name
from products 
inner join product_category on products.category_id = product_category.id;

--join product tables
select users.username, users.first_name, users.last_name, 
user_address.street_address, user_address.city, user_address.postal_code, user_address.country, 
user_payment.payment_type, user_payment.account_number, user_payment.expiry
from users 
inner join user_address on users.id = user_address.user_id
inner join user_payment on users.id = user_payment.user_id;

--join cart, user & product table
select cart.quantity, cart.total, products.name, 
product_category.name AS category, products.price, products.product_img
from cart 
inner join products on cart.product_id = products.id
inner join product_category on products.category_id = product_category.id;

--join orders, products & user_payment table
select orders.created_at, orders.id, orders.total, orders.quantity,
products.name,products.id AS product_id, products.price, products.product_img,
user_payment.id, user_payment.payment_type, user_payment.account_number,
users.first_name, users.last_name
from orders 
inner join products on orders.product_id = products.id
inner join user_payment on orders.user_payment_id = user_payment.id
inner join users on orders.user_id = users.id


