const { bookshelf } = require("~/Server/database/db");

const YieldPresentation = bookshelf.Model.extend({
	tableName : "yield_presentation",
});

module.exports = bookshelf.model("YieldPresentation", YieldPresentation);
