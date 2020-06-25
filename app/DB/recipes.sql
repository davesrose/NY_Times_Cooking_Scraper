DROP DATABASE IF EXISTS recipes_DB;

CREATE DATABASE recipes_DB;

USE recipes_DB;

CREATE TABLE recipes (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    recipe_title VARCHAR(250) DEFAULT "Chicken" NOT NULL,
    author_name VARCHAR(100) DEFAULT "Jane Doe" NOT NULL,
    category VARCHAR(200),
    summary longtext,
    steps longtext,
    notes longtext,
    ingredients longtext,

    -- price INTEGER(11) DEFAULT 98.99 NOT NULL,
    -- stock_quantity INTEGER(11)  DEFAULT 100 NOT NULL,
    PRIMARY KEY (item_id)
);