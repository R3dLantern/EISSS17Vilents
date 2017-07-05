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
console.log('[SPCO] SponsoringController loaded.');

/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
sponsoringController.use(function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403).end();
    }
});


function getRepInLoop(userObj, i, res) {
    reputation.getTotalReputationForUser(
        userObj[i].id,
        function (error, totalRep) {
            if (error) {
                res.status(500).end();
                return;
            }
            userObj[i].rep = totalRep;
            console.log(userObj[i]);
        }
    );
}

/**
 * @function
 * @name SponsoringController::index
 * @desc Holt Daten für die Übersicht über Sponsor-suchende
 * @param {string} path - Route
 * @param {function (req, res)} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
sponsoringController.get('/index', function (req, res) {
    console.log('[SPCO] GET /index');
    dbam.getSponsoringApplicants(function (error, resultObj) {
        if (error) {
            res.status(500).end();
            return;
        }
        if (resultObj.length > 0) {
            var i = 0,
                len = resultObj.length;
            for (i, len; i < len; i += 1) {
                this.getRepInLopp(resultObj, i, res);
            }
        } else {
            resultObj = {};
        }
        res.status(200).json(resultObj);
    });
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