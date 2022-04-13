/* eslint-disable camelcase */
import { bookshelf, knex }     from "~/Server/database/db";
import ProviderHasProductModel from "~/Server/database/models/providers/provider_has_product";

const Product = bookshelf.Model.extend({
	tableName       : "product",
	cheaper_product : function() {
		return this.hasMany(ProviderHasProductModel)
			.query(function(builder) {
				builder
					.columns("*")
					.orderBy("price", "ASC");
			});
	},
	provider_has_product_active : function() {
		return this.hasMany(ProviderHasProductModel)
			.query(function(builder) {
				builder
					.columns(
						"provider_has_product.id",
						"provider_has_product.provider_id",
						"provider_has_product.product_id",
						"provider_has_product.price",
						"provider_has_product.flags",
						"provider_has_product.status",
						function() {
							this.select("trade_name")
								.from("provider AS p")
								.where("p.id", knex.raw("provider_has_product.provider_id"))
								.as("trade_name");
						},
						function() {
							this
								.select(function() {
									this.select(knex.raw("IFNULL(SUM(r.rating) / COUNT(r.rating), 0)"))
										.from("rating AS r")
										.where("r.user_id", "=", knex.raw("p.user_id"))
										.as("rating");
								})
								.from("provider AS p")
								.where("p.id", knex.raw("provider_has_product.provider_id"))
								.as("rating");
						},
					)
					.where("provider_has_product.status", "ACTIVE")
					.orderBy("price", "ASC");
			});
	},
});

module.exports = bookshelf.model("Product", Product);
