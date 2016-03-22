var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');
var url = require('url');


// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/dive';

// we will use this variable later to insert and retrieve a "collection" of data
var collection;

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);

    // do some work here with the database.
    collection = db.collection('dive');
    collection.remove(); // Remove anything that was there before
    collection.insert(dive, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "dive" collection. The documents inserted with "_id" are:', result.length, result);
      }

      // Dont Close the connection, so we can use it in other routes
      // db.close();
    })
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/dive', function(req, res) {
  console.log("In dives");
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  collection.find({name : query}).toArray(function(err, result) {
    if(err) {
      console.log(err);
    } else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
  });
});

router.post('/dives', function(req, res) {
    console.log("In dives Post");
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "dive" collection. The documents inserted with "_id" are:', result.length, result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
});


module.exports = router;

