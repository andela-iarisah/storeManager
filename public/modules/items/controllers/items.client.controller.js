'use strict';

// Items controller
angular.module('items').controller('ItemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items',
	function($scope, $stateParams, $location, Authentication, Items ) {
		$scope.authentication = Authentication;
		
		$scope.errorMsg = false;
	
		// Create new Item
		$scope.create = function() {
			// Create new Item object
			var item = new Items ({
				category: this.category,
				itemName: this.name,
				itemQuantity: this.quantity,
				minItemQuantity: this.minQty,
				addedQuantity: this.addQty,
				soldQuantity: this.qtySold,
				q: this.query
			});

			if (isNaN($scope.name) && !isNaN($scope.quantity) && !isNaN($scope.minQty)) {
				// Redirect after save
				item.$save(function(response) {
					$location.path('/items');

					// Clear form fields
					$scope.name = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
			else {
				$scope.errorMsg = true;
			}	
		};

		// Remove existing Item
		$scope.remove = function( item ) {
			if ( item ) { item.$remove();

				for (var i in $scope.items ) {
					if ($scope.items [i] === item ) {
						$scope.items.splice(i, 1);
					}
				}
			}
			else {
				$scope.item.$remove(function() {
					$location.path('items');
				});
			}	
		};

		// Update existing Item
		$scope.update = function(item, req) {
			
			if ($scope.newAdd > 0 || ($scope.itemQty > 0 && $scope.itemQty < item.itemQuantity)) {		
				item.$update(function() {
				$location.path('/items');
				}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				});
			
			//To add stock to existing supply
				if ($scope.newAdd) {
					var itemResource = new Items ({
						_id: this.identification,
						category: this.category,
						itemName: this.name,
						itemQuantity: this.quantity,
						minItemQuantity: this.minQty,
						addedQuantity: this.addQty,
						soldQuantity: this.qtySold,
						q: this.query
					});
					var addedQty = parseInt($scope.newAdd, 10);
					item.itemQuantity += addedQty;
					item.addedQuantity += addedQty;
					$scope.newAdd = '';
				}
			
			//To remove stock from existing supplies
				else if ($scope.itemQty) {
					var soldQty = parseInt($scope.itemQty, 10);
					item.itemQuantity -= soldQty;
					item.soldQuantity += soldQty;
					$scope.itemQty = '';
				}
			}

			else {
				$scope.errorMsg = true;
				$scope.itemQty = '';
				$scope.newAdd = '';
			}
		};

		// Find a list of Items
		$scope.find = function() {
			$scope.items = Items.query();
		};

		// Find existing Item
		$scope.findOne = function() {
			$scope.item = Items.get({ 
				itemId: $stateParams.itemId
			});
		};
	}
]);