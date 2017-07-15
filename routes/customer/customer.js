var express = require('express');
var app = express();
var fs = require('fs');
var user = require('./user.js')
// ******************** FOR API CALLS FROM WEB/MOBILE ***********************

//Router that will get order list for viewing.
app.post('/api/v1.0/login', function(req, res){
	user.login(req, function(err, regres){
		res.statusCode =  regres.http_code;
		res.json(regres);
	});
});

app.post('/api/v1.0/register', function(req, res){
	user.register(req, function(err, regres){
		res.statusCode =  regres.http_code;
		res.json(regres);
	});
});

app.post('/api/v1.0/addCourse', function(req, res){
	user.addCourse(req, function(err, regres){
		res.statusCode =  regres.http_code;
		res.json(regres);
	});
});

app.post('/api/v1.0/deleteCourse', function(req, res){
	user.deleteCourse(req, function(err, regres){
		res.statusCode =  regres.http_code;
		res.json(regres);
	});
});

app.post('/api/v1.0/fetchCourses', function(req, res){
	user.fetchCourses(req, function(err, regres){
		res.statusCode =  regres.http_code;
		res.json(regres);
	});
});

app.post('/api/v1.0/logout', function(req, res){
	user.logout(req, function(err, regres){
		res.statusCode =  regres.http_code;
		res.json(regres);
	});
});


module.exports = app;
