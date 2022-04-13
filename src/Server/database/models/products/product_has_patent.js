const { bookshelf } = require("~/Server/database/db");

const ProductHasPatent = bookshelf.Model.extend({
	tableName : "product_has_patent",
});

module.exports = bookshelf.model("ProductHasPatent", ProductHasPatent);
