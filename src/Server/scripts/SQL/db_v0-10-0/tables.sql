-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema progenetic_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema progenetic_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `progenetic_db` DEFAULT CHARACTER SET utf8 ;
USE `progenetic_db` ;

-- -----------------------------------------------------
-- Table `progenetic_db`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC, `name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`patent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`patent` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`presentation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`presentation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC, `name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `on_offer` TINYINT(1) NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `presentation_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ud_UNIQUE` (`id` ASC) ,
  INDEX `fk_product_category1_idx` (`category_id` ASC) ,
  INDEX `fk_product_presentation1_idx` (`presentation_id` ASC) ,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `progenetic_db`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_presentation1`
    FOREIGN KEY (`presentation_id`)
    REFERENCES `progenetic_db`.`presentation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`product_has_patent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`product_has_patent` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `patent_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_has_patent_patent1_idx` (`patent_id` ASC) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_product_has_patent_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_product_has_patent_patent1`
    FOREIGN KEY (`patent_id`)
    REFERENCES `progenetic_db`.`patent` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_patent_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `progenetic_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `path` TINYTEXT NOT NULL,
  `ext` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`product_has_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`product_has_file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `file_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_product_has_file_product1_idx` (`product_id` ASC) ,
  INDEX `fk_product_has_file_file1_idx` (`file_id` ASC) ,
  CONSTRAINT `fk_product_has_file_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `progenetic_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_file_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `progenetic_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`banner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`banner` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` TINYTEXT NULL,
  `subtitle` TINYTEXT NULL,
  `click_path` VARCHAR(250) NULL,
  `file_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_banner_file1_idx` (`file_id` ASC) ,
  CONSTRAINT `fk_banner_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `progenetic_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`yield`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`yield` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `file_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `yield_UNIQUE` (`id` ASC) ,
  INDEX `fk_yield_file1_idx` (`file_id` ASC) ,
  CONSTRAINT `fk_yield_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `progenetic_db`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`yield_presentation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`yield_presentation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `yield_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_yield_presentation_yield1_idx` (`yield_id` ASC) ,
  CONSTRAINT `fk_yield_presentation_yield1`
    FOREIGN KEY (`yield_id`)
    REFERENCES `progenetic_db`.`yield` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`yield_presentation_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`yield_presentation_has_product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `yield_presentation_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  INDEX `fk_yield_presentation_has_product_yield_presentation1_idx` (`yield_presentation_id` ASC) ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_yield_presentation_has_product_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_yield_presentation_has_product_yield_presentation1`
    FOREIGN KEY (`yield_presentation_id`)
    REFERENCES `progenetic_db`.`yield_presentation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_yield_presentation_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `progenetic_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(90) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `type` ENUM('ADMIN', 'PROVIDER', 'CUSTOMER', 'EMPLOYEE') NOT NULL,
  `status` ENUM('ACTIVE', 'DISABLED', 'REMOVED') NOT NULL DEFAULT 'ACTIVE',
  `delete` TINYINT(1) NULL DEFAULT 0,
  `file_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`quote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`quote` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `total` DECIMAL(15,4) NULL,
  `contact` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telephone` VARCHAR(150) NOT NULL,
  `status` ENUM('REQUIRED', 'ASSIGNED', 'RUNNING', 'SEND', 'CANCELED') NOT NULL DEFAULT 'REQUIRED',
  INDEX `fk_user_has_product_user1_idx` (`user_id` ASC) ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  CONSTRAINT `fk_user_has_product_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `progenetic_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`quote_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`quote_has_product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quote_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `quote_price` DECIMAL(15,4) NULL,
  INDEX `fk_quote_has_product_quote1_idx` (`quote_id` ASC) ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  CONSTRAINT `fk_quote_has_product_quote1`
    FOREIGN KEY (`quote_id`)
    REFERENCES `progenetic_db`.`quote` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`feature` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`product_has_feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`product_has_feature` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `feature_id` INT UNSIGNED NOT NULL,
  `name` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_has_feature_feature1_idx` (`feature_id` ASC) ,
  INDEX `fk_product_has_feature_product1_idx` (`product_id` ASC) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  CONSTRAINT `fk_product_has_feature_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `progenetic_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_feature_feature1`
    FOREIGN KEY (`feature_id`)
    REFERENCES `progenetic_db`.`feature` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
