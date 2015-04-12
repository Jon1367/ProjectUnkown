angular.module('space', ['ngRoute'])

    
    
    
.controller('signed', signed);
var socket = io.connect();
function signed($scope) {
    var fbRef = new Firebase("https://project-unkown.firebaseio.com/");
    
    $scope.loginData = false;
    
    $scope.signer = function(){
      $scope.loginData = true;
        fbRef.authWithOAuthPopup("facebook", function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                  $scope.loginData = true;
                console.log("Authenticated successfully with payload:", authData);
              }
        });
     
    };
      
      
      $scope.logOut = function(){
        $scope.loginData = false;
       fbRef.unauth();
        alert('logOut');
    };
       
  
}

socket.emit('namedSocket', { data: 'vic hello' });

socket.on('news',function(man){ // second socket incase we need to transfer data both ways.
       
        
       console.log(man + "this is in the news socket on clause"); // we can return more data to server trough this second socket
        
    
});