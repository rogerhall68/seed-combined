(function(){
'use strict';

angular
.module('sopList')
.directive('miListList', ['$state', 'ListService', 'CacheService', function($state, ListService, CacheService) {
	var ListList = function($state, ListService, CacheService) {
		console.log('ListList Controller Called');
		var cntlr = this;
		cntlr.cntlrPage = null;  // Linked
		cntlr.lists = null;  // All lists list

		cntlr.set = function(list) { cntlr.list = list; };
		cntlr.select = function(list) { cntlr.cntlrPage.set(list); };
		cntlr.update = function(list) { 
			var found = cntlr.lists.filter(function(v){ if (v.id === list.id) { return v; }	}).length;
			if (found === 0) {
				cntlr.lists.push(list);
				cntlr.set(list); 
				cntlr.select(list); 
			} else {
				// Update
			}
		};

		// Initialize list of lists
		ListService.getLists().then(function (data) { 
			cntlr.lists = data; 
			cntlr.cntlrPage.lists = data; 
		});
	};

	var link = function(scope, el, attrs, ctrls) {
		var cntlrList = ctrls[0];
		var cntlrPage = scope.$parent.cntlr;
		cntlrList.cntlrPage = cntlrPage;
		cntlrPage.cntlrList = cntlrList;
	};

	return {
		restrict: 'E',
		require: ['miListList'],
		templateUrl: 'mi-list-list.html',
		scope: true,
		controller: ListList,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('List List Directive Initialized');
