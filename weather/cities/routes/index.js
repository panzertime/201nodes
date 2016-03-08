var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('cities.html', { root: 'public' });
});


/* GET test1 page. */
router.get('/test1.html', function(req, res, next) {
  res.sendFile('test1.html', { root: 'public' });
});

/* GET test2 page. */
router.get('/test2.txt',function(req, res, next) {
  res.sendFile('test2.txt', { root: 'public' });
});

/* GET test3 page */
router.get('/test3.gif', function(req, res, next) {
  res.sendFile('test3.gif', { root: 'public' });
});

/* GET test4 page. */
router.get('/test4.jpg', function(req, res, next) {
  res.sendFile('test4.jpg', { root: 'public' });
});

var data = [
	{
		color: "red",
		value: "#f00"
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	},
	{
		color: "cyan",
		value: "#0ff"
	},
	{
		color: "magenta",
		value: "#f0f"
	},
	{
		color: "yellow",
		value: "#ff0"
	},
	{
		color: "black",
		value: "#000"
	}
];

/* router for getcity service */
router.get('/getcity',function(req,res,next) {
	console.log("In getcity route");

	var myRe = new RegExp("^" + req.query.q);
//	console.log(myRe);

//	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
		if(err) throw err;
//		var cities = data.toString().split("\n");
	        var jsonresult = [];
	        for(var i = 0; i < data.length; i++) {
			var result = data[i].color.search(myRe); 
          		if(result != -1) {
//           			console.log(cities[i]);
           			jsonresult.push(data[i]);
         		}		 
       		}   
//        	console.log(jsonresult);
		res.status(200).json(jsonresult);
	})
});


module.exports = router;
