const { bookshelf } = require("~/Server/database/db");

const Presentation = bookshelf.Model.extend({
	tableName : "presentation",
});

module.exports = bookshelf.model("Presentation", Presentation);
