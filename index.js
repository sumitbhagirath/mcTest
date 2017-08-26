var http = require('http');
var express = require('express');
var app = express();
mongoose = require('mongoose');

app.use(require('express-domain-middleware'));
// error handler
app.use(function(err, req, res, next) {
	console.error('An error occurred :', err.message);
	res.send(500);
});
var index = require('./routes/index');
app.use('/',index);

module.exports = app;
var server = http.createServer(app);
server.listen(7019);

// With Username and Password url as
//'mongodb://ted:ted@ds061797.mongolab.com:61797/theenlighteneddeveloper'

// Without Username and Password Url as
var MONGO_DB_URI = 'mongodb://localhost:27017/mcTest'

mongoose.connect(MONGO_DB_URI, function(err, db) {
	if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
    	
        console.log('MongoDB Connected at', MONGO_DB_URI);
    }  
})