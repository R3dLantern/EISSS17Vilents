/*jslint node:true nomen:true*/
"use strict";

/** 
 * Dateiverwaltungsmodul
 * @module util/filemanager
 * @requires fs
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
            callback(null);
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

module.exports = exports;