(function() {

	// var getTables = {
	// 	"q": "SELECT DISTINCT [table_name] FROM [dbo].[VU_TABLE_INFO]"
	// };

	var getAuthZ = {
		"q": "SELECT * FROM [dbo].[VU_TABLE_INFO] WHERE [table_name] = @table_name",
		"params": ["table_name"],
		"data": function (req) { return [req.params.table_name]; }
	};

	module.exports = {
		getTables: getTables,
		getTable: getTable,
		updateTable: updateTable,
		getAttrib: getAttrib,
		updateAttrib: updateAttrib
	};
})();