/*jslint node:true nomen:true*/
"use strict";

/**
 * Router-Middleware für Dashboard-Aufrufe
 * @module routing/DashboardController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require("express");

var dbam                = require("../util/dbam.js");
var reputation          = require("../util/reputation.js");

var dashboardController = express.Router();

console.log("[DBCO] DashboardController loaded.");

/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
dashboardController.use(function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).end();
  }
});


/**
 * @function
 * @name DashboardController::show
 * @desc Rendert das Dashboard für einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
dashboardController.get('/dashboard', function (req, res) {
  /** @todo für Produktivumgebung entfernen! */
  console.log("[DBCO] Request auf /dashboard!");
  var resObj = {
    newMessages: 0,
    rep: 0,
    id: req.user.id
  };
    
/** @todo Kommentarbenachrichtigungen */
    
  dbam.checkForNewMessages(req.user.id, function (error, result) {
    if (error) {
      res.status(500).end();
      throw error;
    }
    resObj.newMessages = result;
    if (req.user.isCasemodder) {
      reputation.getTotalReputationForUser(
        req.user.id,
        function (error, totalRep) {
          if (error) {
            console.log("[DBCO] GetTotalRep failed");
            res.status(500).end();
            throw error;
          }
          resObj.rep = totalRep;
          console.log(resObj);
          res.status(200).json(resObj);
        }
      );
    } else {
      res.status(200).end();
    }  
  });
});
    
module.exports = dashboardController;