-- docker cp CREATE-SCRIPT.sql MYSQL-NODE:/tmp

-- mysql -p < tmp/CREATE-SCRIPT.sql

CREATE DATABASE IF NOT EXISTS `node-complete`;

CREATE TABLE `node-complete`.`products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL, 
    `price` DOUBLE NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO `node-complete`.`products` (`title`, `price`, `description`, `imageUrl`) VALUES 
('Product 1', 19.99, 'This is the description for Product 1', 'https://picsum.photos/200'),
('Product 2', 29.99, 'This is the description for Product 2', 'https://picsum.photos/300'),
('Product 3', 39.99, 'This is the description for Product 3', 'https://picsum.photos/250');