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
        res.status(403).end();
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
dashboardController.get('/dashboard', requireLogin, function (req, res) {
    /** @todo für Produktivumgebung entfernen! */
    console.log("[DBCO] Request auf /dashboard!");
    reputation.getTotalReputationForUser(req.user.id, function (error, totalRep) {
        if (error) {
            
            console.log("[DBCO] GetTotalRep failed");
            res.status(500).end();
            throw error;
        }
        res.status(200).end(JSON.stringify({value: totalRep}));
    });
});
    
module.exports = dashboardController;