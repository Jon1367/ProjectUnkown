//
// # SimpleServer
//
var http = require('http');     // this require is like the import version of python in javascript
var path = require('path');
var serveAngular = require('serve-angular');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mod = require('./modules/modules.js'); 
var Firebase = require('firebase');
var FireRef = new Firebase('https://project-unkown.firebaseio.com/');




// Connect to mongo
// mongoose.connect('mongodb://52.10.66.214/nasa');

// 	//modal for database
// 	var Cat = mongoose.model('Cat', { name: String });

// 	// insert into data base 
// 	var kitty = new Cat({ name: 'vic' });
// 	kitty.save(function (err) {
// 	  if (err) // ...
// 	  console.log('meow');
// 	});

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

//App use
router.use(bodyParser.urlencoded({extended: false}));

router.use(express.static(path.resolve(__dirname, 'client')));
router.set('view engine', 'ejs');
// router.use(serveAngular({
//   layout: __dirname + '/client/index.html'

// }));
	mod.find(function(result){
		console.log('Routes');
		console.log(result);
	});

router.get('/', function(req, res){
  
io.on('connection', function (socket) {

     socket.on('namedSocket', function (data) {

            socket.emit('news', { data: 'hey this is the emit in news' });
            
            console.log(data.data + " Hello am in the Namedd xczgasdfa fasdfa  Socket");
        });
 
  
});
   
   
   res.render('index');
   
  
});





router.get('/test', function(req, res){
  
  res.render('index');

  
});

router.get('/inedit', function(req, res){
  
  res.render('editarSignIn');

});
router.post('/editarForm', function(req, res){
    
  var username = req.body.username;
	var password = req.body.password;
  
  console.log(req.body.username);
  console.log(req.body.password);
    
    FireRef.authWithPassword({
      email    : username,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
         res.redirect("/editor");
      }
    });


  
});

router.get('/editor', function(req, res){
  
  var authData = FireRef.getAuth();
  
  if (authData) {
    res.render('editor.ejs');
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    
  } else {
    console.log("User is logged out");
    res.redirect("/inedit");
  }

});




// this is creating the node server and is helping to keep the ports open for socker io.
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});