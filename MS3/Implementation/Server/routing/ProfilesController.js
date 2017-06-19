/*jslint node:true nomen:true*/
"use strict";

/**
 * Router-Middleware für die Abfrage von Benutzerprofil-Daten
 * @module routing/ProfilesController
 * @requires express
 * @requires util/dbam
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require('express');
var dbam                = require('../util/dbam.js');
var profilesController  = express.Router();

/** Router-Handling für Benutzerprofile */
profilesController.route('/:id')
    /** @function
     * @name getProfileData
     * @desc Holt Daten zu einem öffentlichen Benutzerprofil
     * @param {object} req - HTTP Request-Objekt
     * @param {object} res - HTTP Response-Objekt
     */
    .get(function (req, res) {
    
    })
    /** @function
     * @name updateProfileData
     * @desc Aktualisiert einen Datensatz zu einem öffentlichen Benutzerprofil
     * @param {object} req - HTTP Request-Objekt
     * @param {object} res - HTTP Response-Objekt
     */
    .put(function (req, res) {
    
    });

module.exports = profilesController;