/*jslint node:true nomen:true*/
"use strict";

/**
 * Router-Middleware für Benutzerkonten-Handling, Login und Session-Handling
 * @module routing/ProfilesController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require("express");

var dbam                = require("../util/dbam.js");

var loginController     = express.Router();

/** @todo für Produktivumgebung entfernen! */
console.log("[LGCO] LoginController loaded.");

/**
 * @function
 * @name LoginController::signUp
 * @desc Registriert einen Benutzer
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
loginController.post('/signup', function (req, res) {
    console.log("[LGCO] Request auf /signup!");
    var result = dbam.trySignup(req.body);
    console.log(result);
    res.end("{\"code\":" + result + "}");
});


/**
 * @function
 * @name LoginController::login
 * @desc Loggt einen Benutzer ein
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
loginController.post('/login', function (req, res) {
    /** @todo für Produktivumgebung entfernen! */
    console.log("[LGCO] Request auf /login!");
    console.log(req.body);
    res.end("{\"code\":0}");
});


/**
 * @function
 * @name LoginController::logout
 * @desc Loggt einen Benutzer aus
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
loginController.get('/logout', function (req, res) {
    
});

module.exports = loginController;