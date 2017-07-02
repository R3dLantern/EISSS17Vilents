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
 * @function
 * @name MessagesController::index
 * @desc Holt alle Nachrichten im Posteingang eines Benutzers
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
messagesController.get('/index', /*requireLogin,*/ function (req, res) {
    
});


/**
 * @function
 * @name MessagesController::sendNew
 * @desc Schickt eine neue Nachricht einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
messagesController.post('/new', /*requireLogin,*/ function (req, res) {
    
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