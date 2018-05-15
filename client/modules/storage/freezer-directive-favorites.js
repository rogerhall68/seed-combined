(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerFavorites', ['$state', 'FreezerService', 'CacheService', function($state, FreezerService, CacheService) {
	var storageContainers = {
		cryo: { name: 'Cryo Freezer', template: 'mi-cryo.html', configId: 1 },
		thermo: { name: 'Thermo Revco UXF600 -80 Freezer', template: 'mi-thermo.html', configId: 6 }
	};

	var FreezerFavorites = function($state, FreezerService, CacheService) {
		// console.log('FreezerFavorites()');
		var cntlr = this;
		cntlr.navCntrl = null;
		// cntlr.lastVisited = CacheService.sysCache.get('/freezer/lastVisited'); // TODO: delete
		cntlr.lastVisited = CacheService.get('freezer.lastVisited') || { 'id': null };
		// cntlr.lastVisited = CacheService.sysCache.get('/freezer/lastVisited') || { 'id': 1 }; // TODO: delete
		// console.log('2 cntlr.lastVisited', cntlr.lastVisited)
		cntlr.freezers = FreezerService.getFreezers().then(function (data) { 
			cntlr.freezers = data; 
			// console.log(cntlr.freezers);
			if (cntlr.lastVisited.id > 0) { 
				cntlr.freezer = cntlr.freezers.filter(function(element, index, array){ return element.store_item_id === this; }, cntlr.lastVisited.id)[0];
			} 
		});
		cntlr.freezerSelected = function(id) {
			// console.log('freezerSelected { id: ' + id + ' }');
			cntlr.freezer = cntlr.freezers.filter(function(element, index, array){ return element.store_item_id === this; }, id)[0];
			// console.log(cntlr.freezer);

			cntlr.navCntrl.setFreezer(cntlr.freezer);

			var freezer = { id: id };
			// CacheService.sysCache.put('/freezer/lastVisited', freezer); // TODO: delete
			CacheService.put('freezer.lastVisited', freezer);
			cntlr.lastVisited = freezer;
		};
	};

	var link = function(scope, el, attrs, ctrls) {
		// console.log('miFreezerFavorites link', ctrls);
		var navCntrl = ctrls[0];
		var selectCntrl = ctrls[1];
		selectCntrl.navCntrl = navCntrl;
	};

	return {
		require: ['^miFreezerBrowser', 'miFreezerFavorites'],
		restrict: 'E',
		templateUrl: 'mi-freezer-favorites.html',
		scope: { },
		controller: FreezerFavorites,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('Freezer Favorites Directive Initialized');
