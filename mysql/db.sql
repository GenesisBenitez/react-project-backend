
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
    product_id int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total decimal not null,
    primary key (id),
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);


---**************************** INSERT TABLE QUERIES
insert into users(username, password,first_name,last_name) values('genesis', 'genesis', 'Genesis', 'Benitez');

insert into user_address(user_id, street_address, city,postal_code,country) values(1,'1200 Washington Cir', 'Atlanta', '20067', 'The United States of America');

insert into user_payment(user_id,payment_type,account_number,expiry) values(1, 'Visa', '4538878462747638', '09/25');

insert into product_category(name,description) values('papaya', 'Papayas grow in tropical climates and are also known as papaws or pawpaws. Their sweet taste, vibrant color, and the wide variety of health benefits they provide make them a popular fruit.');

insert into products(name,description,category_id,price)values('Hawaiian Sunrise Papaya','The pink-orange flesh of the Sunrise (Strawberry) Papaya is firm, but juicy, with one of the sweetest and least acidic flavors of any papaya variety.',1,10.00);

insert into product_inventory(product_id,quantity)values(1,'250');

insert into cart(user_id,product_id,total)values(1,1,10.00);

insert into orders(user_id,product_id,total)values(1,1,10.00);



----*****************************JOIN TABLE QUERIES
select products.name, products.description, products.category_id, 
products.price, products.quantity, product_category.name
from products 
inner join product_category on products.category_id = product_category.id;