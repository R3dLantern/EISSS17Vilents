/*jslint node:true nomen:true es5:true*/
"use strict";

/**
 * Router-Middleware für Sponsoring-Teams
 * @module routing/SponsoringController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require('express');

var dbam                = require('../util/dbam.js');
var reputation          = require('../util/reputation.js');

var sponsoringController  = express.Router();

/** @todo für Produktivumgebung entfernen! */
console.log("[SPCO] SponsoringController loaded.");


/**
 * @function
 * @name SponsoringController::index
 * @desc Holt Daten für die Übersicht über Sponsor-suchende
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
sponsoringController.get('/index', /*requireLogin,*/ function (req, res) {
    
});


/**
 * @function
 * @name SponsoringController::create
 * @desc Legt ein neues Casemodder-Team für einen Sponsor an
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
sponsoringController.post('/new', /*requireLogin,*/ function (req, res) {
    
});


/** Router-Handling für Casemodder-Teams
 * @param {string} path - Route
 */
sponsoringController.route('/:id')
    /** @function
     * @name SponsoringController::show
     * @desc Holt Daten zu einem Casemodder-Team
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .get(function (req, res) {
    
    })
    /** @function
     * @name SponsoringController::update
     * @desc Aktualisiert einen Datensatz zu einem Casemodder-Team
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .put(function (req, res) {
    
    })
    /** @function
     * @name SponsoringController::delete
     * @desc Löscht ein Casemodder-Team
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });

module.exports = sponsoringController;