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
 * Sucht in der Datenbank einen Benutzer nach ID.
 * @param {int} id - ID des Benutzers
 * @returns {object} JSON-Objekt mit öffentlichen Benutzerdaten
 * @todo <strong>Implementieren</strong>
 */
exports.findUserById = function (id) {

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