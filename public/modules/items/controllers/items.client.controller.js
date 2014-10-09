'use strict';

// Items controller
angular.module('items').controller('ItemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items',
	function($scope, $stateParams, $location, Authentication, Items ) {
		$scope.authentication = Authentication;

		// Create new Item
		$scope.create = function() {
			// Create new Item object
			var item = new Items ({
				category: this.category,
				itemName: this.name,
				itemQuantity: this.quantity,
				minItemQuantity: this.minQty,
				addedQuantity: this.addQty,
				soldQuantity: this.qtySold
			});

			// Redirect after save
			item.$save(function(response) {
				$location.path('items/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Item
		$scope.remove = function( item ) {
			if ( item ) { item.$remove();

				for (var i in $scope.items ) {
					if ($scope.items [i] === item ) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.item.$remove(function() {
					$location.path('items');
				});
			}
		};

		// Update existing Item
		$scope.update = function(item, req) {
			item.$update(function() {
				$location.path('items/' + item._id);
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
					soldQuantity: this.qtySold
				});
				var addedQty = parseInt($scope.newAdd, 10);
				console.log(addedQty);
				//itemResource.addedQuantity = 0;
				// item.itemQuantity += addedQty 
				console.log(item.itemQuantity);
				item.itemQuantity += addedQty;
				console.log(item.itemQuantity);
			}
			
			//To remove stock from existing supplies
			else{
				// console.log(item.itemQuantity);
				// console.log(addedQty);
				// console.log($scope.item);

				
				var soldQty = parseInt($scope.itemQty, 10);
				// console.log(soldQty);
				// console.log($scope.item);
				item.itemQuantity -= soldQty;
				
				$scope.itemQty = '';
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