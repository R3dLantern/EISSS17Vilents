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
 * @function
 * @name ProjectsController::index
 * @desc Holt Projekte zur Einsicht
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
projectsController.get('/index', /*requireLogin,*/ function (req, res) {
    
});


/**
 * @function
 * @name ProjectsController::create
 * @desc Legt ein neues Projekt an
 * @param {string} path - Route
 * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
 * @todo <strong>Implementieren</strong>
 */
projectsController.post('/new', /*requireLogin,*/ function (req, res) {
    
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