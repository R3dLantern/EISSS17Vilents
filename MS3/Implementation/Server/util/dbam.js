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
    console.log("[DBAM] Credentials received");
    return JSON.parse(content);
}


/**
 * Callback-Funktion für Einzelabfragen
 * 
 * @callback singleQueryCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Ergebnisse der Abfrage
 */

/**
 * @function
 * @name DBAM::executeSingleQuery
 * @desc Führt eine einzelne Datenbankabfrage aus.
 * @param {string} sql - Der Query-String in SQL, möglicherweise mit Parametern
 * @param {array} values - Werte-Array für parametrisierbare Query-Strings
 * @param {singleQueryCallback} callback - Callbackfunktion zum Verarbeiten der Return-Wertes
 */
var executeSingleQuery = function (sql, values, callback) {
    this.pool.getConnection(function (connError, conn) {
        if (connError) {
            callback(connError, null);
            return;
        }
        console.log("Connected with ID " + conn.threadId);
        console.log(sql);
        console.log(values);
        conn.query(
            sql,
            values,
            function (queryError, results, fields) {
                console.log("[DBAM] Query Callback execution");
                if (queryError) {
                    callback(queryError, null);
                    throw queryError;
                } else {
                    console.log(results);
                    callback(null, results);
                    return;
                }
            }
        );
    });
};

/**
 * Hilfsfunktion zur Erstellung von inneren Queries bei der Projektabfrage
 * für Sponsoren
 * @param   {string} index Teampositionsnummer
 * @returns {string} das fertige Subquery
 */
var sponsorTeamSubquery = function (index) {
    return "(SELECT casemodder" + index + "_id FROM sponsor WHERE id = ?)";
};

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
 */
exports.findUserByEmail = function (email, callback) {
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError, null);
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        conn.query('SELECT * FROM benutzer WHERE email = ? LIMIT 1', [email], function (selectError, results, fields) {
            if (selectError) {
                conn.release();
                callback(selectError, null);
                return;
            }
            if (results) {
                conn.query('SELECT * FROM casemodder WHERE user_id = ? LIMIT 1', [results[0].id], function (typeSelectError, typeResults, typeFields) {
                    conn.release();
                    if (typeSelectError) {
                        callback(typeSelectError, null);
                        return;
                    }
                    results[0].type = typeResults ? "casemodder" : "sponsor";
                    callback(null, results);
                    return;
                });
            } else {
                callback(null, null);
                return;
            }
        });
    });
};


/**
 * Callbackfunktion für das Abrufen von Profildaten
 * 
 * @callback profileDateCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Profildaten als Objekt
 */

/**
 * Ruft die Profildaten eines Benutzers ab
 * @param {int} userId - ID des Benutzers
 * @param {string} userType - Benutzertyp
 * @param {profileDataCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.getProfileData = function (userId, userType, callback) {
    this.pool.getConnection(function (connError, conn) {
        if (connError) {
            conn.release();
            callback(connError, null);
            return;
        }
        console.log("Connected with ID " + conn.threadId);
        var returnData = userType === "casemodder"
                        ? {
                    nachname: "",
                    vorname: "",
                    suchstatus: false,
                    wohnort: "",
                    beschreibung: ""
                }
                        : {
                    nachname: "",
                    vorname: "",
                    firma: "",
                    beschreibung: ""
                };
        conn.query(
            "SELECT * FROM benutzer WHERE id = ? LIMIT 1",
            [userId],
            function (userError, userResults, userFields) {
                if (userError) {
                    conn.release();
                    callback(userError, null);
                    return;
                }
                if (userResults) {
                    returnData.nachname = userResults[0].nachname;
                    returnData.vorname = userResults[0].vorname;
                    conn.query(
                        "SELECT * FROM ?? WHERE user_id = ?",
                        [userType, userId],
                        function (typeError, typeResults, typeFields) {
                            conn.release();
                            if (typeError) {
                                callback(typeError, null);
                            }
                            if (typeResults) {
                                switch (userType) {
                                case "casemodder":
                                    returnData.suchstatus = typeResults[0].suchstatus;
                                    returnData.wohnort = typeResults[0].wohnort;
                                    returnData.beschreibung = typeResults[0].beschreibung;
                                    break;
                                case "sponsor":
                                    returnData.firma = typeResults[0].firma;
                                    returnData.beschreibung = typeResults[0].beschreibung;
                                    break;
                                default:
                                    break;
                                }
                                callback(null, returnData);
                            }
                        }
                    );
                }
            }
        );
    });
};


/**
 * Callbackfunktion für das Prüfen von neuen Nachrichten
 * 
 * @callback checkForNewMessagesCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {int} count - Anzahl von ungelesenen Nachrichten
 */

/**
 * Sucht nach ungelesenen Nachrichten im Postfach des Benutzers
 * @param {int} userId - ID des Benutzers
 * @param {checkForNewMessagesCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.checkForNewMessages = function (userId, callback) {
    this.pool.getConnection(function (connError, conn) {
        if (connError) {
            callback(connError, null);
        }
        console.log("Connected with ID " + conn.threadId);
        conn.query(
            "SELECT COUNT(*) FROM nachricht WHERE empfanger_id = ? AND gelesen = 0",
            [userId],
            function (queryError, results, fields) {
                if (queryError) {
                    callback(queryError, null);
                    return;
                } else {
                    console.log(results);
                    callback(null, results);
                    return;
                }
            }
        );
    });
};


/**
 * Callbackfunktion für aktuelle Projekte
 * 
 * @callback getProjectsCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Ergebnis aus Abfrage
 */

/**
 * Holt seitengerecht jeweils 8 Projekte aus der Datenbank,
 * sortiert absteigend nach Erstellungsdatum
 * @param {int} page - Setnummer
 * @param {getProjectsCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.getProjectsOverviewData = function (userId, userType, callback) {
    console.log("[DBAM] getLatestProjects");
    this.pool.getConnection(function (connError, conn) {
        if (connError) {
            callback(connError, null);
            return;
        }
        console.log("Connected with ID " + conn.threadId);
        // SQL für Sponsor-Abfragen zu Gunsten von JSLint bereits hier eingebungen.
        var resObj = {
                latestProjects: null
            },
            casemodder1_substr = sponsorTeamSubquery("1"),
            casemodder2_substr = sponsorTeamSubquery("2"),
            casemodder3_substr = sponsorTeamSubquery("3"),
            latestProjectsSQL = "SELECT * FROM project WHERE casemodder_id NOT IN (" + casemodder1_substr + ", " + casemodder2_substr + ", " + casemodder3_substr + ") ORDER BY erstellt_am DESC",
            teamProjectsSQL = "SELECT * FROM projekt WHERE casemodder_id IN (" + casemodder1_substr + ", " + casemodder2_substr + ", " + casemodder3_substr + ")";
        if (userType === "casemodder") {
            conn.query(
                "SELECT * FROM projekt WHERE casemodder_id != ? ORDER BY erstellt_am DESC",
                [userId],
                function (latestError, latestResults, latestFields) {
                    if (latestError) {
                        conn.release();
                        callback(latestError, null);
                        return;
                    }
                    resObj.latestProjects = latestResults;
                }
            );
            conn.query(
                "SELECT * FROM projekt WHERE casemodder_id = ?",
                [userId],
                function (ownedError, ownedResults, ownedFields) {
                    conn.release();
                    if (ownedError) {
                        callback(ownedError, null);
                        return;
                    }
                    resObj.ownedProjects = ownedResults;
                    callback(null, resObj);
                    return;
                }
            );
        } else {
            conn.query(
                latestProjectsSQL,
                [userId, userId, userId, userId],
                function (latestError, latestResults, latestFields) {
                    console.log(conn.query.sql);
                    if (latestError) {
                        conn.release();
                        callback(latestError, null);
                        return;
                    }
                    resObj.latestProjects = latestResults;
                }
            );
            conn.query(
                teamProjectsSQL,
                [userId, userId, userId],
                function (teamError, teamResults, teamFields) {
                    console.log(conn.query.sql);
                    conn.release();
                    if (teamError) {
                        callback(teamError, null);
                        return;
                    }
                    resObj.teamProjects = teamResults;
                    callback(null, resObj);
                    return;
                }
            );
        }
    });
};


/**
 * Callbackfunktion für Nachrichtenübersicht
 * 
 * @callback messagesOverviewCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Ergebnis aus Abfrage
 */

/**
 * Ruft alle Nachrichten ab, bei denen der Benutzer der Empfänger ist
 * @param {int} userId - Die ID des Benutzers
 * @param {messagesOverviewCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.getMessagesOverviewData = function (userId, callback) {
    console.log('[DBAM] getMessages');
    this.pool.getConnection(function (connError, conn) {
        if (connError) {
            callback(connError, null);
            return;
        }
        console.log('Connected with ID ' + conn.threadId);
        conn.query('SELECT n.id as n_id, n.zeitstempel, n.ungelesen, b.id as b_id, b.vorname, b.nachname FROM nachricht n JOIN benutzer b ON n.absender_id = b.id WHERE empfanger_id = ? ORDER BY n.zeitstempel DESC', [userId], function (error, results, fields) {
            conn.release();
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, JSON.parse(JSON.stringify(results)));
            return;
        });
    });
};


/**
 * Callbackfunktion für Zählung von Projekten und Updates
 * 
 * @callback countProjectsCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Ergebnis aus Abfrage
 */

/**
 * Zählt die Projekte und Projektupdates eines Benutzers
 * @param {int} userId - Die ID des Benutzers
 * @param {countProjectsCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.countUserProjects = function (userId, callback) {
    console.log("[DBAM] countUserProjects");
    var resObj = {
        projects: 0,
        projectUpvotes: 0,
        projectUpdates: 0,
        projectUpdateUpvotes: 0
    };
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError, null);
            return;
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        
        // Alle Projekte des Casemodders
        conn.query('SELECT * FROM projekt WHERE casemodder_id = ?', [userId], function (projectsError, projectsResults, projectsFields) {
            // Fehler abfangen
            if (projectsError) {
                conn.release();
                callback(projectsError, null);
                return;
            }
            // Gibt es Projekte vom Casemodder?
            if (projectsResults.length > 0) {
                
                var i = 0,
                    projectsCount = projectsResults.length,
                    projectUpvoteCountSQL = "SELECT COUNT(*) as count FROM projekt_upvote WHERE projekt_id IN (",
                    projectUpdatesSQL = "SELECT * FROM projektupdate WHERE projekt_id IN (";
                
                // Anzahl Projekte setzen
                resObj.projects = projectsCount;
                
                // SQL-Sctring konstruieren
                for (i, projectsCount; i < projectsCount; i += 1) {
                    projectUpvoteCountSQL += projectsResults[i].id.toString() + (i === projectsCount - 1 ? "" : ", ");
                    projectUpdatesSQL += projectsResults[i].id.toString() + (i === projectsCount - 1 ? "" : ", ");
                }
                projectUpvoteCountSQL += ")";
                projectUpdatesSQL += ")";
                
                // Alle Upvotes für die Projekte des Casemodders
                conn.query(projectUpvoteCountSQL, function (pUpvoteCountError, pUpvoteCountResults, pUpvoteCountFields) {
                    // Fehler abfangen
                    if (pUpvoteCountError) {
                        callback(pUpvoteCountError, null);
                        return;
                    }
                    // Gibt es Upvotes für die Projekte?
                    if (pUpvoteCountResults) {
                        resObj.projectUpvotes = pUpvoteCountResults[0].count;
                    }
                });
                
                // Alle Projektupdates der Projekte des Casemodders
                conn.query(projectUpdatesSQL, function (projectUpdatesError, projectUpdatesResults, projectUpdatesFields) {
                    // Fehler abfangen
                    if (projectUpdatesError) {
                        conn.release();
                        callback(projectUpdatesError, null);
                        return;
                    }
                
                    // Gibt es Projektupdates zu den Projekten?
                    if (projectUpdatesResults.length > 0) {
                        
                        resObj.projectUpdates = projectUpdatesResults.length;
                        
                        var j = 0,
                            puLen = projectUpdatesResults.length,
                            projectUpdatesUpvoteCountSQL = "SELECT COUNT(*) as count FROM projektupdate_upvote WHERE projektupdate_id IN (";
                        for (j, puLen; j < puLen; j += 1) {
                            projectUpdatesUpvoteCountSQL += projectUpdatesResults[j].id.toString() + (j === puLen - 1 ? "" : ", ");
                        }
                        projectUpdatesUpvoteCountSQL += ")";
                        
                        // Alle Upvotes für die Projektupdates der Projekte des Casemodders
                        conn.query(projectUpdatesUpvoteCountSQL, function (puUpvoteError, puUpvoteResults, puUpvoteFields) {
                            // Letzte Abfrage
                            conn.release();
                            
                            // Fehler abfangen
                            if (puUpvoteError) {
                                callback(puUpvoteError, null);
                                return;
                            }
                            
                            resObj.projectUpdateUpvotes = puUpvoteResults[0].count;
                            callback(null, resObj);
                            return;
                        });
                    } else {
                        callback(null, resObj);
                        return;
                    }
                
                });
            } else {
                conn.release();
                callback(null, resObj);
                return;
            }
        });
    });
};


/**
 * Callbackfunktion für Zählung von Benutzerkommentaren
 * 
 * @callback countCommentsCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {int} count - Ergebnis aus Abfrage
 */

/**
 * Zählt die Kommentare eines Benutzers
 * @param {int} userId - Die ID des Benutzers
 * @param {countCommentsCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 * @todo <strong>Implementieren</strong>
 */
exports.countUserComments = function (userId, callback) {
    var resObj = {
        comments: 0,
        commentUpvotes: 0
    };
    console.log("[DBAM] countUserComments");
    this.pool.getConnection(function (connectionError, conn) {
        if (connectionError) {
            callback(connectionError, null);
            return;
        }
        console.log("[DBAM] Connected with ID " + conn.threadId);
        conn.query('SELECT * FROM kommentar WHERE benutzer_id = ?', [userId], function (selectError, results, fields) {
            if (selectError) {
                conn.release();
                callback(selectError, null);
                return;
            }
            if (results.length > 0) {
                resObj.comments = results.length;
                var values = [],
                    i = 0,
                    len = results.length;
                for (i, len; i < len; i += 1) {
                    values[i] = results[i].id;
                }
                
                conn.query('SELECT COUNT(*) FROM kommentar_upvote WHERE kommentar_id IN ?', [conn.escape(values)], function (upvoteError, upvoteResults, upvoteFields) {
                    conn.release();
                    if (upvoteError) {
                        callback(upvoteError, null);
                        return;
                    }
                    if (upvoteResults) {
                        resObj.commentUpvotes = upvoteResults[0];
                    }
                    callback(null, resObj);
                    return;
                });
            } else {
                conn.release();
                callback(null, resObj);
                return;
            }
        });
    });
};

module.exports = exports;