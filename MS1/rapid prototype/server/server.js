/*jslint node:true nomen:true*/
"use strict";

/**
 * server.js
 * Backend-Hauptmodul des Rapid Prototype im Rahmen von EIS SS2017
 * Demonstriert die Kommunikation mit dem Client sowie das Alleinstellungsmerkmal
 * "Berechnung gewichtete Gesamtreputation"
 * @author Leonid Vilents
 */

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
    if (username !== "superBuilder" && username !== "caseModMan") {
        res.send(404);
    }
    res.send(reputation.getTotalReputation(username).toString());
});


app.listen(port, function () {
    console.log('Listening on port %d', port);
});

/**
 * In der Entwicklungsumgebung wird ein Stacktrace ausgegeben.
 */
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Kein Stacktrace-Leak in Produktivumgebung
 */
app.use(function (err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;