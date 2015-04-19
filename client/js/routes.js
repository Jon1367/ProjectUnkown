angular.module('space', ['ngRoute'])


.controller('editorNav',editorNav)    
.controller('profile',profile)    
//.controller('asteroids', asteroids)


.controller('signed', signed);
var socket = io.connect();
var fbRef = new Firebase("https://project-unkown.firebaseio.com/");






function signed($scope,$location) {
   fbRef.onAuth(authDataCallback);
   
    var authData = fbRef.getAuth();
    if (authData) {
      console.log("User " + authData + " is logged in with " + authData.provider);
                       $scope.image = authData.facebook.cachedUserProfile.picture.data.url;
                 $scope.name = authData.facebook.displayName;
    } else {
      console.log("User is logged outffffffffff");
    } 
    $scope.signer = function(){
      $scope.loginData = true;
        fbRef.authWithOAuthPopup("facebook", function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                $scope.loginData = true;
                //console.log("Authenticated successfully with payload:", authData);
                socket.emit('loggedinData', { data: authData });
                window.location.href = "https://projectunkown-vcabieles.c9.io";
                
              }
        });
     
    };
    $scope.logOut = function(){
        
        fbRef.unauth();
        fbRef.onAuth(authDataCallback);
        window.location.href = "https://projectunkown-vcabieles.c9.io";
        //alert('logOut');
    };



function authDataCallback(authData) { // Authenticating User so cahnge the login link
      if (authData) {
          
        $scope.loginData = true;
        
      } else {
        socket.emit('loggedinData', { data: authData });
        $scope.loginData = false;
      }
    }
} // signed function closing tag



// function asteroids($scope){
//     $scope.count = 1;
//     //$scope.Algo = [];
//   $scope.next = function(){
//     $scope.count++;
//     //alert($scope.count);
//       $scope.Algo = [];
//      socket.emit('PageCount', { data: $scope.count });
//   };
//   $scope.previous = function(){
//     $scope.count--;
//     //alert($scope.count);
//      socket.emit('PageCount', { data: $scope.count });
//   };
//   $scope.hello = [];
//   $scope.Algo = [];
//   socket.on('asteroids',function(data){ // second socket incase we need to transfer data both ways.
//       //console.log(data.data[0] + "love me some mongos ;)"); // we can return more data to server trough this second socket
//       //JSON.parse(data);  
//       $scope.hello.push(data);
//       $scope.$apply();
//       var loopCount = 0;
//       for (var i = 0; i <= 8 ; i++) { 
//          loopCount++;
//             var AU = 149597870.700;
//             var cats = data.data[i].d;
//             var scale = 125000;
//             var ActualMath = Math.floor(AU*cats/scale);
//             $scope.Algo.push(ActualMath);
//             $scope.$apply();
//          console.log($scope.Algo, "hello scope Algo");
//          //console.log(data.data[i],"Foor Loop for algo");
//         if(loopCount==8){break;}
//       }
//       //console.log($scope.Algo);
//       $scope.hello = [];
//       //console.log(JSON.parse(data));
//     });
// }



function profile($scope) {
   
   var authData = fbRef.getAuth();
    if (authData) {
      //console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    } 
    
    $scope.auth = authData;
    $scope.image = authData.facebook.cachedUserProfile.picture.data.url;
    $scope.name = authData.facebook.displayName;

} // profile function closing tag

function editorNav($scope){
  

  
  $scope.logOut = function(){
        
        fbRef.unauth();
        window.location.href = "https://projectunkown-vcabieles.c9.io";
        //alert('logOut');
    };
    
  
  
}


socket.emit('namedSocket', { data: 'vic hello' });

socket.on('news',function(man){ // second socket incase we need to transfer data both ways.
       
        
       //console.log(man + "this is in the news socket on clause"); // we can return more data to server trough this second socket
        
    
});




(function($){
    
    $(window).load(function() {
	$(".loader").fadeOut("slow");
})
    
  //alert("document ready");
  var count=1;

  $(window).scroll(function() {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
             // ajax call get data from server and append to the div
            $(".loader").show();
           count++;
          //console.log(count);
          $.get('/load'+count, function (data) {

           // Get your data
           //console.log(data);
            // Moved and renamed the row.html to: /public/templates/row.ejs
            var html = new EJS({url: 'parallax.ejs'}).render(data);
            
            // Append the rendered HTML
            $('#divResults').append(html);
             });
             
             $(window).ready(function() {
	            $(".loader").fadeOut("slow");
            })
    
             
      }
    
  });
})(jQuery);

