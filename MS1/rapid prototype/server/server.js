
"use strict";
var express     = require('express');
var http        = require('http');
var path        = require('path');
var favicon     = require('static-favicon');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var reputation  = require('./reputation');

var count       = 0;
var clients     = {};

var port        = process.env.PORT || 8000;
var app         = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express['static'](path.join(__dirname, 'public')));

/*
* GET Gesamtreputation für Benutzer
* @param :username Benutzername
*/
app.get('/users/:username', function (req, res) {
    var username = req.params.username;
    res.send(reputation.getTotalReputation(username).toString());
});

var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;