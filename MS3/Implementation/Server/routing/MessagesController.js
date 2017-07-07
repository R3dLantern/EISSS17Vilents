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

/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
messagesController.use(function (req, res, next) {
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
    dbam.getMessagesOverviewData(id, function (error, results) {
        if (error) {
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
 * @desc Schickt eine neue Nachricht an einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
messagesController.post('/new', function (req, res) {
  var messageObject = req.body;
  messageObject.senderId = req.user.id;
  dbam.createNewMessage(
    messageObject,
    function (error) {
      if (error) {
        res.status(500).end();
        throw error;
      } else {
        res.status(201).end();
      }
    }
  );
});


/** Router-Handling für Nachrichten
 * @param {string} path - Route
 */
messagesController.route('/:id')
  /** @function
   * @name MessagesController::show
   * @desc Holt den Inhalt einer Nachricht
   * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
   * @todo <strong>Implementieren</strong>
   */
  .get(function (req, res) {
    var mId = req.params.id;
    dbam.getMessageContent(mId, function (error, result) {
      if (error) {
        res.status(500).end();
        throw error;
      }
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).end();
      }
    });
  })
  /** @function
   * @name MessagesController::setAsRead
   * @desc Setzt eine Nachricht als gelesen
   * @param {function (req, res)} middleware - HTTP-Middleware mit Request und Response-Objekt
   */
  .put(function (req, res) {
    var mId = req.params.id;
    dbam.setMessageAsRead(mId, function (error) {
      if (error) {
        res.status(500).end();
        throw error;
      } else {
        res.status(204).end();
      }
    });
  })
  /** @function
   * @name MessagesController::delete
   * @desc Löscht eine Nachricht aus der Datenbank
   * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
   * @todo <strong>Implementieren</strong>
   */
  .delete(function (req, res) {
    var mId = req.params.id;
    dbam.deleteMessage(mId, function (error) {
      if (error) {
        res.status(500).end();
      } else {
        res.status(204).end();
      }
      return;
    });
  });

module.exports = messagesController;