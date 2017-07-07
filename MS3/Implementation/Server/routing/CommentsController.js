/*jslint node:true nomen:true es5:true*/
"use strict";

/**
 * Router-Middleware für Kommentare
 * @module routing/CommentsController
 * @requires express
 * @requires util/dbam
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require('express');

var dbam                = require('../util/dbam.js');

var commentsController  = express.Router();


/** Router-Handling für Projektkommentare
 * @param {string} path - Route
 */
commentsController.route('/project/:id')
    /** @function
     * @name CommentsController::commentOnProject
     * @desc Legt einen neuen Projektkommentar an
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .post(function (req, res) {
    
    })
    /** @function
     * @name CommentsController::deleteProjectComment
     * @desc Löscht einen Projektkommentar
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });


/** Router-Handling für Projektupdatekommentare
 * @param {string} path - Route
 */
commentsController.route('/projectupdate/:id')
    /** @function
     * @name CommentsController::commentOnProjectUpdate
     * @desc Legt einen neuen Projektupdatekommentar an
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .post(function (req, res) {
    
    })
    /** @function
     * @name CommentsController::deleteProjectUpdateComment
     * @desc Löscht einen Projektupdatekommentar
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });

module.exports = commentsController;