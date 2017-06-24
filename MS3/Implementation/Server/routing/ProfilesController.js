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
console.log("[PRCO] ProfilesController loaded.");

/** Router-Handling für Benutzerprofile */
profilesController.route('/:id')
    /** @function
     * @name getProfileData
     * @desc Holt Daten zu einem öffentlichen Benutzerprofil
     * @param {object} req - HTTP Request-Objekt
     * @param {object} res - HTTP Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .get(function (req, res) {
    
    })
    /** @function
     * @name updateProfileData
     * @desc Aktualisiert einen Datensatz zu einem öffentlichen Benutzerprofil
     * @param {object} req - HTTP Request-Objekt
     * @param {object} res - HTTP Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .put(function (req, res) {
    
    });

module.exports = profilesController;