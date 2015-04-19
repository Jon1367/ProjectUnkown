var mongoose = require('mongoose');

var options = {
  user: 'min',
  pass: 'password'
}
// connect to database
mongoose.connect('mongodb://52.0.138.61/admin',options);

var nasaSchema = mongoose.Schema({
  _id:  String,
  des: Number,
  H: Number,
  G:   Number,
  Epoch:   String,
  M:  Number,
  Peri:Number,
  Node:Number,
  Incl:Number,
  e:   Number,
  n:   Number,
  a:   Number,
  UP: String,
  Ref: String,
  Obs:  Number,
  Opp: Number,
  Arc: String,
  rms: Number,
  Pert1: String,
  Pert2:String,
  Comp: String,
  Type: Number,
  Name:  String,
  LastObs: Number,
  sps: Number,
  bps: Number,
  imageref1: String,
  imageref2: String,
  imageref3: String,
  imageref4: String,
  howMany: Number,
   ScaleDistance: Number
});

var diameterSchema = mongoose.Schema({

  _id:  String,
  H: Number,
  sps: Number,
  bps:   Number,
  imageref1: String,
  imageref2: String,
  imageref3: String,
  imageref4: String,
   howMany: Number,
   ScaleDistance: Number

});


var diameters = mongoose.model('diameters', diameterSchema);

var nasaModel = mongoose.model('asteroids', nasaSchema);  


exports.find = function(count, callback){ 

    // console.log(data);
    
    //var count = data;
    
 	console.log(count, 'this is the page count here');
    
	nasaModel.find(function (err, kittens) {
		if (err) return console.error(err);
	  	callback(kittens);
	}).sort({a:1}).skip(count > 0 ? ((count-1)*8) : 0).limit(8);

};
exports.findAll = function(callback){ 

    
	nasaModel.find(function (err, kittens) {
		if (err) return console.error(err);
	  	callback(kittens);
	});

};

exports.insert = function(array){ 
    
	console.log(array);
 
	var des = parseInt(array[0]);
	var H = parseInt(array[1]);
	var G = parseInt(array[2]);
	var Epoch = String(array[3]);
	var M = parseInt(array[4]);
	var Peri = parseInt(array[5]);
	var Node = parseInt(array[6]);
	var Incl = parseInt(array[7]);
	var e = parseInt(array[8]);
	var n = parseInt(array[9]);
	var a = parseInt(array[10]);
	var UP = String(array[11]);
	var Ref = String(array[12]);
	var Obs = parseInt(array[13]);
	var Opp = parseInt(array[14]);
	var Arc = String(array[15]);
	var rms = parseInt(array[16]);
	var Pert1 = String(array[17]);
	var Pert2 = String(array[18]);
	var Comp = String(array[19]);
	var Type = parseInt(array[20]);
	var name = String(array[21]);
	var LastObs = String(array[22]);

	var asteroid = new nasaModel({

	_id:"",
	des: des,
  	H: H,
  	G: G,
  	Epoch: Epoch,
  	M: M,
  	Peri:Peri,
  	Node:Node,
  	Incl:Incl,
  	e:e,
  	n:n,
  	a: a,
  	UP:UP,
  	Ref: Ref,
  	Obs: Obs,
  	Opp: Opp,
  	Arc:Arc ,
  	rms: rms,
  	Pert1: Pert1,
  	Pert2: Pert2,
  	Comp:Comp,
  	Type:Type,
  	Name: name,
  	LastObs: LastObs
	});

	asteroid.save(function (err,result) {
		if (err) return console.error(err);
	  	console.log(result);
	});
	
};


exports.findOne = function(name, callback){
	
	nasaModel.findOne({Name:name},function (err, myDocument) {
        if (err) return console.error(err);
        console.log("findOne");
        console.log(myDocument);

        callback(myDocument);
    });
};
exports.update = function(array){ 

	console.log("Hello Model");
	console.log(array);


	var des = parseInt(array[0]);
	var H = parseInt(array[1]);
	var G = parseInt(array[2]);
	var Epoch = String(array[3]);
	var M = parseInt(array[4]);
	var Peri = parseInt(array[5]);
	var Node = parseInt(array[6]);
	var Incl = parseInt(array[7]);
	var e = parseInt(array[8]);
	var n = parseInt(array[9]);
	var a = parseInt(array[10]);
	var UP = String(array[11]);
	var Ref = String(array[12]);
	var Obs = parseInt(array[13]);
	var Opp = parseInt(array[14]);
	var Arc = String(array[15]);
	var rms = parseInt(array[16]);
	var Pert1 = String(array[17]);
	var Pert2 = String(array[18]);
	var Comp = String(array[19]);
	var Type = parseInt(array[20]);
	var name = String(array[21]);
	var LastObs = String(array[22]);



	// console.log(typeof(id));

	nasaModel.update(
		{
  	des: des,
  	H: H,
  	G: G,
  	Epoch: Epoch,
  	M: M,
  	Peri:Peri,
  	Node:Node,
  	Incl:Incl,
  	e:e,
  	n:n,
  	a: a,
  	UP:UP,
  	Ref: Ref,
  	Obs: Obs,
  	Opp: Opp,
  	Arc:Arc ,
  	rms: rms,
  	Pert1: Pert1,
  	Pert2: Pert2,
  	Comp:Comp,
  	Type:Type,
  	Name: name,
  	LastObs: LastObs},
		function (err, kittens) {
			if (err) return console.error(err);
	  		console.log(kittens);
		});

};
 
 
exports.testChris = function(testC, callback){
	   
	   diameters.find({H:testC},function (err, myData) {
        if (err) return console.error(err);

        callback(myData);
    });
};
 
exports.compareDia = function(callback){ 

	diameters.find(function (err, kittens) {
		if (err) return console.error(err);
	  	callback(kittens);
	});

};