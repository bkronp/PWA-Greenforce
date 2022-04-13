-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `progenetic_db`.`quotation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`quotation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `code` VARCHAR(20) NOT NULL,
  `customer_name` VARCHAR(200) NOT NULL,
  `customer_email` VARCHAR(100) NOT NULL,
  `customer_telephone` VARCHAR(25) NOT NULL,
  `address` TINYTEXT NOT NULL,
  `itemized _tax` TINYINT NOT NULL DEFAULT 0,
  `amount` DECIMAL(15,4) NULL,
  `status` ENUM('REQUESTED', 'RUNNING', 'CANCELED', 'DECLINED', 'FINISHED') NULL,
  `exchange currency` ENUM('MNX', 'DLL') NOT NULL DEFAULT 'MNX',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_quotation_user1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_quotation_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `progenetic_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `progenetic_db`.`quotation_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `progenetic_db`.`quotation_has_product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quotation_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `price` DECIMAL(15,4) NULL,
  INDEX `fk_quotation_has_product_product1_idx` (`product_id` ASC) ,
  INDEX `fk_quotation_has_product_quotation1_idx` (`quotation_id` ASC) ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  CONSTRAINT `fk_quotation_has_product_quotation1`
    FOREIGN KEY (`quotation_id`)
    REFERENCES `progenetic_db`.`quotation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_quotation_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `progenetic_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
