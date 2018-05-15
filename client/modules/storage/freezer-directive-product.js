(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerProduct', ['$rootScope', '$window', 'StorageService', function($rootScope, $window, StorageService) {
	var FreezerProduct = function($rootScope, $window, StorageService) {
		// console.log('FreezerProduct()');
		var cntlr = this;
		cntlr.positions = null;
		cntlr.size = { '100': false, '81': false };

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

		cntlr.menu = function(id) {
			console.log('menu', $rootScope.mousePosition, cntlr.product.id);
			cntlr.dialogStyle.left = $rootScope.mousePosition.x + 10;
			cntlr.dialogStyle.top = $rootScope.mousePosition.y + 10;
			cntlr.toggleModal();
		};

		cntlr.dialogStyle = {
			'border-radius': '4px',
			'color': '#000',
			'font-size': '12px',
			'width': '140px',
			'height': '140px',
			'left': '0',
			'top': '0',
			'padding': '4px',
			'z-index': 10000, 
			'position': 'fixed',
			'background-color': '#eee', 
			'box-shadow': '4px 4px 10px #000'
		};
		cntlr.modalShown = false;
		cntlr.toggleModal = function() { cntlr.modalShown = !cntlr.modalShown; };
		cntlr.modalOff = function() { cntlr.modalShown = false; };
		cntlr.modalOn = function() { cntlr.modalShown = true; };
		cntlr.mouseenter = function(product) {
			cntlr.product = product;
			cntlr.dialogStyle.left = $rootScope.mousePosition.x + 10;
			cntlr.dialogStyle.top = $rootScope.mousePosition.y + 10;
			cntlr.modalOn();
		};
		cntlr.mouseleave = function() {
			cntlr.modalOff();
		};
		cntlr.mouseX = null;
		cntlr.mouseY = null;
		cntlr.mousemove = function(event) {
			cntlr.mouseX = event.clientX;
			cntlr.mouseY = event.clientY;
		};

		cntlr.printLabel = function() {
			console.log("printLabel()");

			var html = `
<!doctype html>
<html lang="en">
<head>
	<title>Print Labels Inner</title> 
	<style>
	  	html { 
	  		padding: 0px; 
	  		margin-top: 0px;
			width: 120px; 
	  	}
	  	body { 
	  		padding: 0px; 
	  		margin-top: 0px; 
	  	}
		.label { 
			width: 120px; 
			height: 120px; 
			border: 0px; 
			margin-left: 60px; 
			padding: 0px; 
			transform: rotate(90deg);
			transform-origin: left top 0; 
			font-size: 9pt;
			font-family: arial;
			text-align: center;
		}
		.barcode { 
			width: 120px; 
			height: 40px; 
			border: 0px; 
			margin: 0px; 
			padding: 0px; 
		}
		.big {
			font-size: 18pt;
		}
		@media print {
  			div { 
    			page-break-after: always;
  			}
  		}
	</style>
</head>
<body>
	<div class="label"><img class="barcode" id="barcode"/><br>` + cntlr.product.id + `</div>
	<script src="http://dmirt037:8081/bower_components/JsBarcode/dist/JsBarcode.all.js"></`;
	html += `script>
	<script>
		function doThing(id) { console.log('doThing(' + id + ')'); }
	</`;
	html += `script>
	<script>
		console.log("Window Console");
		doThing(4);
		JsBarcode("#barcode", "` + cntlr.product.id + `", { fontSize: 16 });
		window.print();
		// .options({font: "OCR-B"}) // Will affect all barcodes
		// .EAN13("1234567890128", {fontSize: 9, textMargin: 0});
	</`;
	html += `script>
</body>
</html>
			`;

		    var myWindow=$window.open('','','width=400,height=400');
		    myWindow.document.write(html);
		    myWindow.document.close();
		    myWindow.focus();
    		// myWindow.print(); 
		};

	};

	var link = function(scope, el, attrs, ctrls) {
		// console.log('miFreezerProduct attrs', scope, el, attrs, ctrls);
		// console.log('attrs.product', attrs.product);
		var cntlrBrowser = ctrls[0];
		var cntlrProduct = ctrls[1];
		cntlrProduct.positions = attrs.positions;
		cntlrProduct.size[attrs.positions] = true;
		cntlrProduct.product = JSON.parse(attrs.product);
		// console.log('cntlrProduct.product', cntlrProduct.product);

		if (Object.keys(cntlrProduct.size).indexOf(attrs.positions) < 0) { 
			console.log('Error: box size not found', attrs.positions);
		}
	};

	return {
		require: ['^miFreezerBrowser', 'miFreezerProduct'],
		restrict: 'E',
		templateUrl: 'mi-freezer-product.html',
		scope: { },
		controller: FreezerProduct,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('Freezer Product Directive Initialized');
