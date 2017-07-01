/*jslint node:true nomen:true*/
"use strict";

/**
 * Hauptmodul für die serverseitige Logik des vertikalen
 * Prototyps im Rahmen der EIS-Veranstaltung im Sommersemester 2017
 * @module main/server
 * @requires express
 * @requires util/dbam
 * @requires routing/ProfilesController
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */

/** @todo für Produktivumgebung entfernen! */
console.log("[MAIN] Main module loaded.");

var express             = require('express');
var session             = require('express-session');
var bodyParser          = require('body-parser');

var dbam                = require('./util/dbam.js');

var loginController     = require('./routing/LoginController.js');
var profilesController  = require('./routing/ProfilesController.js');

var port                = process.env.PORT || 8000;
var app                 = express();

/** @todo für Produktivumgebung entfernen! */
console.log("[MAIN] Initializing database connection...");

dbam.initializeConnection();

app.use(bodyParser.json()); // for parsing application/json

// Set session cookie
app.use(session({
    cookieName: "session",
    secret: "eisss2017vilents",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

app.use(loginController);
app.use('/profiles', profilesController);

/** Session-Objekt */
var sess;

/**
 * @function
 * @name stackTraceHandling
 * @desc In der Produktiv-Umgebung soll bei Fehlern kein Stacktrace mitgeschickt werden
 * @param {object} err - Error-Objekt
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next
 */
app.use(function (err, req, res, next) {
    res.send({
        message: err.message,
        error: app.get('env') === "development" ? err : {}
    });
});

/** @function
 * @name listenToDefaultPort
 * @desc "Startprozess", der dem Server das Emfpangen von HTTP-Anfragen ermöglicht
 */
app.listen(port, function () {
    console.log("[MAIN] Server listens on port %d", port);
});


app.use(function(req, res, next) {
  if (req.session && req.session.user) {
      dbam.findUserByEmail(req.session.user.email, function(error, statusCode, results) {
          if (error && statusCode === 500) {
              res.statusCode(500).end();
          }
          if (results) {
              req.user = results;
              delete req.user.passwort;
              req.session.user = results;
              req.locals.user = results;
          }
          
          next();
      });
  } else {
      next();
  }
});

module.exports = app;