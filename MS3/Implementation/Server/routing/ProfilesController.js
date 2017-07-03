/*jslint node:true nomen:true*/
"use strict";

/**
 * Router-Middleware für die Abfrage von Benutzerprofil-Daten
 * @module routing/ProfilesController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require('express');

var dbam                = require('../util/dbam.js');
var reputation          = require('../util/reputation.js');

var profilesController  = express.Router();

/** @todo für Produktivumgebung entfernen! */
console.log("[PFCO] ProfilesController loaded.");


/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
profilesController.use(function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403).end();
    }
});

/** Router-Handling für Benutzerprofile 
 * @param {string} path - Route
 */
profilesController.route('/:type/:id')
    /** @function
     * @name ProfileController::getProfileData
     * @desc Holt Daten zu einem öffentlichen Benutzerprofil
     * @param {function(requireLogin, req, res)} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .get(function (req, res) {
        var id = req.params.id,
            type = req.params.type;
        dbam.getProfileData(id, type, function (error, dbRes) {
            if (error) {
                res.status(500).end();
                throw error;
            }
            if (dbRes) {
                dbRes.userOwnsProfile = (id === req.user.id.toString()) ? true : false;
                if (type === "sponsor") {
                    res.status(200).end(JSON.stringify(dbRes));
                } else {
                    reputation.getTotalReputationForUser(id, function (repError, totalRep) {
                        if (repError) {
                            res.status(500).end();
                            throw repError;
                        }
                        if (totalRep) {
                            dbRes.totalRep = totalRep;
                        } else {
                            dbRes.totalRep = 0;
                        }
                        res.status(200).end(JSON.stringify(dbRes));
                    });
                }
            } else {
                res.status(404).end();
            }
        });
    })
    /** @function
     * @name ProfileController::updateProfileData
     * @desc Aktualisiert einen Datensatz zu einem öffentlichen Benutzerprofil
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .put(function (req, res) {

    });

module.exports = profilesController;