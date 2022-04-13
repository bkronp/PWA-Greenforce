const { bookshelf } = require("~/Server/database/db");

const Patent = bookshelf.Model.extend({
	tableName : "patent",
});

module.exports = bookshelf.model("Patent", Patent);
