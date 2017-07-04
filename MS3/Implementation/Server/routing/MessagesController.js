/*jslint node:true nomen:true es5:true*/
"use strict";

/**
 * Router-Middleware für das interne Messaging-System
 * @module routing/MessagesController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require("express");

var dbam                = require("../util/dbam.js");

var messagesController = express.Router();

console.log("[MSCO] MessagesController loaded.");

/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
messagesController.use(function (req, res, next) {
    console.log("[MSCO] Checking User");
    if (req.user) {
        next();
    } else {
        res.status(403).end();
    }
});
/**
 * @function
 * @name MessagesController::index
 * @desc Holt alle Nachrichten im Posteingang eines Benutzers
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
messagesController.get('/index', function (req, res) {
    var id = req.user.id;
    console.log("[MSCO] GET /index");
    dbam.getMessagesOverviewData(id, function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).end();
            throw error;
        }
        if (results) {
            res.status(200).json(results);
            return;
        }
        res.status(200).end();
    });
});


/**
 * @function
 * @name MessagesController::sendNew
 * @desc Schickt eine neue Nachricht einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
messagesController.post('/new', function (req, res) {
    
});


/** Router-Handling für Nachrichten
 * @param {string} path - Route
 */
messagesController.route('/:id')
    /** @function
     * @name MessagesController::show
     * @desc Holt Daten zu einem Projekt
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .get(function (req, res) {
    
    })
    /** @function
     * @name MessagesController::delete
     * @desc Holt Daten zu einem Projekt
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });

module.exports = messagesController;