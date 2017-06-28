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
 * @function
 * @name DBAM:Exports:initializeConnection
 * @desc Erstellt eine Verbindung zum Datenbankserver.
 * Wird einmalig bei Ausführung der Serverlogik ausgeführt.
 */
exports.initializeConnection = function () {
    this.pool = mysql.createPool(this.getCredentialsFromJson());
    console.log("[DBAM] Connection Pool created");
};

/**
 * @function
 * @name DBAM:Exports:trySignUp
 * @desc Versucht, einen User in der Datenbank anzulegen. Bei Erfolg, wird der Typ des Users in der Datenbank bestimmt, und 0 zurückgegeben.
 * @param {object} newUser - Ein newUser-Objekt, bestehend aus den Werten email, type, password und dateOfBirth
 * @param {callback} callback - Callbackfunktion zum Verarbeiten der Return-Wertes
 * @throws Fehler bei MySQL
 */
exports.trySignup = function (newUser, callback) {
    console.log("[DBAM] trySignup");
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError, null);
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        
        conn.query({
            sql: "INSERT INTO benutzer (email, passwort, geburtsdatum) VALUES(?, ?, ?)",
            values: [newUser.email, newUser.password, newUser.dateOfBirth]
        }, function (insertError, results, fields) {
            if (insertError) {
                callback(insertError, null);
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
                    callback(insertError2, null);
                }
                console.log("[DBAM] Insert 2 successful");
                callback(null, null);
            });
        });
    });
};


/**
 * Sucht in der Datenbank einen Benutzer nach Email-Adresse.
 * @param {string} email - Email-Adresse des Benutzers
 * @returns {object} JSON-Objekt mit öffentlichen Benutzerdaten
 * @todo <strong>Implementieren</strong>
 */
exports.findUserByEmail = function (email, callback) {
    console.log("[DBAM] findUserByEmail");
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError, 500, null);
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        conn.query({
            sql: 'SELECT * FROM benutzer WHERE email = ?',
            values: [conn.escape(email)]
        }, function (selectError, results, fields) {
            conn.release();
            if (selectError) {
                callback(selectError, 500, null);
            }
        });
    });
};

/**
 * @function
 * @name DBAM::getCredentialsFromJson
 * @desc Entnimmt der im System hinterlegten Konfigurationsdatei die Zugangsdaten für die Datenbank
 * @returns {object} JSON-Objekt mit Login-Credentials für die Datenbank
 */
this.getCredentialsFromJson = function () {
    var content = fs.readFileSync('./util/config/dbam.json');
    return JSON.parse(content);
};

module.exports = exports;