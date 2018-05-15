(function() {
	var db         = {
		widgets: [
				{ widget_id: 1, widget_type: 1, name: 'Widget 1', serial: 'FTT123456789' },
				{ widget_id: 2, widget_type: 3, name: 'Widget 2', serial: 'DF123456789' }
			]
	};

	module.exports = {
		widgets: db.widgets
	};
})();
