/*jslint node:true nomen:true*/
"use strict";

/** 
 * Modul zum Verwalten von Bild- und Dokumentdateien
 * @module util/filemanager
 * @requires fs
 * @requires util/dbam
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */

var fs  = require('fs');
var dbam = require('./dbam.js');

/**
 * Callback-Funktion für Datei-Upload
 * 
 * @callback fileUploadCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 */

/**
 * Decodiert den Base64-String zu einer Akkreditierungsdatei,
 * speichert diese im Dateisystem und hinterlegt den Dateipfad in der Datenbank
 * @param {string} userEmail Die Email des Benutzers, der die Datei hochlädt
 * @param {string} base64fileStr Der Base64-String der Datei
 * @param {fileUploadCallback} callback Callbackfunktion
 * {@link http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html Teile des Original-Codes}
 */
exports.handleAccreditFileUpload = function (userEmail, userId, base64fileStr, callback) {
    var bitmap = new Buffer(base64fileStr, 'Base64'),
        fittedUserEmail = userEmail.replace("@", "AT").replace(".", "DOT"),
        filePath = './data/doc/accredit_' + fittedUserEmail + '.pdf';
    fs.writeFile(filePath, bitmap, function (error) {
        if (error) {
            callback(error);
        } else {
            var dbFileStr = '/doc/accredit_' + fittedUserEmail + '.pdf';
            dbam.insertFile({
                relation: {
                    user: userId
                },
                path: dbFileStr,
                type: "pdf"
            }, function (error) {
                if (error) {
                    callback(error);
                    return;
                } else {
                    callback(null);
                    return;
                }
            });
        }
    });
};

/**
 * Dekodiert die Base64-Strings einer JPEG-Dateisammlung, speichert dieser im
 * Dateisystem und hinterlegt in der Datenbank den Dateipfad
 * @param {string[]} pictureArray String-Array mit Base64-Strings
 * @param {number}   pId          Zugehörige Projekt-ID
 * @param {string}   pTitle       Zugehöriger Projekttitel
 * @param {fileUploadCallback} callback Callbackfunktion
 */
exports.handleProjectImagesUpload = function (pictureArray, pId, pTitle, callback) {
  var keys = Object.keys(pictureArray),
      loop = keys.length,
      onComplete = function() {
        callback(null);
      };
  if (loop === 0) {
    onComplete();
  } else {
    keys.forEach(
      function (key) {
        var bitmap = new Buffer(pictureArray[key].base, 'Base64'),
            fittedTitle = key.toString() + '_' + pTitle.replace(' ', '_') + '_P',
            filePath = './data/img/' + fittedTitle + '.jpeg';
        fs.writeFile(
          filePath,
          bitmap,
          function (error) {
            if (error) {
              callback(error);
              return;
            } else {
              var dbFileStr = '/img/' + fittedTitle + '.jpeg';
              dbam.insertFile(
                {
                  relation: {
                    project: pId
                  },
                  path: dbFileStr,
                  type: 'jpeg'
                },
                function (error) {
                  if (error) {
                    callback(error);
                  }
                  if (--loop === 0) {
                    onComplete();
                  }
                }
              );
            }
          }
        );
      }
    );
  }
}



module.exports = exports;