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
var logger      = require('morgan');
var reputation  = require('./reputation');

var count       = 0;
var clients     = {};

var port        = process.env.PORT || 8000;
var app         = express();

app.use(logger('dev'));

/*
* GET Gesamtreputation für Benutzer
* @param :username Benutzername
*/
app.get('/users/:username', function (req, res) {
    var username = req.params.username;
    // FÜR TESTZWECKE: Es können nur die Gesamtreputationen von "superBuilder" und "caseModMan" angezeigt werden, alle anderen Usernamen sollen 404 zurückgeben.
    if (username !== "superBuilder" && username !== "caseModMan") {
        res.send(404);
    }
    res.send(reputation.getTotalReputation(username).toString());
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

app.listen(port, function () {
    console.log('Listening on port %d', port);
});

module.exports = app;