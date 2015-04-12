angular.module('space').controller('homecontroller', ['$scope', '$http', function($scope, $http){

   console.log('home controller');

    $scope.login = function(){ 
        alert('this controller is login in');
        
    };

}]);