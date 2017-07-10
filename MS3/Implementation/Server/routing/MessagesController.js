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

/** Router-Handling für bestehende Nachrichten
 * @param {string} path - URI
 */
messagesController.route('/')
  /**
   * @function
   * @name MessagesController::index
   * @desc Fordert alle Nachrichten an, die sich im Posteingang eines Benutzers
   *       befinden.
   * @param {function (req, res)} httpCallback Callbackfunktion mit Request- und
   *                                           Response-Objekt
   */
  .get(function (req, res) {
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
      return;
    });
  })
  /**
   * @function
   * @name MessagesController::newMessage
   * @desc Erstellt mit den übergebenen POST-Daten eine neue Nachricht in der
   *       Datenbank
   * @param {function (req, res)} httpCallback Callbackfunktion mit Request- und
   *                                           Response-Objekt
   */
  .post(function (req, res) {
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
  /** 
   * @function
   * @name MessagesController::show
   * @desc Holt den Inhalt einer Nachricht
   * @param {function (req, res)} httpCallback Callbackfunktion mit Request- und
   *                                           Response-Objekt
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
  /** 
   * @function
   * @name MessagesController::setMessageAsRead
   * @desc Setzt eine Nachricht als gelesen
   * @param {function (req, res)} httpCallback Callbackfunktion mit Request und
   *                                           Response-Objekt
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
   * @name MessagesController::deleteMessage
   * @desc Löscht eine Nachricht aus der Datenbank
   * @param {functoon (req, res)} httpCallback Callbackfunktion mit Request- und
   *                                           Response-Objekt
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