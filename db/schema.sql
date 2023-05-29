CREATE DATABASE IF NOT EXISTS cabin_conundrum_db;

USE cabin_conundrum_db;

CREATE TABLE inventory (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
