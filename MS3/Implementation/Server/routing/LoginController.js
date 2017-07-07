/*jslint node:true nomen:true*/
"use strict";

/**
 * Router-Middleware für Login, Logout und Registrierung
 * @module routing/LoginController
 * @requires express
 * @requires util/dbam
 * @requires util/reputation
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require("express");

var main                = require("../server.js");
var dbam                = require("../util/dbam.js");
var fileManager         = require("../util/filemanager.js");

var loginController     = express.Router();

/**
 * @function
 * @name LoginController::signUp
 * @desc Registriert einen Benutzer
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 */
loginController.post('/signup', function (req, res) {
    dbam.trySignup(req.body, function (err) {
        if (err) {
            console.log(err.stack);
            res.status(500).end();
        }
        res.status(201).end();
    });
});


/**
 * @function
 * @name LoginController::login
 * @desc Loggt einen Benutzer ein
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
loginController.post('/login', function (req, res) {
    dbam.findUserByEmail(req.body.email, function (error, result) {
        if (error) {
            res.status(500).end();
        }
        if (result) {
            result = JSON.parse(result);
            if (result.passwort === req.body.password) {
                req.session.user = {
                    id: result.id,
                    email: result.email,
                    isCasemodder: result.isCasemodder
                };
                delete result.passwort;
                delete result.email;
                delete result.geburtsdatum;
                delete result.vorname;
                delete result.nachname;
                res.status(200).json(result);
            } else {
                res.status(401).end();
            }
        } else {
            res.status(404).end();
        }
    });
});


/**
 * @function
 * @name LoginController::logout
 * @desc Loggt einen Benutzer aus
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 */
loginController.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.status(500).end();
            throw err;
        }
        res.status(204).end();
    });
});


/**
 * @function
 * @name LoginController::deleteAccount
 * @desc Löscht ein Benutzerkonto
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 */
loginController.post('/signout', function (req, res) {
  var password = req.body.password,
      email = req.user.email;
  dbam.findUserByEmail(
    email,
    function (error, result) {
      if (error) {
        res.status(500).end();
        throw error;
      } else {
        result = JSON.parse(result);
        if (result.passwort === req.body.password) {
          var id = req.user.id;
          dbam.deleteUserAccount(
            id,
            function (error) {
              if (error) {
                res.status(500).end();
                return;
              } else {
                req.session.destroy(
                  function (err) {
                    if (err) {
                      res.status(500).end();
                      throw err;
                    } else {
                      res.status(204).end();
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

module.exports = loginController;