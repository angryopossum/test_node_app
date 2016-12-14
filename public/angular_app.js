(function(){

var app = angular.module('shop42', []);

app.controller('ProductController', function() {
  
  this.storename = "shop42";

});

app.controller('SearchController', function($scope, $http, $timeout) {
    $scope.searchText = null;
    $scope.change = function(text) {
      var valtosend = $scope.searchText;
        $http.post('http://test-node-app-angryopossum.c9users.io/search', {search: valtosend}).then(function(result){
            $scope.entries = result.data;
            console.log(JSON.stringify(result.data));
        });
        };
    });




})();

