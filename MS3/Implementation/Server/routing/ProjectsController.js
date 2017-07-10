/*jslint node:true nomen:true es5:true*/
"use strict";

/**
 * Router-Middleware für Projekte
 * @module routing/ProjectsController
 * @requires express
 * @requires util/dbam
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require("express");

var dbam                = require("../util/dbam.js");

var projectsController = express.Router();

/**
 * Überprüft, ob es eine Login-Session gibt.
 * @param {object} req - HTTP Request-Objekt
 * @param {object} res - HTTP Response-Objekt
 * @param {object} next - Weiterleitung
 */
projectsController.use(function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403).end();
    }
});

/** Routerhandling für Index und neue Projekte
 * @param {string} path - URI
 */
projectsController.router('/')
  /**
   * @function
   * @name ProjectsController::index
   * @desc Fordert Projekte von der Datenbank an und sortiert sie in referen-
           zierend (benutzereigene oder Team-eigene Projekte) und nicht-
           referenzierend (Fremde Projekte) ein.
   * @param {function (req, res)} httpCallback Callbackfunktion mit Request- und
   *                                           Response-Objekt
   */
  .get(function (req, res) {
    var id = req.user.id,
        isCasemodder = req.user.isCasemodder;
    dbam.getProjectsOverviewData(
      id,
      isCasemodder,
      function (error, resObj) {
        if (error) {
          res.status(500).end();
          throw error;
        }
        res.status(200).end(JSON.stringify(resObj));
      }
    );
  })

  /**
   * @function
   * @name ProjectsController::newProjekt
   * @desc Legt mit erhaltenen POST-Daten ein neues Projekt in der Datenbank an
   * @param {function (req, res)} httpCallback Callbackfunktion mit Request- und
   *                                           Response-Objekt
   * @todo <strong>Implementieren</strong>
   */
  .post(function (req, res) {
    
  });

/** Router-Handling für Projekte
 * @param {string} path - Route
 */
projectsController.route('/:id')
    /** @function
     * @name ProjectsController::show
     * @desc Holt Daten zu einem Projekt
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .get(function (req, res) {
        var id = req.params.id;
        dbam.getProject(id, req.user.id, function (error, result) {
            if (error) {
                res.status(500).end();
                throw error;
            }
            res.status(200).json(result);
        });
    })
    /** @function
     * @name ProjectsController::update
     * @desc Aktualisiert einen Datensatz zu einem Projekt
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .put(function (req, res) {
    
    })
    /** @function
     * @name ProjectsController::delete
     * @desc Löscht ein Projekt
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
      var pId = req.params.id;
      dbam.deleteProject(
        pId,
        function (error) {
          if (error) {
            res.status(500).end();
            return;
          } else {
            res.status(204).end();
            return;
          }
        }
      );
    });

module.exports = projectsController;