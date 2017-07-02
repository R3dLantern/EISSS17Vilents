/*jslint node:true nomen:true*/
"use strict";

/** 
 * Hauptkommunikationsmodul für Datenbankzugriffe.
 * DBAM = "Data Base Access Module"
 * @module util/dbam
 * @requires node-mysql
 * @requires fs
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */

var mysql   = require('mysql');
var fs      = require('fs');
var pool    = null;


/** @todo für Produktivumgebung entfernen! */
console.log("[DBAM] DBAM module loaded.");

/**
 * Entnimmt der im System hinterlegten Konfigurationsdatei die Zugangsdaten für die Datenbank
 * @returns {object} JSON-Objekt mit Login-Credentials für die Datenbank
 */
function getCredentialsFromJson() {
    var content = fs.readFileSync('./util/config/dbam.json');
    return JSON.parse(content);
}

/**
 * @function
 * @name DBAM:Exports:initializeConnection
 * @desc Erstellt eine Verbindung zum Datenbankserver.
 * Wird einmalig bei Ausführung der Serverlogik ausgeführt.
 */
exports.initializeConnection = function () {
    this.pool = mysql.createPool(getCredentialsFromJson());
    console.log("[DBAM] Connection Pool created");
};


/**
 * Callback-Funktion für Registrierungsversuch
 * 
 * @callback trySignupCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 */

/**
 * @function
 * @name DBAM:Exports:trySignUp
 * @desc Versucht, einen User in der Datenbank anzulegen. Bei Erfolg, wird der Typ des Users in der Datenbank bestimmt, und 0 zurückgegeben.
 * @param {object} newUser - Ein newUser-Objekt, bestehend aus den Werten email, type, password und dateOfBirth
 * @param {trySignupCallback} callback - Callbackfunktion zum Verarbeiten der Return-Wertes
 * @throws Fehler bei MySQL
 */
exports.trySignup = function (newUser, callback) {
    console.log("[DBAM] trySignup");
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError);
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        
        conn.query({
            sql: "INSERT INTO benutzer (email, passwort, geburtsdatum) VALUES(?, ?, ?)",
            values: [newUser.email, newUser.password, newUser.dateOfBirth]
        }, function (insertError, results, fields) {
            if (insertError) {
                callback(insertError);
            }
            console.log("[DBAM] Insert 1 successful");
            var sql2 = "INSERT INTO ";
            if (newUser.type === "casemodder") {
                sql2 += "casemodder (user_id) VALUES (?)";
            } else {
                sql2 += "sponsor (user_id) VALUES (?)";
            }
            conn.query(sql2, [results.insertId], function (insertError2, results2, fields2) {
                conn.release();
                if (insertError2) {
                    callback(insertError2);
                }
                console.log("[DBAM] Insert 2 successful");
                callback(null);
            });
        });
    });
};


/**
 * Callbackfunktion für Suche via Email
 * 
 * @callback findUserByEmailCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Ergebnis aus Abfrage
 */

/**
 * Sucht in der Datenbank einen Benutzer nach Email-Adresse.
 * @param {string} email - Email-Adresse des Benutzers
 * @param {findUserByEmailCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 * @returns {object} JSON-Objekt mit öffentlichen Benutzerdaten
 * @todo <strong>Implementieren</strong>
 */
exports.findUserByEmail = function (email, callback) {
    console.log("[DBAM] findUserByEmail");
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError, null);
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        conn.query('SELECT * FROM benutzer WHERE email = ? LIMIT 1', [email], function (selectError, results, fields) {
            if (selectError) {
                conn.release();
                callback(selectError, null);
            }
            if (results) {
                conn.query('SELECT * FROM casemodder WHERE user_id = ? LIMIT 1', [results[0].id], function (typeSelectError, typeResults, typeFields) {
                    conn.release();
                    if (typeSelectError) {
                        callback(typeSelectError, null);
                    }
                    if (typeResults) {
                        results[0].type = "casemodder";
                    } else {
                        results[0].type = "sponsor";
                    }
                    callback(null, results);
                });
            } else {
                callback(null, null);
            }
        });
    });
};

module.exports = exports;