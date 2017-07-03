/*jslint node:true nomen:true*/
"use strict";

/**
 * Hauptmodul für die serverseitige Logik des vertikalen
 * Prototyps im Rahmen der EIS-Veranstaltung im Sommersemester 2017
 * @module main/server
 * @requires express
 * @requires express-session
 * @requires body-parser
 * @requires uid2
 * @requires util/dbam
 * @requires routing/LoginController
 * @requires routing/ProfilesController
 * @requires routing/DashboardController
 * @requires routing/MessagesController
 * @requires routing/ProjectsController
 * @requires routing/ProjectUpdatesController
 * @requires routing/SponsoringController
 * @requires routing/CommentsController
 * @requires routing/UpvotesController
 *           
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
    secret: "eisss2017vilents",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        secure: false,
        maxAge: 600000
    }
}));


/**
 * @function
 * @name Main::checkSession
 * @desc Überprüft bei jedem HTTP Request den Status der Session.
 * @param {function(req, res, next)} middleware - Callbackfunktion mit Request-, Response- und next-Objekt
 */
app.use(function (req, res, next) {
    if (req.session && req.session.user) {
        var email = req.session.user.email;
        dbam.findUserByEmail(email, function (error, results) {
            if (error) {
                res.statusCode(500).end();
            }
            if (results) {
                var userSessionData = {
                    id: results[0].id,
                    email: results[0].email,
                    type: results[0].type
                };
                req.user = userSessionData;
                req.session.user = userSessionData;
                req.locals = {
                    user: userSessionData
                };
            }
            next();
        });
    } else {
        next();
    }
});


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


app.use(loginController);
app.use(dashboardController);
app.use('/profiles', profilesController);
app.use('/messages', messagesController);
app.use('/projects', projectsController);
app.use('/projectupdates', projectUpdatesController);
app.use('/sponsoring', sponsoringController);
app.use('/comment', commentsController);
app.use('/upvote', upvotesController);


/** @function
 * @name listenToDefaultPort
 * @desc "Startprozess", der dem Server das Emfpangen von HTTP-Anfragen ermöglicht
 */
app.listen(port, function () {
    console.log("[MAIN] Server listens on port %d", port);
});


module.exports = app;