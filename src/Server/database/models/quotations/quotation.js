/* eslint-disable camelcase */
const { bookshelf, knex } = require("~/Server/database/db");

// Import Models
const ProductModel = require("~/Server/database/models/products/product");

require("~/Server/database/models/quotations/quotation_has_product");

const Quotation = bookshelf.Model.extend({
	tableName  : "quotation",
	quotations : function() {
		return this.belongsToMany(ProductModel, "quotation_has_product")
			.through("QuotationHasProduct", "product_id")
			.query(function(builder) {
				builder.columns(
					"quotation_has_product.product_id as id",
					"quotation_has_product.name as label",
					function() {
						this.select("p.name")
							.from("product AS f")
							.where("p.id", knex.raw("quotation_has_product.product_id"))
							.as("name");
					},
				);
			});
	},
	products : function() {
		return this.hasMany("QuotationHasProduct", "quotation_id")
			.query(function(builder) {
				builder
					.columns(
						"*",
						function() {
							this
								.select("p.name")
								.from("product as p")
								.where("p.id", knex.raw("quotation_has_product.product_id"))
								.as("name");
						},
						function() {
							this
								.select("p.description")
								.from("product as p")
								.where("p.id", knex.raw("quotation_has_product.product_id"))
								.as("description");
						},
						function() {
							this
								.select(
									function() {
										this.select("pr.name")
											.from("presentation AS pr")
											.where("pr.id", "=", knex.raw("p.presentation_id"));
									}
								)
								.from("product as p")
								.where("p.id", knex.raw("quotation_has_product.product_id"))
								.as("presentation");
						},
						function() {
							this
								.select(
									function() {
										this.select("c.name")
											.from("category AS c")
											.where("c.id", "=", knex.raw("p.category_id"));
									}
								)
								.from("product as p")
								.where("p.id", knex.raw("quotation_has_product.product_id"))
								.as("category");
						},
						function() {
							this
								.select(
									"phf.file_id"
								)
								.from("product_has_file as phf")
								.where("phf.product_id", knex.raw("quotation_has_product.product_id"))
								.orderBy("id", "ASC")
								.limit(1)
								.as("file_id");
						},
					);
			});
	},
});

module.exports = bookshelf.model("Quotation", Quotation);
