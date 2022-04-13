const { bookshelf } = require("~/Server/database/db");

const ProductHasFile = bookshelf.Model.extend({
	tableName : "product_has_file",
});

module.exports = bookshelf.model("ProductHasFile", ProductHasFile);
