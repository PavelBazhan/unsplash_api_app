var express = require('express');
var app = express();

app.use(express.static('dist'));


app.get(/.css/, function (req, res) {
  res.sendFile(__dirname + '/dist/styles/master.css');
});

app.get(/.js/, function (req, res) {
  res.sendFile(__dirname + '/dist/app.js');
});

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});


app.listen(1234, function () {
  console.log('Server started on port 1234!');
});
