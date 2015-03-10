//runs express and assigns to a object variable.
var spawn   = require('child_process').spawn;
var express = require('express');
var app = express();

// // //sets the express view directory
// app.set('views', __dirname + '/views');
// //view engine is set
// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/invoke', function(req, res) {
  var command = spawn(__dirname + '/bot.sh', [ req.query.url || '' ]);
  console.log('command launched');
  var output  = 'finished';

  command.stdout.on('data', function(chunk) {
      // output.push(chunk);
  }); 

  command.on('close', function(code) {
    if (code === 0) {
      console.log(code);
      console.log('command closed');
      res.send(Buffer);  
    } else {
      res.send(500); // when the script fails, generate a Server Error HTTP response
    }
  });
});

app.get('/*', function(req, res) {
  res.render('index.html');
});

console.log('Shortly is listening on 4568');
app.listen(3000);