/*jslint node:true nomen:true*/
"use strict";

/**
 * Router-Middleware für Login, Logout und Registrierung
 * @module routing/LoginController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require("express");

var main                = require("../server.js");
var dbam                = require("../util/dbam.js");

var loginController     = express.Router();

/**
 * @function
 * @name LoginController::signUp
 * @desc Registriert einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 */
loginController.post('/signup', function (req, res) {
    dbam.trySignup(req.body, function (err) {
        if (err) {
            console.log(err.stack);
            res.status(500).end();
        }
        res.status(200).end();
    });
});


/**
 * @function
 * @name LoginController::handleFileUpload
 * @desc Registriert einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
loginController.post('/signup/upload', function (req, res) {
    
});


/**
 * @function
 * @name LoginController::login
 * @desc Loggt einen Benutzer ein
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
loginController.post('/login', function (req, res) {
    dbam.findUserByEmail(req.body.email, function (error, results) {
        if (error) {
            res.status(500).end();
        }
        if (results) {
            if (results[0].passwort === req.body.password) {
                req.session.user = {
                    id: results[0].id,
                    email: results[0].email,
                    type: results[0].type
                };
                res.status(200).end(JSON.stringify({ type: results[0].type }));
            } else {
                res.status(401).end();
            }
        } else {
            res.status(404).end();
        }
    });
});


/**
 * @function
 * @name LoginController::logout
 * @desc Loggt einen Benutzer aus
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 */
loginController.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            
        }
        res.status(200).end();
    });
});

module.exports = loginController;