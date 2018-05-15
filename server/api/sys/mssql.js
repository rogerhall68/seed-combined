(function() {
	var getLeaves = {
		"q": "SELECT [table_name] FROM (SELECT [table_name], COUNT(*) AS TOTAL FROM (SELECT DISTINCT [table_name], [fk_table] FROM [dbo].[VU_TABLE_INFO] WHERE [table_name] NOT LIKE '%_HISTORY') a GROUP BY [table_name]) b WHERE [TOTAL] = 1"
	};

	var getTables = {
		"q": "SELECT DISTINCT [table_name] FROM [dbo].[VU_TABLE_INFO]"
	};

	var getTable = {
		"q": "SELECT * FROM [dbo].[VU_TABLE_INFO] WHERE [table_name] = @table_name",
		"params": ["table_name"],
		"data": function (req) { return [req.params.table_name]; }
	};

	var updateTable = {
		"q": "[dbo].[SP_EXT_PROP_TABLE_UPDATE]",
		"params": ["table_name", "property_name", "value"],
		"data": function (req) { return [req.params.table_name, req.body.property_name, req.body.value]; }
	};

	var getAttrib = {
		"q": "SELECT * FROM [dbo].[VU_TABLE_INFO] WHERE [table_name] = @table_name AND [attrib_name] = @attrib_name",
		"params": ["table_name", "attrib_name"],
		"data": function (req) { return [req.params.table_name, req.params.attrib_name]; }
	};

	var updateAttrib = {
		"q": "[dbo].[SP_EXT_PROP_ATTRIB_UPDATE]",
		"params": ["table_name", "attribute_name", "property_name", "value"],
		"data": function (req) { return [req.params.table_name, req.body.attribute_name, req.body.property_name, req.body.value]; }
	};

	var selectAsync = {
		"q": "[dbo].[SP_ASYNC_SELECT]",
		"params": ["table", "success_value", "success_msg"],
		"output": [
			{ name: "success_value", type: "varchar", size: "max" }, 
			{ name: "success_msg", type: "varchar", size: "255" }
			],
		"data": function (req) { return [req.params.table_name, req.body.success_value, req.body.success_msg]; }
		// "data": function (req) { return [req.params.table_name, null, null]; }
	};

	var selectAsyncLU = {
		"q": "[dbo].[SP_ASYNC_SELECT_LU]",
		"params": ["table", "order_by_name", "success_value", "success_msg"],
		"data": function (req) { return [req.params.table_name, req.body.order_by_name, req.body.success_value, req.body.success_msg]; }
	};

	var insertAsync = {
		"q": "[dbo].[SP_ASYNC_INSERT]",
		"params": ["table", "values", "user", "edit_interval_id", "success_id", "success_msg"],
		"data": function (req) { return [req.params.table_name, req.body.values, req.body.user, req.body.edit_interval_id, req.body.success_id, req.body.success_msg]; }
	};

	var updateAsync = {
		"q": "[dbo].[SP_ASYNC_UPDATE]",
		"params": ["table", "table_key", "table_key_value", "attribute", "attribute_value", "edit_user", "edit_interval_id"],
		"data": function (req) { return [req.params.table_name, req.body.table_key, req.body.table_key_value, req.body.attribute, req.body.attribute_value, req.body.edit_user, req.body.edit_interval_id]; }
	};

	module.exports = {
		getLeaves: getLeaves,
		getTables: getTables,
		getTable: getTable,
		updateTable: updateTable,
		getAttrib: getAttrib,
		updateAttrib: updateAttrib,
		selectAsync: selectAsync,
		selectAsyncLU: selectAsyncLU,
		insertAsync: insertAsync,
		updateAsync: updateAsync
	};
})();