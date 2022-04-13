const { bookshelf } = require("~/Server/database/db");

// Import Others Relations Models
// require("../customers/customer");
// require("../providers/provider");
// require("../employees/employee");
require("../info/file");

const User = bookshelf.Model.extend({
	tableName : "user",
	file      : function() {
		return this.belongsTo("File");
	},
	// customer  : function() {
	// 	return this.hasOne("Customer");
	// },
	// employee : function() {
	// 	return this.hasOne("Employee");
	// },
	// provider : function() {
	// 	return this.hasOne("Provider");
	// },
});

module.exports = bookshelf.model("User", User);
