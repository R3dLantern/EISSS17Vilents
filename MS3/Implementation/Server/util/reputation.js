/*jslint node:true nomen:true*/
"use strict";

/**
 * Modul zu Berechnung von Reputationswerten eines Benutzers
 * @module util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */

/**
 * @constant
 * @type {float}
 * @desc Gewichtungsfaktor für Reputationspunkte aus angelegten Projekten
 * @default
 */
var FACTOR_PROJECTS = 2.0;

/**
 * @constant
 * @type {float}
 * @desc Gewichtungsfaktor für Reputationspunkte aus angelegten Projektupdates
 * @default
 */
var FACTOR_PROJECT_UPDATES = 1.2;

/**
 * @constant
 * @type {float}
 * @desc Gewichtungsfaktor für Reputationspunkte aus verfassten Kommentaren
 * @default
 */
var FACTOR_COMMENTS = 0.6;

/**
 * @constant
 * @type {float}
 * @desc Gewichtungsfaktor für Reputationspunkte aus für Projekte erhaltenen Upvotes
 * @default
 */
var FACTOR_PROJECT_UPVOTES = 1.0;

/**
 * @constant
 * @type {float}
 * @desc Gewichtungsfaktor für Reputationspunkte aus für Projektupdates erhaltenen Upvotes
 * @default
 */
var FACTOR_PROJECT_UPDATE_UPVOTES = 0.8;

/**
 * @constant
 * @type {float}
 * @desc Gewichtungsfaktor für Reputationspunkte aus für Kommentare erhaltenen Upvotes
 * @default
 */
var FACTOR_COMMENTS_UPVOTES = 0.3;

var dbam = require('./dbam.js');

/** @todo für Produktivumgebung entfernen! */
console.log("[REPM] Reputation module loaded.");


/**
 * Callbackfunktion für Übergabe der GesamtReputation
 * @callback getTotalRepCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {int} totalRep - Ergebnis aus Abfrage
 */

/**
 * Berechnet die Gesamtreputation für einen Casemodder-Benutzer
 * @param {int} userId - Email des Benutzers
 * @param {getTotalRepCallback} callback - Callbackfunktion zur Rückgabe des Wertes
 * @todo <strong>Implementieren</strong>
 */
exports.getTotalReputationForUser = function (userId, callback) {
    var totalRep = 0.0;
    
    // Reputation aus Projekten
    dbam.countUserProjects(userId, function (projectsError, projectsResult) {
        if (projectsError) {
            callback(projectsError, null);
            return;
        }
        if (projectsResult) {
            console.log(projectsResult);
            totalRep += (projectsResult.projects.toFixed() * FACTOR_PROJECTS);
            totalRep += (projectsResult.projectUpdates.toFixed() * FACTOR_PROJECT_UPDATES);
            totalRep += (projectsResult.projectUpvotes.toFixed() * FACTOR_PROJECT_UPVOTES);
            totalRep += (projectsResult.projectUpdateUpvotes.toFixed() * FACTOR_PROJECT_UPDATE_UPVOTES);
        }
        
        // Reputation aus Kommentaren
        dbam.countUserComments(userId, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            }
            if (result) {
                totalRep += result.comments * FACTOR_COMMENTS;
                totalRep += result.commentUpvotes * FACTOR_COMMENTS_UPVOTES;
            }
            callback(null, Math.floor(totalRep));
        });
    });
};

module.exports = exports;