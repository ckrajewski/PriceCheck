var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const NodeGeocoder = require('node-geocoder'); 
const serverToken = '3EnWxnUelyFMUaIzvw2QILYXff4N0lc5-a9LclBE';
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '/dist')));
app.use("/public/images", express.static(__dirname + "/src/public/images"));
app.use("/public/documents", express.static(__dirname + "/src/public/documents"));

app.get('/downloadResume/PDF', function(request, response) { 
  var file = path.join(__dirname, '/src/public/documents/ChristopherKrajewskiResume.pdf');
  response.download(file);
});

app.get('/downloadResume/Word', function(request, response) { 
  var file = path.join(__dirname, '/src/public/documents/ChristopherKrajewskiResume.docx');
  response.download(file);
});

app.get('/test', (req, res) => {
  console.log(serverToken);
  const options = {
  	headers : {
  		'Authorization': `Token ${serverToken}`,
  		'Accept-Language': 'en_US',
  		'Content-Type': 'application/json'
  	}
  };
  axios.get('https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075',options)
  .then(response => {
  	console.log(response.data);
  	res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/geoCode', (req, res) => {
	const options ={
		provider: 'google'
	};
	const geocoder = NodeGeocoder(options);
	nodeGeocoder.fromAddress("Eiffel Tower",fetch).then(
		response => {
    const { lat, lng } = response.results[0].geometry.location;
    const coordinates = {lat:lat,lon:lng};
    console.log(coordinates);
    res.send(coordinates);
  },
  error => {
    console.error(error);
  }
);
});

app.get('/', function(request, response) {
  console.log("starting here");
  response.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});