(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuy();
  this.isEmpty = () => { return toBuy.items.length == 0; }

  this.name = "";
  this.quantity = "";
  this.addItem = () => { ShoppingListCheckOffService.addToBuyItem(toBuy.name, toBuy.quantity)};
  this.boughtThis = (index) => { ShoppingListCheckOffService.boughtByIndex(index)};
};


function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBought();
  this.isEmpty = () => { return alreadyBought.items.length == 0; }

};

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyList = populateToBuyArray();    // list of items to buy
  var alreadyBoughtList = [];              // list of items already bought

  console.log('Start values: ', toBuyList);
  service.getToBuy = () => { return toBuyList };
  service.getAlreadyBought = () => { return alreadyBoughtList };

  service.addToBuyItem = function (name, quantity) {
    toBuyList.push(
      {
        name: name,
        quantity: quantity
      }
    );
  };

  service.boughtByIndex = function (index) {
    alreadyBoughtList.push(
      toBuyList.splice(index, 1)[0] // because of GUI buttons, there always only ONE item moves at time
    )
  }
};

function populateToBuyArray() {
  return [
    {
      name: 'Beer',
      quantity: 'At least 4 bootles'
    },
    {
      name: 'Chocklets',
      quantity: 'One package'
    },
    {
      name: 'Wine',
      quantity: 'One Botle'
    },
    {
      name: 'Flowers',
      quantity: '1 bucket'
    },
    {
      name: 'Ice Creams',
      quantity: '2'
    }
  ];
}

})();
