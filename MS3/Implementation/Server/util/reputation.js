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
 * Berechnet die Gesamtreputation für einen Casemodder-Benutzer
 * @param {string} userEmail - Email des Benutzers
 * @returns {int} Die Gesamtreputation des Benutzers
 * @todo <strong>Implementieren</strong>
 */
exports.getTotalReputationForUser = function (userEmail) {
    dbam.findUserByEmail(userEmail, function (error, statusCode, results) {
        //if(statusCode)
    });
};