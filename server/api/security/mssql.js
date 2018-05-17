(function() {

	var getUsers = {
		"q": "SELECT [user_id],[user_active],[user_first_name],[user_last_name],[user_email],[user_phone],[user_login_type_id],[user_login_name],[user_login_password],[user_login_password_salt],[user_comment],[dept_id] FROM [dbo].[SECURITY_USER]"
	};

	var getUser = {
		"q": "[dbo].[SP_SECURITY_USER_AUTHN]",
		"params": ["user_login_name", "user_badge"],
		"output": [
			{ name: "user_id", type: "int" }, 
			{ name: "user_first_name", type: "varchar", size: "255" },
			{ name: "user_last_name", type: "varchar", size: "255" },
			{ name: "user_email", type: "varchar", size: "255" },
			{ name: "user_session", type: "varchar", size: "max" },
			{ name: "user_token", type: "varchar", size: "64" },
			],
		"data": function (req) { return [req.params.user_name, null]; }
	};

	var getGroups = {
		"q": "SELECT [group_id],[group_name] FROM [dbo].[SECURITY_GROUP]"
	};

	var getApplications = {
		"q": "SELECT [app_id],[app_active],[app_name],[system_id] FROM [dbo].[SECURITY_APPLICATION]"
	};

	var getApplicationModules = {
		"q": "SELECT mod.[module_id],mod.[module_active],mod.[module_name],mod.[parent_module_id] FROM [dbo].[SECURITY_MODULE] as mod JOIN [dbo].[SECURITY_APPLICATION_MODULE] as appmod ON mod.[module_id] = appmod.[module_id]"
	};

	var getModules = {
		"q": "SELECT [module_id],[module_active],[module_name],[parent_module_id] FROM [dbo].[SECURITY_MODULE]"
	};

	var getRoles = {
		"q": "SELECT [role_id],[role_active],[role_name] FROM [dbo].[SECURITY_ROLE]"
	};

	var getUserTyes = {
		"q": "SELECT [user_login_type_id],[user_login_type_name] FROM [dbo].[SECURITY_USER_LOGIN_TYPE]"
	};

	var getDepartments = {
		"q": "SELECT [dept_id],[dept_name],[organization_id] FROM [dbo].[DEPARTMENT]"
	};

	var getLaboratorys = {
		"q": "SELECT [lab_id],[lab_name],[lab_alt_name],[dept_id] FROM [dbo].[LABORATORY]"
	};

	var getPrivileges = {
		"q": "SELECT [priv_id],[priv_name] FROM [dbo].[SECURITY_PRIVILEGE]"
	};

	var getUserGroup = {
		"q": "SELECT [store_config_id],[store_type_id],[store_config_name],[store_config_desc],[store_config_brand],[store_config_model],[store_config_dim_1],[store_config_dim_1_label_id],[store_config_dim_1_dir_id],[store_config_dim_2],[store_config_dim_2_label_id],[store_config_dim_2_dir_id],[has_predefined_positions] FROM [dbo].[STORAGE_CONFIG] WHERE [store_config_id] = @store_config_id",
		"params": ["store_config_id"],
		"data": function (req) { return [req.params.config_id]; }
	};

	var addGroup = {
		"q": "SELECT [store_config_id],[store_type_id],[store_config_name],[store_config_desc],[store_config_brand],[store_config_model],[store_config_dim_1],[store_config_dim_1_label_id],[store_config_dim_1_dir_id],[store_config_dim_2],[store_config_dim_2_label_id],[store_config_dim_2_dir_id],[has_predefined_positions] FROM [dbo].[STORAGE_CONFIG] WHERE [store_config_id] = @store_config_id",
		"params": ["store_config_id"],
		"data": function (req) { return [req.params.config_id]; }
	};


// -- user group
// SELECT [user_group_id],[user_id],[group_id] FROM [dbo].[SECURITY_USER_GROUP];
// -- module group
// SELECT [module_group_id],[module_group_name],[app_id] FROM [dbo].[SECURITY_MODULE_GROUP];
// -- role module privilege
// SELECT [role_module_priv_id],[role_id],[module_id],[priv_id] FROM [dbo].[SECURITY_ROLE_MODULE_PRIVILEGE];
// -- group role
// SELECT [group_role_id],[role_id],[group_id] FROM [dbo].[SECURITY_GROUP_ROLE];

	module.exports = {
		getUsers: getUsers,
		getUser: getUser,
		getGroups: getGroups,
		getApplications: getApplications,
		getApplicationModules: getApplicationModules,
		getModules: getModules,
		getRoles: getRoles,
		getUserTyes: getUserTyes,
		getDepartments: getDepartments,
		getLaboratorys: getLaboratorys,
	};
})();


