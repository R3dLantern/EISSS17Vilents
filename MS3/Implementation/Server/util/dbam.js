/*jslint node:true nomen:true*/
"use strict";

/** 
 * Hauptkommunikationsmodul für Datenbankzugriffe.
 * DBAM = "Data Base Access Module"
 * @module util/dbam
 * @requires mysqljs/mysql
 * @requires fs
 * @author Leonid Vilents <lvilents@smail.th-koeln.de>
 */

var mysql   = require('mysql');
var fs      = require('fs');
var conn    = null;

/** @todo für Produktivumgebung entfernen! */
console.log("[DBAM] DBAM module loaded.");

/**
 * Erstellt eine Verbindung zum Datenbankserver.
 * Wird einmalig bei Ausführung der Serverlogik ausgeführt.
 */
exports.initializeConnection = function () {
    this.conn = mysql.createConnection(this.getCredentialsFromJson());
    console.log("[DBAM] Connecting to DB...");
    this.conn.connect(function (err) {
        console.log(err ? "[DBAM] Error while connecting: " + err.stack : "[DBAM] DB connection established.");
    });
};

/**
 * Versucht, einen User in der Datenbank anzulegen. Bei Erfolg, wird der Typ des Users in der Datenbank bestimmt, und 0 zurückgegeben.
 * @param newUser {object} Ein newUser-Objekt, bestehend aus den Werten email, type, password und dateOfBirth
 * @return {int} 0 bei Erfolg
 * @throws Fehler bei MySQL
 */
exports.trySignup = function (newUser) {
    if (this.conn) {
        console.log("[DBAM] trySignup: Query 1 mit " + this.conn.threadId);
        
        var sql = "INSERT INTO ?? SET ?";
        var inserts = ['benutzer', newUser];
        var query = conn.query(mysql.format(sql, inserts), function (error, results, fields) {
            console.log("[DBAM] Query 1 wird ausgeführt.");
            if (error) {
                console.log("[DBAM] SQL: " + this.sql);
                console.log("[DBAM] " + error.stack);
                throw error;
            } else {
                console.log("[DBAM] trySignup: Query 2...");
            }
        });
        console.log(query.sql);
    }
};

/**
 * Sucht in der Datenbank einen Benutzer nach Email-Adresse.
 * @param {string} email - Email-Adresse des Benutzers
 * @returns {object} JSON-Objekt mit öffentlichen Benutzerdaten
 * @todo <strong>Implementieren</strong>
 */
exports.findUserByEmail = function (email) {
    if (this.conn) {
        conn.query({
            sql: 'SELECT * FROM `benutzer` WHERE `email` = ?',
            values: [conn.escape(email)]
        }, function (error, results, fields) {
            if (error) {
                throw error;
            }
            return results;
        });
    }
};

/**
 * Entnimmt der Konfigurationsdatei die Zugangsdaten für die Datenbank
 * @returns {object} JSON-Objekt mit Login-Credentials für die Datenbank
 */
this.getCredentialsFromJson = function () {
    var content = fs.readFileSync('./util/config/dbam.json');
    return JSON.parse(content);
};

module.exports = exports;