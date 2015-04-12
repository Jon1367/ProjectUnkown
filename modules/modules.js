var mongoose = require('mongoose');

mongoose.connect('mongodb://52.10.66.214/nasa');

var kittySchema = mongoose.Schema({
    name: String
})

var Kitten = mongoose.model('Cats', kittySchema)  

exports.find = function(callback){ 

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens)
        callback(kittens)
    })

};
exports.insert = function(username){ 
  

	var cat = new Kitten({ name: username});

	cat.save(function (err) {
	  if (err) // ...
	  console.log('meow');
	});
    
};
exports.delete = function(){ 


    
    
    
};
exports.update = function(callback){ 
    
};