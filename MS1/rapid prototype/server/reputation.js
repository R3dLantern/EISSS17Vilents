/*jslint node:true nomen:true*/
"use strict";

/**
 * reputation.js
 * Modul des Rapid Prototype im Rahmen von EIS SS2017
 * Zuständig für die Berechnung der Teilreputationen und Gesamtreputation eines Casemodders
 * @author Leonid Vilents
 */

/**
 * Einlesen der Testdaten des Prototyps
 *===================================================*/
var fs          = require('fs');
var jsonfile    = require('jsonfile');

var datax  = [];
datax[0] = __dirname + '/_testdata/casemodder.json';
datax[1] = __dirname + '/_testdata/projects.json';
datax[2] = __dirname + '/_testdata/comments.json';
var casemodder,
    projects,
    comments;

fs.readFile(datax[0], 'utf-8', function (err, data) {
    if (err) {
        throw err;
    }
    casemodder = JSON.parse(data);
    console.log("Casemodder-Daten eingelesen");
});

fs.readFile(datax[1], 'utf-8', function (err, data) {
    if (err) {
        throw err;
    }
    projects = JSON.parse(data);
    console.log("Projekte eingelesen");
});

fs.readFile(datax[2], 'utf-8', function (err, data) {
    if (err) {
        throw err;
    }
    comments = JSON.parse(data);
    console.log("Kommentare eingelesen");
});
/**==================================================*/

/**
 * Gewichtungsfaktoren für die Teilreputationen
 */
var FACTOR_WRITTEN_COMMENT = 0.3,
    FACTOR_NEW_PROJECT = 2.0,
    FACTOR_PROJECT_UPDATE = 1.0,
    FACTOR_COMMENT_UPVOTES = 0.7,
    FACTOR_PROJECT_UPVOTES = 0.7;

/**
 * Abfragefunktion für die verfassten Kommentare sowie deren Upvotes eines Benutzers
 * @param username der Benutzername des Benutzers
 * @return die modifizierte Summe der Teilreputationen
 */
var getModifiedReputationForWrittenCommentsAndCommentUpvotes = function (username) {
    var i = 0,
        writtenCommentsCount = 0,
        commentUpvotesCount = 0;
    for (i; i < comments.length; i += 1) {
        if (comments[i].user === username) {
            writtenCommentsCount += 1;
            // Typsicherheit gewährleisten
            commentUpvotesCount += parseInt(comments[i].upvotes, 10);
        }
    }
    return Math.floor(writtenCommentsCount * FACTOR_WRITTEN_COMMENT) + Math.floor(commentUpvotesCount * FACTOR_COMMENT_UPVOTES);
};

/**
 * Abfragefunktion für die Projekte, Projekt-Updates und die Upvotezahlen der einzelnen Projekt-Updates eines Benutzers
 * @param username der Benutzername des Benutzers
 * @return die modifizierte Summe der Teilreputation
 */
var getModifiedReputationForProjectsAndProjectUpdates = function (username) {
    var i = 0,
        projectsCount = 0,
        projectUpdatesCount = 0,
        projectUpvotesCount = 0;
    for (i; i < projects.length; i += 1) {
        if (projects[i].user === username) {
            projectsCount += 1;
            var j = 0;
            for (j; j < projects[i].updates.length; j += 1) {
                projectUpdatesCount += 1;
                // Typsicherheit gewährleisten
                projectUpvotesCount += parseInt(projects[i].updates[j].upvotes, 10);
            }
        }
    }
    return Math.floor(projectsCount * FACTOR_NEW_PROJECT) + Math.floor(projectUpdatesCount * FACTOR_PROJECT_UPDATE) + Math.floor(projectUpvotesCount * FACTOR_PROJECT_UPVOTES);
};

/**
 * Hauptrückgabefunktion für die Gesamtreputation eines Benutzers
 * @param username der Benutzername
 * @return die Gesamtreputation des Benutzers nach Modifizierung
 */
exports.getTotalReputation = function (username) {
    return getModifiedReputationForProjectsAndProjectUpdates(username) + getModifiedReputationForWrittenCommentsAndCommentUpvotes(username);
};