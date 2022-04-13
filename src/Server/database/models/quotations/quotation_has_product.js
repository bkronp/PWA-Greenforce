const { bookshelf } = require("~/Server/database/db");

const QuotationHasProduct = bookshelf.Model.extend({
	tableName : "quotation_has_product",
});

module.exports = bookshelf.model("QuotationHasProduct", QuotationHasProduct);
