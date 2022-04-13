/* eslint-disable camelcase */
const { bookshelf, knex } = require("~/Server/database/db");

// Import Models
const FileModel                        = require("~/Server/database/models/info/file");
const FeatureModel                     = require("~/Server/database/models/products/feature");
const PatentModel                      = require("~/Server/database/models/products/patent");
const YieldPresentationModel           = require("~/Server/database/models/products/yield_presentation");
const ProductHasFileModel              = require("~/Server/database/models/products/product_has_file");
const ProductHasFeatureModel           = require("~/Server/database/models/products/product_has_feature");
const ProductHasPatentsModel           = require("~/Server/database/models/products/product_has_patent");
const YieldPresentationHasProductModel = require("~/Server/database/models/products/yield_presentation_has_product");
require("~/Server/database/models/products/product_related");

const Product = bookshelf.Model.extend({
	tableName : "product",
	files     : function() {
		return this.belongsToMany(FileModel, "product_has_file")
			.through(ProductHasFileModel, "product_id")
			.query(function(builder) {
				builder.columns(
					"product_has_file.file_id as id",
				);
			});
	},
	datasheet : function() {
		return this.hasOne(FileModel, "id", "datasheet_file_id");
	},
	features : function() {
		return this.belongsToMany(FeatureModel, "product_has_feature")
			.through(ProductHasFeatureModel, "product_id")
			.query(function(builder) {
				builder.columns(
					"product_has_feature.feature_id as id",
					"product_has_feature.name as label",
					function() {
						this.select("f.name")
							.from("feature AS f")
							.where("f.id", knex.raw("product_has_feature.feature_id"))
							.as("name");
					},
				);
			});
	},
	patents : function() {
		return this.belongsToMany(PatentModel, "patent")
			.through(ProductHasPatentsModel, "product_id")
			.query(function(builder) {
				builder.columns(
					"product_has_patent.patent_id as id",
					function() {
						this.select("p.name")
							.from("patent AS p")
							.where("p.id", knex.raw("product_has_patent.patent_id"))
							.as("name");
					},
				);
			});
	},
	yield_presentations : function() {
		return this.belongsToMany(YieldPresentationModel, "yield_presentation")
			.through(YieldPresentationHasProductModel, "product_id")
			.query(function(builder) {
				builder.columns(
					"yield_presentation.id",
					"yield_presentation.yield_id",
					"yield_presentation.name",
					function() {
						this.select("y.name")
							.from("yield AS y")
							.where("y.id", knex.raw("yield_presentation.yield_id"))
							.as("yield_name");
					},
				);
			});
	},
	products_related : function() {
		return this.hasMany("ProductRelated")
			.query(function(builder) {
				builder
					.columns(
						"*",
						function() {
							this
								.select("p.name")
								.from("product as p")
								.where("p.id", knex.raw("product_related.product_related_id"))
								.as("name");
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
								.where("p.id", knex.raw("product_related.product_related_id"))
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
								.where("p.id", knex.raw("product_related.product_related_id"))
								.as("category");
						},
						function() {
							this
								.select(
									"phf.file_id"
								)
								.from("product_has_file as phf")
								.where("phf.product_id", knex.raw("product_related.product_related_id"))
								.orderBy("id", "ASC")
								.limit(1)
								.as("file_id");
						},
					);
			});
	},
});

module.exports = bookshelf.model("Product", Product);
