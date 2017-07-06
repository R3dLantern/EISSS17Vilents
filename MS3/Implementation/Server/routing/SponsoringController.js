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


/**
 * Callback-Funktion mit optionaler Fehlerübergabe; bestätigt den Durchlauf der Schleife
 * 
 * @callback loopCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 */

/**
 * Schleife zum Erhalt mehrerer Gesamtreputationen für Benutzer
 * @param {object} userObj - Array von Benutzer-Objekten
 * @param {loopCallback} - callback Callbackfunktion bei Abschluss der Schleife, oder bei Fehlermeldung.
 * {@link https://stackoverflow.com/questions/21184340/async-for-loop-in-node-js Quelle in akzeptierter Antwort}
 */
function getRepInLoop(userArray, callback) {
    var keys = Object.keys(userArray),
        onComplete = function () {
            callback(null);
        },
        loop = keys.length;
    if (loop === 0) {
        onComplete();
    } else {
        keys.forEach(function (key) {
            dbam.countUserProjects(userArray[key].id, function (error, projectsResultObject) {
                if (error) {
                    callback(error);
                    return;
                }
                userArray[key].counters = projectsResultObject;
                
                dbam.countUserComments(userArray[key].id, function (error, commentsResultObject) {
                    if (error) {
                        callback(error);
                        return;
                    }
                    userArray[key].counters.comments = commentsResultObject.comments;
                    userArray[key].counters.commentUpvotes = commentsResultObject.commentUpvotes;
                    
                    userArray[key].rep = reputation.getTotalReputationViaObject(userArray[key].counters);
                    if (--loop === 0) {
                        onComplete();
                    }
                });
            });
        });
    }
}

/**
 * @function
 * @name SponsoringController::index
 * @desc Holt Daten für die Übersicht über Sponsor-suchende
 * @param {string} path - Route
 * @param {function (req, res)} middleware - HTTP-Middleware mit Request- und Response-Objekt
 */
sponsoringController.get('/index', function (req, res) {
    console.log('[SPCO] GET /index');
    dbam.getSponsoringApplicants(function (error, resultArray) {
        if (error) {
            res.status(500).end();
            return;
        }
        if (resultArray.length > 0) {
            getRepInLoop(resultArray, function (error) {
                if (error) {
                    res.status(500).end();
                    throw error;
                }
                var resObj = {
                    results: resultArray
                };
                res.status(200).json(resObj);
                return;
            });
        } else {
            res.status(200).json({});
            return;
        }
        return;
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
sponsoringController.post('/new', function (req, res) {
    
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