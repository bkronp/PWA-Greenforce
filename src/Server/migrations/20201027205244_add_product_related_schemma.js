/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.createTable("product_related", function(t) {
		t.increments("id").unsigned().primary().notNullable();
		t.integer("product_id").unsigned().notNullable();
		t.integer("product_related_id").unsigned().notNullable();

		t.index("product_id", "fk_product_related_product1_idx");
		t.foreign("product_id", "fk_product_related_product1_idx")
			.references("product.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");

		t.index("product_related_id", "fk_product_related_product_related1_idx");
		t.foreign("product_related_id", "fk_product_related_product_related1_idx")
			.references("product.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
