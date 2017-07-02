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

var loginController             = require('./routing/LoginController.js');
var profilesController          = require('./routing/ProfilesController.js');
var dashboardController         = require('./routing/DashboardController.js');
var messagesController          = require('./routing/MessagesController.js');
var projectsController          = require('./routing/ProjectsController.js');
var projectUpdatesController    = require('./routing/ProjectUpdatesController.js');
var sponsoringController        = require('./routing/SponsoringController.js');
var commentsController          = require('./routing/CommentsController.js');
var upvotesController           = require('./routing/UpvotesController.js');

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
    secure: true,
    ephemeral: true
}));

app.use(loginController);
app.use(dashboardController);
app.use('/profiles', profilesController);
app.use('/messages', messagesController);
app.use('/projects', projectsController);
app.use('/projectupdates', projectUpdatesController);
app.use('/sponsoring', sponsoringController);
app.use('/comment', commentsController);
app.use('/upvote', upvotesController);

/** Session-Objekt */
var sess;

app.getSess = function () {
    return sess;
};

app.setSess = function (newSess) {
    sess = newSess;
};

/**
 * @function
 * @name stackTraceHandling
 * @desc In der Produktiv-Umgebung soll bei Fehlern kein Stacktrace mitgeschickt werden
 * @param {function(err, req, res, next)} middleware - Callbackfunktion mit Fehler-, Request-, Response- und next-Objekt
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


/*app.use(function (req, res, next) {
    console.log("[MAIN] Checking Session");
    if (sess && sess.user) {
        dbam.findUserByEmail(sess.user.email, function (error, statusCode, results) {
            if (error) {
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
});*/

module.exports = app;