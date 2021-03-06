//
// # SimpleServer
//
var http = require('http');     // this require is like the import version of python in javascript
var path = require('path');
var serveAngular = require('serve-angular');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var ejs = require('ejs').compile();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mod = require('./modules/modules.js'); 
var Firebase = require('firebase');
var FireRef = new Firebase('https://project-unkown.firebaseio.com/');

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
router.use(express.static(path.resolve(__dirname, '/')));
router.set('view engine', 'ejs');
router.use(express.cookieParser());
router.use(express.session({secret: '1234567890QWERTY'}));

var adminLogin = false;
var objectData = [];
var calMath = [];
var count = 1;


// main index page
router.get('/', function(req, res){
  
  var count = 1;
  var scene = new Array();
var diameters = new Array();
    mod.find(0, function(result){
      scene.push(result);
           
 // varias loops inside of a 30k loop that allows us to determine size distance and dimater to then later be put into the same object so we can later manuplate the references
    mod.compareDia(function(data){
      
      diameters.push(data);
      var footbalField = 0.09144;
      var footbalresult = 0;
      // for os 2 for loops that lets us walk trought the inputed data of the first database query
       for(var i=0; i<=7; i++){
        
         var mathStuff = scene[0][i].a;
		            var AU = 149597870.700;
		            var scale = 275000;
                var ActualMath = Math.floor(AU*mathStuff/scale);
                scene[0][i]["ScaleDistance"] = ActualMath;
        
              for (var j = 0; j < diameters[0].length; j++) {
                // second for loop that lets us put the newly calculated obejcts into the object array so we can later display
                if (Math.round(scene[0][i].H) == Math.round(diameters[0][j].H) ) {
                  //console.log(result[i].H, data[j].H, 'we got this bitch compared');
                   var division = diameters[0][i].sps;
    
                  scene[0][i]["sps"] = Math.round(diameters[0][i].sps);
                  scene[0][i]["bps"] = Math.round(diameters[0][i].bps);
              
                    footbalresult = Math.round( division / footbalField );
                  // error checking
                   scene[0][i]["howMany"] = footbalresult;
                  
           
                }else if (Math.round(scene[0][i].H) > 17) {
                     // error checking to see if distance and magnitude is grated than 17H if it is it should be 1
                    scene[0][i]["sps"] = 1;
                    scene[0][i]["bps"] = 2;
                    scene[0][i]["howMany"] = 11;
            
                    break;
                }
                
            } // second for loop closing tag

          }
          
          res.render('index',{data:scene[0], count:count});	

    }); 
  
});

  
});

// next page loader app same algorythm 
router.get('/load:countPage', function (req, res) {
  var countPage = req.param("countPage");
  
  
  var scene = new Array();
var diameters = new Array();
    mod.find(countPage, function(result){
      scene.push(result);
           

    mod.compareDia(function(data){
      
      diameters.push(data);
      var footbalField = 0.09144;
      var footbalresult = 0;
      
       for(var i=0; i<=7; i++){
        
         var mathStuff = scene[0][i].a;
		            var AU = 149597870.700;
		            var scale = 275000;
                var ActualMath = Math.floor(AU*mathStuff/scale);
                scene[0][i]["ScaleDistance"] = ActualMath;
        
              for (var j = 0; j < diameters[0].length; j++) {
              
                if (Math.round(scene[0][i].H) == Math.round(diameters[0][j].H) ) {
                  //console.log(result[i].H, data[j].H, 'we got this bitch compared');
                   var division = diameters[0][i].sps;
    
                  scene[0][i]["sps"] = Math.round(diameters[0][i].sps);
                  scene[0][i]["bps"] = Math.round(diameters[0][i].bps);
              
                    footbalresult = Math.round( division / footbalField );
                  
                   scene[0][i]["howMany"] = footbalresult;
                  
           
                }else if (Math.round(scene[0][i].H) > 17) {
                
                    scene[0][i]["sps"] = 1;
                    scene[0][i]["bps"] = 2;
                    scene[0][i]["howMany"] = 11;
            
                    break;
                }
                
            } // second for loop closing tag

          }
          
          res.send({data:scene[0]});

    }); 
  
});
  
});

router.get('/inedit', function(req, res){
  
  res.render('editarSignIn');

});
router.post('/editarForm', function(req, res){
    
  var username = req.body.username;
	var password = req.body.password;
 
    FireRef.authWithPassword({
      email    : username,
      password : password
    }, function(error, authData) {
      if (error) {
       
      } else {
        
         res.redirect("/editor");
      }
    });


  
});

router.get('/editor', function(req, res){
  
  var authData = FireRef.getAuth();
  
  if (authData) {
    res.render('editor.ejs');
  
  } else {

    res.redirect("/inedit");
  }

});


  var ctxdata;
  var loggedin;
io.on('connection', function (socket) {

    socket.on('loggedinData', function (data) {
            ctxdata = data.data;
            if (ctxdata) {
              loggedin = true;
            
            } else {
            
              loggedin = false;
            }
    });

});


router.get('/profile', function(req,res){
  
  if(loggedin){
    res.render('profile');
  }else{
    res.redirect('/');
  }
  
});

router.get('/newAdmin', function(req,res){
  
  var authData = FireRef.getAuth();
  
  if (authData) {
    res.render('newAdmin');
   
    
  } else {
   
    res.redirect("/inedit");
  }
});

router.post('/AddAmind', function(req, res){
    
  var username = req.body.username;
	var password = req.body.password;
 
   FireRef.createUser({
  email    : username,
  password : password
}, function(error, userData) {
  if (error) {

  } else {
    res.redirect('/');
  }
});
});
router.get('/Nasa', function(req, res) {
  
  mod.find(48, function(result){
  
        		res.json(result);
  
  });
});


// CRUD
router.get('/addAstro',function(req,res){
    // render Add Form
    res.render('addAstro');

});

router.get('/deleteAstro',function(req,res){
  
  // Check if Admin is logged In
  if(loggedin){
    res.render('deleteAstro');
  }else{
    res.redirect('/');
  }
  
});
// Grabs Asteriod info and renders updateForm
router.get('/info/:id', function(req, res){
  
	var id = req.param("id");
	// Finds specfic asteriod from Search
	mod.findOne(id ,function(result){
	    res.render('./updateAstro',{data: result});
  });
  
});

router.post('/processSearch',function(req, res){

	var name = req.body.name;
	// Finds asteriod or redirect if fails
 	mod.findOne(name ,function(result){
   	if(result == null){
   	    res.redirect('/');
   	}else{
   		res.render('./viewAstro',{data: result});  
   	}
	});

});
// Deltes name
router.get('/processDeleteAsteroid/:name', function(req, res){
  
  // Grabs Name form details page
	var name = req.params.name;
	console.log(name);
	
	// Deletes name
	mod.deleteName(name);

  res.redirect('/');


});
router.post('/processAdminSearch',function(req, res){

	var name = req.body.name;
  // Finds Asteriod from Admin Search 
 	mod.findOne(name ,function(result){
 	  // Check if input is correct
 	  if(result == null){
 	    res.redirect('/');
 	  }else{
	    res.render('./viewAdminAstro',{data: result});
 	  }
	});

});
router.post('/processUpdateForm', function(req, res){

	 var info = req.body.name;
  //Calls update function to update the Specific Asteriod
	mod.update(info);

    res.redirect('/');

});
router.post('/processAddAsteroid', function(req, res){

	var info = req.body.info;
  // Calls add function to add new Asteriod to Data Base
	mod.insert(info);
	
	res.redirect('/');

});
router.get('/api', function(req, res) {
    

          res.render('api');	
      


}); // router closing tag
router.get('/test', function(req, res) {
    
var scene = new Array();
var diameters = new Array();
    mod.find(0, function(result){
      scene.push(result);
           

    mod.compareDia(function(data){
      
      diameters.push(data);
      var footbalField = 0.09144;
      var footbalresult = 0;
      
       for(var i=0; i<=7; i++){
        
         var mathStuff = scene[0][i].a;
		            var AU = 149597870.700;
		            var scale = 275000;
                var ActualMath = Math.floor(AU*mathStuff/scale);
                scene[0][i]["ScaleDistance"] = ActualMath;
        
              for (var j = 0; j < diameters[0].length; j++) {
              
                if (Math.round(scene[0][i].H) == Math.round(diameters[0][j].H) ) {
                  //console.log(result[i].H, data[j].H, 'we got this bitch compared');
                   var division = diameters[0][i].sps;
    
                  scene[0][i]["sps"] = Math.round(diameters[0][i].sps);
                  scene[0][i]["bps"] = Math.round(diameters[0][i].bps);
              
                    footbalresult = Math.round( division / footbalField );
                  
                   scene[0][i]["howMany"] = footbalresult;
                
           
                }else if (Math.round(scene[0][i].H) > 17) {
                
                    scene[0][i]["sps"] = 1;
                    scene[0][i]["bps"] = 2;
                    scene[0][i]["howMany"] = 11;
            
                    break;
                }
                
            } // second for loop closing tag

          }
      res.send(scene[0]);
      
    }); 
  
});
    

}); // router closing tag

// this is creating the node server and is helping to keep the ports open for socker io.
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});