var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('nodewebapp:server');
var http = require('http');

var WebSocket = require('ws').Server;

var app = express();
const server = http.createServer(app);
const s = new WebSocket({ server });

s.on('connection',function(ws){
	
	ws.on('message',function(message){
		
		message = JSON.parse(message);
		
	ws.send(JSON.stringify({
					data : message
				}));
	
		
	});
	
	ws.on('error', () => console.log('errored'));
	
	ws.on('close',function(){
			console.log("Tab closed");
	
	});
	
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next) {

res.sendFile(__dirname + "/index.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});

module.exports = app;
