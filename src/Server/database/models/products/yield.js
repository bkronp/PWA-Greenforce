const { bookshelf } = require("~/Server/database/db");

const Yield = bookshelf.Model.extend({
	tableName : "yield",
});

module.exports = bookshelf.model("Yield", Yield);
