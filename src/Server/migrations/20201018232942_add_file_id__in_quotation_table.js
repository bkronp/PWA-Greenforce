/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE quotation ADD COLUMN `file_id` INT UNSIGNED NULL AFTER `date`, ADD INDEX `fk_quotation_file1_idx` (`file_id` ASC);");
	await knex.raw("ALTER TABLE quotation ADD CONSTRAINT `fk_quotation_file1` FOREIGN KEY (`file_id`) REFERENCES `progenetic_db`.`file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
	await knex.raw("ALTER TABLE quotation CHANGE COLUMN `itemized _tax` `itemized_tax` TINYINT NOT NULL DEFAULT '0' ;");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
