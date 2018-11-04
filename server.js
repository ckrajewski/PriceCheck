var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const NodeGeocoder = require('node-geocoder');
const serverCredentials = require('./serverCredentials');
const serverToken = serverCredentials.uberToken;
const lyftAuth = serverCredentials.lyftAuth;
let lyftToken = null;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '/dist')));

const getLfytToken = () => {
    debugger;
    const headers = {
        'Authorization': `Basic ${lyftAuth}`,
        'Content-Type': 'application/json'
    };
    const data = {
        'grant_type': 'client_credentials',
        'scope': 'public'

    };

    axios.post('https://api.lyft.com/oauth/token', data, { headers: headers })
        .then(response => {
            console.log(response.data);
            lyftToken = response.data.access_token;
        })
        .catch(error => {
            console.log(error);
        });
};
exports.getLfytToken = getLfytToken;

if (!lyftToken) {
    this.getLfytToken();
}

app.post('/fetchUberData', (req, res) => {
    console.log(serverToken);
    const options = {
        headers: {
            'Authorization': `Token ${serverToken}`,
            'Accept-Language': 'en_US',
            'Content-Type': 'application/json'
        }
    };
    const userLocation = req.body.userCoordinates;
    const toLocation = req.body.toCoordinates;
    axios.get(`https://api.uber.com/v1.2/estimates/price?start_latitude=${userLocation.lat}&start_longitude=${userLocation.lng}&end_latitude=${toLocation.lat}&end_longitude=${toLocation.lng}`, options)
        .then(response => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});


app.post('/fetchLyftData', (req, res) => {
    debugger;
    const options = {
        headers: {
            'Authorization': `Bearer ${lyftToken}`,
            'Content-Type': 'application/json'
        }
    };
    const userLocation = req.body.userCoordinates;
    const toLocation = req.body.toCoordinates;
    axios.get(`https://api.lyft.com/v1/cost?start_lat=${userLocation.lat}&start_lng=${userLocation.lng}&end_lat=${toLocation.lat}&end_lng=${toLocation.lng}`, options)
        .then(response => {
            debugger;
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/geoCode', (req, res) => {
    const options = {
        provider: 'google'
    };
    const geocoder = NodeGeocoder(options);
    nodeGeocoder.fromAddress("Eiffel Tower", fetch).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            const coordinates = { lat: lat, lon: lng };
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