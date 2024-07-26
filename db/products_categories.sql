show tables;

select * from  users;

describe users;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(70) NOT NULL,
    classification CHAR NOT NULL,
    status TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subcategory VARCHAR(70) NOT NULL,
    category_id INT NOT NULL,
    status TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(100) NOT NULL,
    subcategory_id INT NOT NULL ,
    product_key VARCHAR(15),
    dimensions VARCHAR(255),
    image VARCHAR(255),
    maintenance_days INT,
    status TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);


CREATE TABLE history_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    stock INT,
    rental_price DECIMAL(10, 2),
    replacement_cost DECIMAL(10, 2),
    cost_excluding_taxes DECIMAL(10, 2),
    cost DECIMAL(10, 2),
    security_deposit DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


show tables;

drop table categories;
drop table subcategories;
drop table history_products;
drop table products;

delete from subcategories where status = 1;
describe products;

select * from products order by id desc;

SELECT * FROM products LIMIT 25 OFFSET 0;

SELECT @@version;



