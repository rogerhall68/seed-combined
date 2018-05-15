(function(){
'use strict';

angular
.module('workbench')
.directive('miWorkbenchProduct', ['StorageService', function(StorageService) {
	var WorkbenchProduct = function(StorageService) {
		var cntlr = this;
		console.log('WorkbenchProduct()');

		cntlr.moveFrom = function() {
			if (!StorageService.moveStackContains(cntlr.product)) { 
				StorageService.moveFrom(cntlr.product);
			}
			cntlr.product.inQueue = true;
		};

		cntlr.moveTo = function() {
			if (StorageService.moveStackNotEmpty(cntlr.product)) {
				StorageService.moveTo(cntlr.product);
			}
		};

		cntlr.moveReturn = function() {
			StorageService.moveReturn(cntlr.product);
			cntlr.product.inQueue = false;
		};
	};

	var link = function(scope, el, attrs, ctrls) {
		// console.log('miFreezerProduct attrs', scope, el, attrs, ctrls);
		// console.log('attrs.product', attrs.product);
		var cntlrBrowser = ctrls[0];
		var cntlrProduct = ctrls[1];
		// cntlrProduct.positions = attrs.positions;
		// cntlrProduct.size[attrs.positions] = true;
		cntlrProduct.product = JSON.parse(attrs.product);
		// console.log('cntlrProduct.product', cntlrProduct.product);

		// if (Object.keys(cntlrProduct.size).indexOf(attrs.positions) < 0) { 
		// 	console.log('Error: box size not found', attrs.positions);
		// }
	};

	return {
		require: ['^miWorkbenchDisplay', 'miWorkbenchProduct'],
		restrict: 'E',
		templateUrl: 'mi-workbench-product.html',
		scope: { },
		controller: WorkbenchProduct,
		controllerAs: 'cntlr',
		// bindToController: true
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('Workbench Product Directive Initialized');
