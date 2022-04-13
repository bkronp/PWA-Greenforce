const { bookshelf } = require("~/Server/database/db");

const YieldPresentationHasProduct = bookshelf.Model.extend({
	tableName : "yield_presentation_has_product",
});

module.exports = bookshelf.model("yYeldPresentationHasProduct", YieldPresentationHasProduct);
