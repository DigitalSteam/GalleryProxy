const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(allowCrossDomain);
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));

app.get('/api/games/:1/more-games', (req, res) => {
  request.get('http://ec2-54-215-240-119.us-west-1.compute.amazonaws.com/api/games/:1/more-games', (err, response, body) => {
    console.log(body);
    res.send(body);
  });
});

app.get('/api/games/:gameId/review', (req, res) => {
  request.get('http://ec2-54-215-135-38.us-west-1.compute.amazonaws.com/api/games/:gameId/review', (err, response, body) => {
    console.log(body);
    res.send(body);
  });
});

app.get('/api/user/:userId', (req, res) => {
  request.get('http://ec2-54-215-135-38.us-west-1.compute.amazonaws.com/api/user/:userId', (err, response, body) => {
    console.log(body);
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`server running at port: ${port}`);
});