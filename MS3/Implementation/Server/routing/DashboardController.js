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
var reputation          = require("../util/reputation.js");

var dashboardController = express.Router();

console.log("[DBCO] DashboardController loaded.");

/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
function requireLogin(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).end();
    }
}


/**
 * @function
 * @name DashboardController::show
 * @desc Rendert das Dashboard für einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
dashboardController.get('/dashboard', /*requireLogin,*/ function (req, res) {
    /** @todo für Produktivumgebung entfernen! */
    console.log("[LGCO] Request auf /dashboard!");
    
    /** @todo ZU TESTZWECKEN; SPÄTER DRINGEND ERSETZEN! */
    var email = "max.mustermann@email.de";
    dbam.findUserByEmail(email, function (error, results) {
        if (error) {
            res.status(500).end();
        }
        if (results) {
            var data = {
                email: results[0].email,
                name: results[0].nachname,
                vorname: results[0].vorname
            };
            res.status(200).end(JSON.stringify(data));
        } else {
            console.log("[DBCO] 404");
            res.status(404).end();
        }
    });
});
    
module.exports = dashboardController;