const { bookshelf } = require("~/Server/database/db");

const ProductRelated = bookshelf.Model.extend({
	tableName : "product_related",
});

module.exports = bookshelf.model("ProductRelated", ProductRelated);
