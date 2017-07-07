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
    .get(function (req, res) {
      var pId = req.params.id,
          uId = req.user.id;
      dbam.upvoteElement(
        {
          table: "kommentar_upvote",
          row: "kommentar_id"
        },
        pId,
        uId,
        function (error) {
          if (error) {
            res.status(500).end();
            return;
          } else {
            res.status(201).end();
            return;
          }
        }
      );
    })
    /** @function
     * @name UpvotesController::removeCommentUpvote
     * @desc Löscht ein Kommentar-Upvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
      var pId = req.params.id,
          uId = req.user.id;
      dbam.removeUpvote(
        {
            table: "kommentar_upvote",
            row: "kommentar_id"
        },
        pId,
        uId,
        function(error) {
          if (error) {
            res.status(500).end();
            throw error;
          } else {
            res.status(204).end();
          }
        }
      );
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
  .get(function (req, res) {
    var pId = req.params.id,
        uId = req.user.id;
    dbam.upvoteElement(
      {
        table: "projekt_upvote",
        row: "projekt_id"
      },
      pId,
      uId,
      function (error) {
        if (error) {
          res.status(500).end();
          return;
        } else {
          res.status(201).end();
          return;
        }
      }
    );
  })
    /** @function
     * @name UpvotesController::removeProjectUpvote
     * @desc Löscht einProjektupvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
      var pId = req.params.id,
          uId = req.user.id;
      dbam.removeUpvote(
        {
            table: "projekt_upvote",
            row: "projekt_id"
        },
        pId,
        uId,
        function(error) {
          if (error) {
            res.status(500).end();
            throw error;
          } else {
            res.status(204).end();
          }
        }
      );
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
      var pId = req.params.id,
          uId = req.user.id;
      dbam.upvoteElement(
        {
          table: "projektupdate_upvote",
          row: "projektupdate_id"
        },
        pId,
        uId,
        function (error) {
          if (error) {
            res.status(500).end();
            return;
          } else {
            res.status(201).end();
            return;
          }
        }
      );
    })
    /** @function
     * @name UpvotesController::removeProjectUpdateUpvote
     * @desc Löscht ein Projektupdate-Upvote
     * @param {callback} middleware - HTTP-Middleware mit Request- und Response-Objekt
     * @todo <strong>Implementieren</strong>
     */
    .delete(function (req, res) {
      var pId = req.params.id,
          uId = req.user.id;
      dbam.removeUpvote(
        {
            table: "projektupdate_upvote",
            row: "projektupdate_id"
        },
        pId,
        uId,
        function(error) {
          if (error) {
            res.status(500).end();
            throw error;
          } else {
            res.status(204).end();
          }
        }
      );
    });

module.exports = upvotesController;