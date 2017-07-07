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

/** @todo für Produktivumgebung entfernen! */
console.log("[PJCO] ProjectsController loaded.");

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

/**
 * @function
 * @name ProjectsController::index
 * @desc Holt Projekte zur Einsicht
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
projectsController.get('/index', function (req, res) {
    var id = req.user.id,
        isCasemodder = req.user.isCasemodder;
    dbam.getProjectsOverviewData(id, isCasemodder, function (error, resObj) {
        if (error) {
            res.status(500).end();
            throw error;
        }
        res.status(200).end(JSON.stringify(resObj));
    });
});

/**
 * @function
 * @name ProjectsController::create
 * @desc Legt ein neues Projekt an
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
projectsController.post('/new', function (req, res) {
    
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
    
    });

module.exports = projectsController;