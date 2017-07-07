/*jslint node:true nomen:true es5:true*/
"use strict";

/**
 * Router-Middleware für Kommentare
 * @module routing/UpvotesController
 * @requires express
 * @requires util/dbam
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */
var express             = require('express');

var dbam                = require('../util/dbam.js');

var upvotesController  = express.Router();

/** @todo für Produktivumgebung entfernen! */
console.log("[UPCO] UpvotesController loaded.");


/** Router-Handling für Kommentarupvotes
 * @param {string} path - Route
 */
upvotesController.route('/comment/:id')
    /** @function
     * @name UpvotesController::upvoteComment
     * @desc Versieht einen Kommentar mit einem Upvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .post(function (req, res) {
    
    })
    /** @function
     * @name UpvotesController::removeCommentUpvote
     * @desc Löscht ein Kommentar-Upvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });


/** Router-Handling für Projektupvotes
 * @param {string} path - Route
 */
upvotesController.route('/project/:id')
  /** @function
   * @name UpvotesController::upvoteProject
   * @desc Versieht ein Projekt mit einem Upvote
   * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
   * @todo <strong>Implementieren</strong>
   */
  .post(function (req, res) {
    var pId = req.params.id,
        uId = req.user.id;
    dbam.upvoteProject(pId, uId, function (error) {
        
    });
  })
    /** @function
     * @name UpvotesController::removeProjectUpvote
     * @desc Löscht einProjektupvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });


/** Router-Handling für Projektupdate-Upvotes
 * @param {string} path - Route
 */
upvotesController.route('/projectupdate/:id')
    /** @function
     * @name UpvotesController::upvoteProjectUpdate
     * @desc Versieht ein Projektupdate mit einem Upvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .post(function (req, res) {
    
    })
    /** @function
     * @name UpvotesController::removeProjectUpdateUpvote
     * @desc Löscht ein Projektupdate-Upvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
    
    });

module.exports = upvotesController;