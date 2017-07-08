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


/**
 * @constant
 * @type {int}
 * @desc Minimale Reputation zur Aktivierung des Suchstatus
 * @default
 */
var MINIMUM_REP = 0;

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
  var resObj = {
    newMessages: 0,
    id: req.user.id
  };
  dbam.checkForNewMessages(req.user.id, function (error, result) {
    if (error) {
      res.status(500).end();
      throw error;
    }
    resObj.newMessages = result;
    if (req.user.isCasemodder) {
      resObj.suchstatus = req.user.suchstatus;
      reputation.getTotalReputationForUser(
        req.user.id,
        function (error, totalRep) {
          if (error) {
            res.status(500).end();
            throw error;
          }
          resObj.rep = totalRep;
          if (totalRep >= MINIMUM_REP && req.user.suchstatus === false) {
              resObj.canActivateSeekStatus = true;
          } else {
              resObj.canActivateSeekStatus = false;
          }
          res.status(200).json(resObj);
        }
      );
    } else {
      res.status(200).json(resObj);
    }  
  });
});


/**
 * @function
 * @name DashboardController::Seek
 * @desc Aktiviert den Sponsorsuchstatus eines Casemodders
 * @param {string} path - Pfad
 * @param {function (req, res)} callback - Callbackfunktion
 */
dashboardController.get('/seek', function (req, res) {
    reputation.getTotalReputationForUser(
      req.user.id,
      function (error, result) {
        if (error) {
          res.status(500).end();
          throw error;
        }
        if (result < MINIMUM_REP) {
          res.status(400).end();
          return;
        } else {
        dbam.activateSeekerStatus(
          req.user.id,
          function (error) {
            if (error) {
              res.status(500).end();
              throw error;
            } else {
              res.status(201).end();
            }
          }
        );
       }
     }
    );
  }
);
    
module.exports = dashboardController;