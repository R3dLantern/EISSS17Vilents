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

var mysql       = require('mysql');
var fs          = require('fs');
var fileManager = require('./filemanager.js');
var pool        = null;


/** @todo für Produktivumgebung entfernen! */
console.log("[DBAM] DBAM module loaded.");

/**
 * Callback-Funktion für Abfragen ohne Rückgaben
 * @callback noReturnCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 */

/**
 * Callback-Funktion für SELECT-Abfragen
 * @callback selectCallback
 * @param {object} error - Fehler-Objekt, falls ein Fehler aufgetreten ist
 * @param {object} results - Ergebnisse aus Abfrage
 */



/**
 * Entnimmt der im System hinterlegten Konfigurationsdatei die Zugangsdaten für die Datenbank
 * @returns {object} JSON-Objekt mit Login-Credentials für die Datenbank
 */
function getCredentialsFromJson() {
  var content = fs.readFileSync('./util/config/dbam.json');
  return JSON.parse(content);
}

/**
 * Hilfsfunktion zur Erstellung von inneren Queries bei der Projektabfrage
 * für Sponsoren
 * @param   {string} index Teampositionsnummer
 * @returns {string} das fertige Subquery
 */
function sponsorTeamSubquery(index) {
  return "(SELECT casemodder" + index + "_id FROM team WHERE sponsor_id = ?)";
};

/**
 * Holt Kommentare für ein Spezifisches Element.
 * @param {object}         conn      Verbindungsobjekt
 * @param {number}         id        Projekt-ID
 * @param {boolean}        isProject Flag für Elementtyp
 * @param {selectCallback} callback  Callbackfunktion
 */
function getComments(conn, id, isProject, callback) {
  var table = isProject ? "projekt_kommentar" : "projektupdate_kommentar",
      countSql = "(SELECT COUNT(*) FROM kommentar_upvote ku WHERE ku.kommentar_id = k.id) AS upvoteCount",
      joinSql = "JOIN benutzer b ON b.id = k.benutzer_id ",
      sql = "SELECT b.vorname, b.nachname, k.*, " + countSql + " FROM kommentar k "
      + joinSql + "JOIN ?? rk ON k.id = rk.kommentar_id WHERE rk.projekt_id = ?";
  conn.query(
    sql,
    [table, id],
    function (error, results, fields) {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, JSON.parse(JSON.stringify(results)));
      return;
    }
  );
}

/**
 * Setzt eine Nachricht in der Datenbank als gelesen
 * @param {object} conn     Verbindungsobjekt
 * @param {number} mId      Nachricht-ID
 * @param {insertCallback} callback Callbackfunktion
 */
function setMessageAsRead(conn, mId, callback) {
  conn.query(
    'UPDATE nachricht SET ungelesen = 0 WHERE id = ?',
    [mId],
    function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      } else {
        callback(null);
      }
    }
  );
}

/**
 * Löscht ein Element aus einer Tabelle
 * @param {object}         conn     Verbindungsobjekt
 * @param {string}         table    Tabelle
 * @param {string}         idRow    Name der Primärschlüssel-Spalte
 * @param {number}         id       Element-ID
 * @param {insertCallback} callback Callbackfunktion
 */
function deleteElement(conn, table, idRow, id, callback) {
  conn.query(
    'DELETE FROM ?? WHERE ?? = ?',
    [table, idRow, id],
    function (error, results, fields) {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
      return;
    }
  );  
}

//## EXPORTS

/**
 * @function
 * @name DBAM:Exports:initializeConnection
 * @desc Erstellt eine Verbindung zum Datenbankserver.
 * Wird einmalig bei Ausführung der Serverlogik ausgeführt.
 */
exports.initializeConnection = function initializeConnection() {
  this.pool = mysql.createPool(getCredentialsFromJson());
};

/**
 * @function
 * @name DBAM:Exports:trySignUp
 * @desc Versucht, einen User in der Datenbank anzulegen. Bei Erfolg, wird der Typ des Users in der Datenbank bestimmt.
 * @param {object} newUser - Ein newUser-Objekt, bestehend aus den Werten email, type, password und dateOfBirth
 * @param {insertCallback} callback - Callbackfunktion zum Verarbeiten der Return-Wertes
 * @throws Fehler bei MySQL
 */
exports.trySignup = function trySignup(newUser, callback) {
  this.pool.getConnection(function (connectionError, conn) {
    if (connectionError) {
      callback(connectionError);
      return;
    }  
    conn.beginTransaction(function (transactionError) {
      if (transactionError) {
        callback(transactionError);
        return;
      }
      conn.query({
        sql: "INSERT INTO benutzer (email, passwort, geburtsdatum) VALUES(?, ?, ?)",
        values: [newUser.email, newUser.password, newUser.dateOfBirth]
      }, function (error, results, fields) {
        if (error) {
          return conn.rollback(function () {
            conn.release();
            callback(error);
            return;
          });
        }
        conn.query({
          sql: "INSERT INTO ?? (user_id) VALUES (?)",
          values: [newUser.type, results.insertId]
        }, function (typeError, typeResults, typeFields) {
          if (typeError) {
            return conn.rollback(function () {
              conn.release();
              callback(typeError);
              return;
            });
          }
          conn.commit(function (commitError) {
            conn.release();
            if (commitError) {
              return conn.rollback(function () {
                callback(commitError);
                return;
              });
            }             
            if (newUser.type === "sponsor" && newUser.accreditFile) {
              fileManager.handleAccreditFileUpload(
                newUser.email,
                results.insertId,
                newUser.accreditFile,
                function (fileUploadError) {
                  if (fileUploadError) {
                    callback(fileUploadError);
                    return;
                  } else {
                    callback(null);
                    return;
                  }
                }
              );
            }
          });
        });
      });
    });
  });
};

/**
 * Fügt der Datenbank Referenzen zu einer Datei hinzu.
 * @param   {object}   options  Optionen-Objekt. Enthält eine Relationsreferenz, den Dateipfad und den Dateityp.
 * @param   {insertCallback} callback Callbackfunktion
 */
exports.insertFile = function insertFile(options, callback) {
    
  var invalidOptions = (
      options.relation === null
      || options.path === null
      || options.type === null
  );
  if (invalidOptions) {
    callback(new Error("[DBAM] Invalid options object"));
    return;
  }
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError);
        return;
      }
      conn.beginTransaction(
        function (transactionError) {
          if (transactionError) {
            conn.release();
            callback(transactionError);
            return;
          }
          conn.query({
            sql: "INSERT INTO datei (pfad, dateityp) VALUES(?, ?);",
            values: [options.path, options.type]
            }, function (error, results, fields) {
              if (error) {
                return conn.rollback(
                  function () {
                    conn.release();
                    callback(error);
                    return;
                  }
                );
              }
              var invalidRelationOptions = (
                  options.relation.user
                  || options.relation.project
                  || options.relation.projectupdate
              ),
                  values = [];
              if (!validRelationOptions) {
                return conn.rollback(
                  function () {
                    conn.release();
                    callback(new Error('Invalid Relation Option'));
                    return;
                  }
                );
              }                
              if (options.relation.user) {
                values = [
                  "datei_benutzer",
                  "benutzer_id",
                  options.relation.user,
                  results.insertId
                ];
              } else if (options.relation.project) {
                values = [
                  "datei_projekt",
                  "projekt_id",
                  options.relation.project,
                  results.insertId
                ];
              } else if (options.relation.projectupdate) {
                values = [
                  "datei_projektupdate",
                  "projektupdate_id",
                  options.relation.projectupdate,
                  results.insertId
                ];
              }            
              conn.query({
                sql: "INSERT INTO ?? (??, datei_id) VALUES (?, ?)",
                values: values
                }, function (relationError, relationResults, relationFields) {
                  if (relationError) {
                    return conn.rollback(
                      function () {
                        conn.release();
                        callback(relationError);
                        return;
                      }
                    );
                  }
                  conn.commit(
                    function (commitError) {
                      conn.release();
                      if (commitError) {
                        return conn.rollback(
                          function () {
                            callback(commitError);
                            return;
                          }
                        );
                      } else {
                        callback(null);
                        return;
                      }
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

exports.deleteUserAccount = function deleteUserAccount(userId, callback) {
    
};

/**
 * Sucht in der Datenbank einen Benutzer nach Email-Adresse.
 * @param {string} email - Email-Adresse des Benutzers
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.findUserByEmail = function findUserByEmail(email, callback) {
  this.pool.getConnection(
    function (connectionError, conn) {
      if (connectionError) {
        callback(connectionError, null);
      }

      conn.query(
        'SELECT * FROM benutzer WHERE email = ? LIMIT 1',
        [email],
        function (selectError, results, fields) {
          if (selectError) {
            conn.release();
            callback(selectError, null);
            return;
          }
          if (results.length === 1) {
            conn.query(
              'SELECT * FROM casemodder WHERE user_id = ? LIMIT 1',
              [results[0].id],
              function (typeSelectError, isCasemodderResults, typeFields) {
                conn.release();
                if (typeSelectError) {
                  callback(typeSelectError, null);
                  return;
                }
                results[0].isCasemodder = isCasemodderResults.length > 0 ? true : false;
                callback(null, JSON.stringify(results[0]));
                return;
              }
            );
          } else {
            callback(null, null);
            return;
          }
        }
      );
    }
  );
};

/**
 * Sucht nach ungelesenen Nachrichten im Postfach des Benutzers
 * @param {int} userId - ID des Benutzers
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.checkForNewMessages = function checkForNewMessages(userId, callback) {
  this.pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null);
    }
    console.log("[DBAM] checkNewMessages: Connected with ID " + conn.threadId);
    conn.query(
      'SELECT COUNT(*) AS newMessages FROM nachricht WHERE empfanger_id = ? AND ungelesen = 1',
      [userId],
      function (err, row, fields) {
        if (err) {
          callback(queryError, null);
          return;
        } else {
          callback(null, row[0].newMessages);
          return;
        }
      }
    );
  });
};

/**
 * Aktiviert den Suchstatus eines Casemodders
 * @param {int} userId   Benutzer-ID des Casemodders
 * @param {insertCallback} callback Callbackfunktion
 */
exports.activateSeekerStatus = function activateSeekerStatus(userId, callback) {
  this.pool.getConnection(
    function (connError, conn) {
      if (error) {
        callback(error);
      }
      conn.query(
        'UPDATE casemodder SET suchstatus = 1 WHERE user_id = ?',
        [userId],
        function (error, results, fields) {
          if (error) {
            callback(error);
            return;
          }
          callback(null);    
        }
      );
    }
  );
};

/**
 * Ruft die Profildaten eines Benutzers ab
 * @param {int} userId - ID des Benutzers
 * @param {string} userType - Benutzertyp
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.getProfileData = function getProfileData(userId, userType, callback) {
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError, null);
        return;
      }
      var isCasemodder = (userType === "casemodder"),
          returnData = isCasemodder
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
          if (userResults.length > 0) {
            returnData.nachname = userResults[0].nachname;
            returnData.vorname = userResults[0].vorname;
            conn.query(
              "SELECT * FROM ?? WHERE user_id = ?",
              [userType, userId],
              function (typeError, typeResults, typeFields) {
                conn.release();
                if (typeError) {
                  callback(typeError, null);
                  return;
                }
                if (typeResults.length > 0) {
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
                  return;
                }
              }
            );
          }
        }
      );
    }
  );
};

/**
 * Holt "Header-Informationen" über die Projekte eines Benutzers (ID und Titel)
 * @param {int} userId   BenutzerID
 * @param {selectCallback} callback Callbackfunktion
 */
exports.getProjectsForUser = function getProjectsForUser(userId, callback) {
  this.pool.getConnection(function (connError, conn) {
    if (connError) {
      callback(connError, null);
      return;
    }
    conn.query(
      'SELECT id, titel FROM projekt WHERE casemodder_id = ? ORDER BY erstellt_am DESC',
      [userId],
      function (error, results, fields) {
        conn.release();
        if (error) {
          callback(error, null);
          return;
        }
        results = JSON.parse(JSON.stringify(results));
        callback(null, results);
        return;
      }
    );
  });
};

/**
 * Ruft alle Nachrichten ab, bei denen der Benutzer der Empfänger ist
 * @param {int} userId - Die ID des Benutzers
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.getMessagesOverviewData = function (userId, callback) {
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError, null);
        return;
      }
      conn.query(
        'SELECT n.id as n_id, n.zeitstempel, n.ungelesen, b.id as b_id, b.vorname, 
        + 'b.nachname FROM nachricht n JOIN benutzer b ON n.absender_id = b.id '
        + 'WHERE empfanger_id = ? ORDER BY n.zeitstempel DESC',
        [userId],
        function (error, results, fields) {
          conn.release();
          if (error) {
            callback(error, null);
            return;
          }
          var data = {
            messages: JSON.parse(JSON.stringify(results))
          };
          console.log(data);
          callback(null, data);
          return;
        }
      );
    }
  );
};

/**
 * Erstellt eine neue Nachricht in der Datenbank
 * @param {object} messageObject Das Nachrichtenobjekt
 * @param {insertCallback} callback Callbackfunktion
 */
exports.createNewMessage = function createNewMessage(messageObject, callback) {
  var invalidMessageObject = (
    messageObject.senderId === null 
    || messageObject.reveiverId === null
    || messageObject.content === null
  );
  if (invalidMessageObject) {
    callback(new Error("Invalid Message Object"));
    return;
  }
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError);
        return;
      }
      conn.query(
        "INSERT INTO nachricht (absender_id, empfanger_id, inhalt) VALUES (?, ?, ?)",
        [messageObject.senderId, messageObject.receiverId, messageObject.content],
        function (error, results, fields) {
          conn.release();
          if (error) {
            callback(error);
            return
          } else {
            callback(null);
          }
        }
      );
    }
  );
};

/**
 * Holt den Inhalt einer Nachricht
 * @param {int} mId - Nachricht-ID
 * @param {selectCallback} callback - Callbackfunktion
 */
exports.getMessageContent = function getMessageContent(mId, callback) {
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError, null);
        return;
      }
      conn.query(
        'SELECT inhalt, ungelesen FROM nachricht WHERE id = ?',
        [mId],
        function (error, results, fields) {
          if (error) {
            callback(error, null);
            return;
          }
          var resObj = {
              ungelesen: results[0].ungelesen,
              inhalt: results[0].inhalt
          }
          // Beim Anzeigen der Nachricht, wird diese automatisch auf gelesen gesetzt
          if (resObj.ungelesen === 1) {
            setMessageAsRead(mId, conn, function (error) {
              conn.release();
              if (error) {
                callback(error, null);
                return;
              } else {
                delete resObj.ungelesen;
                callback(null, resObj);
                return;
              }
            });
          } else {
            conn.release();
            delete resObj.ungelesen;
            callback(null, resObj);
            return;
          }
        }
      );
    }
  );    
};

/**
 * Setzt eine Nachricht als Gelesen
 * @param {number} mId      Nachricht-ID
 * @param {insertCallback} callback Callbackfunktion
 */
exports.setMessageAsRead = function (mId, callback) {
  this.pool.getConnection(function (error, conn) {
    if (error) {
      callback(error);
      return;
    }
    setMessageAsRead(mId, conn, function (error) {
      conn.release();
      if (error) {
        callback(error);
        return;
      } else {
        callback(null);
        return;
      }
    });
  });
};

/**
 * Löscht eine Nachricht aus der Datenbank
 * @param {number} mId      Nachricht-ID
 * @param {insertCallback} callback Callbackfunktion
 */
exports.deleteMessage = function deleteMessage(mId, callback) {
  this.pool.getConnection(
    function (error, conn) {
      if (error) {
        callback(error);
        return;
      }
      deleteElement(
        conn,
        "nachricht",
        "id",
        mId,
        function (error) {
          conn.release();
          if (error) {
            callback(error);
          } else {
            callback(null);
          }
          return;
        }
      );
    }
  );
};

/**
 * Holt seitengerecht jeweils 8 Projekte aus der Datenbank,
 * sortiert absteigend nach Erstellungsdatum
 * @param {int} page - Setnummer
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.getProjectsOverviewData = function getProjectsOverviewData(userId, isCasemodder, callback) {
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError, null);
        return;
      }
      
      // SQL für Sponsor-Abfragen zu Gunsten von JSLint bereits hier eingebungen.
      var resObj = {
            latestProjects: null
          },
          casemodder1_substr = sponsorTeamSubquery("1"),
          casemodder2_substr = sponsorTeamSubquery("2"),
          casemodder3_substr = sponsorTeamSubquery("3"),
          latestProjectsSQL = "SELECT * FROM projekt WHERE casemodder_id NOT IN (" + casemodder1_substr + ", " + casemodder2_substr + ", " + casemodder3_substr + ") ORDER BY erstellt_am DESC",
          teamProjectsSQL = "SELECT * FROM projekt WHERE casemodder_id IN (" + casemodder1_substr + ", " + casemodder2_substr + ", " + casemodder3_substr + ")";
      if (isCasemodder) {
        conn.query(
          "SELECT * FROM projekt WHERE casemodder_id != ? ORDER BY erstellt_am DESC",
          [userId],
          function (latestError, latestResults, latestFields) {
            if (latestError) {
              conn.release();
              callback(latestError, null);
              return;
            }
            resObj.latestProjects = JSON.parse(JSON.stringify(latestResults));
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
            resObj.ownedProjects = JSON.parse(JSON.stringify(ownedResults));
            callback(null, resObj);
            return;
          }
        );
      } else {
        conn.query(
          latestProjectsSQL,
          [userId, userId, userId],
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
          teamProjectsSQL,
          [userId, userId, userId],
          function (teamError, teamResults, teamFields) {
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
    }
  );
};

/**
 * Holt ein Projekt, seine Kommentare, Updates und alle dazugehörigen Upvotes.
 * @param {number} pId - ID des Projektes
 * @param {number} uId - ID des Session-Benutzers
 * @param {selectCallback} callback - Callbackfunktion
 */
exports.getProject = function (pId, uId, callback) {
  this.pool.getConnection(function (connError, conn) {
    if (connError) {
      callback(connError, null);
    }
    var countSql = '(SELECT COUNT(*) FROM projekt_upvote pu WHERE pu.projekt_id'
        + ' = ?) AS upvotes',
        sql = 'SELECT p.*, b.vorname, b.nachname, ' + countSql + ' FROM projekt p JOIN benutzer b ON p.casemodder_id = b.id WHERE p.id = ? LIMIT 1';
        
    conn.query(sql, [pId, pId], function (error, results, fields) {
      if (error) {
        callback(error, null);
        return;
      }
      if (results.length === 1) {
        var result = JSON.parse(JSON.stringify(results[0]));
        if (result.casemodder_id === uId) {
          result.userOwnsProject = true;
        } else {
          result.userOwnsProject = false;
        }
        conn.query(
          'SELECT id FROM kommentar k JOIN projekt_kommentar pk on k.id = pk.kommentar_id WHERE pk.projekt_id = ?',
          [pId],
          function (commentsError, commentsResults, commentsFields) {
                
            if (commentsError) {
              callback(commentsError, null);
              return;
            }
            commentsResults = JSON.parse(JSON.stringify(commentsResults));

            // Get project updates
            conn.query(
              'SELECT * FROM projektupdate WHERE projekt_id = ?',
              [pId],
              function (puError, puResults, puFields) {

                if (puError) {
                  conn.release();
                  callback(puError, null);
                  return;
                }

                result.updates = JSON.parse(JSON.stringify(puResults));
                console.log(result);
                callback(null, result);
              }
            );
          }
        );
      } else {
        callback(null, null);
        return;
      }
    });
  });
};







/**
 * Holt alle Casemodder-Benutzer mit aktiviertem Suchstatus
 * @param {selectCallback} callback Callbackfunktion
 */
exports.getSponsoringApplicants = function (callback) {
  this.pool.getConnection(
    function (connError, conn) {
      if (connError) {
        callback(connError, null);
        return;
      } 
      conn.query(
        "SELECT b.id, b.vorname, b.nachname FROM benutzer b JOIN casemodder c '
        + 'ON b.id = c.user_id WHERE c.suchstatus = 1',
        function (error, results, fields) {
          conn.release();
          if (error) {
            callback(error, null);
            return;
          }
          var resultsObj = JSON.parse(JSON.stringify(results));
          callback(null, resultsObj);
          return;
        }
      );
    }
  );
};

/**
 * Zählt die Projekte und Projektupdates eines Benutzers
 * @param {int} userId - Die ID des Benutzers
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.countUserProjects = function countUserProjects(userId, callback) {
  var resObj = {
      projects: 0,
      projectUpvotes: 0,
      projectUpdates: 0,
      projectUpdateUpvotes: 0
  };
  this.pool.getConnection(
    function (error, conn) {
      if (error) {
        callback(connectionError, null);
        return;
      }
      conn.query(
        'SELECT * FROM projekt WHERE casemodder_id = ?',
        [userId],
        function (projectsError, projectsResults, projectsFields) {
          if (projectsError) {
            conn.release();
            callback(projectsError, null);
            return;
          }
          if (projectsResults.length > 0) {  
            var i = 0,
                projectsCount = projectsResults.length,
                projectUpvoteCountSQL = 'SELECT COUNT(*) as count FROM '
                + 'projekt_upvote WHERE projekt_id IN (';
            resObj.projects = projectsCount;
            for (i, projectsCount; i < projectsCount; i += 1) {
              projectUpvoteCountSQL += projectsResults[i].id.toString()
              + (i === projectsCount - 1 ? "" : ", ");
            }
            projectUpvoteCountSQL += ")";  
            conn.query(
              projectUpvoteCountSQL,
              function (pucError, pucResults, pucFields) {
                conn.release();
                if (pucError) {
                  callback(pucError, null);
                  return;
                }
                if (pucResults.length > 0) {
                  resObj.projectUpvotes = pucResults[0].count;
                }
                exports.countUserProjectUpdates(
                  resObj,
                  projectsResults,
                  function (error, resultObject) {
                    if (error) {
                      callback(error, null);
                      return;
                    }
                    callback(null, resultObject);
                  }
                );
              }
            );   
          } else {
            conn.release();
            callback(null, resObj);
            return;
          }
        }
      );
    }
  );
};

/**
 * Zählt für ein Projekt die Projektupdates und alle dazugehörigen Upvotes
 * @param {object}   resultObject  Übergebenes Objekt mit Gesamtergebnissen
 * @param {object[]} projectsArray Array mit Projekt-Objekten
 * @param {selectCallback} callback Callbackfunktion
 */
exports.countUserProjectUpdates = function countUserProjectUpdates(resultObject, projectsArray, callback) {
  this.pool.getConnection(
    function (error, conn) {
      if (error) {
        callback(error, null);
      }  
      if (projectsArray.length > 0) {
        var i = 0,
            projectsCount = projectsArray.length,
            projectUpdatesSQL = "SELECT * FROM projektupdate WHERE projekt_id IN (";
        for (i, projectsCount; i < projectsCount; i += 1) {
          projectUpdatesSQL += projectsArray[i].id.toString()
          + (i === projectsCount - 1 ? "" : ", ");
        }
        projectUpdatesSQL += ")";    
        conn.query(
          projectUpdatesSQL,
          function (puError, puResults, puFields) {
            if (puError) {
              conn.release();
              callback(puError, null);
              return;
            }
            if (puResults.length > 0) {    
              resultObject.projectUpdates = puResults.length;        
              var j = 0,
                  puLen = puResults.length,
                  puucSQL = 'SELECT COUNT(*) as count FROM projektupdate_upvote'
                  + 'WHERE projektupdate_id IN (';
              for (j, puLen; j < puLen; j += 1) {
                puucSQL += puResults[j].id.toString()
                + (j === puLen - 1 ? "" : ", ");
              }
              puucSQL += ")";
              conn.query(
                puucSQL,
                function (puucError, puucResults, puucFields) {
                  conn.release();
                  if (puucError) {
                    callback(puucError, null);
                    return;
                  }            
                  resultObject.projectUpdateUpvotes = puucResults[0].count;
                  callback(null, resultObject);
                  return;
                }
              );
            } else {
              callback(null, resultObject);
              return;
            }    
          }
        );
      }
    }
  );
};


/**
 * Zählt die Kommentare eines Benutzers
 * @param {int} userId - Die ID des Benutzers
 * @param {selectCallback} callback - Callbackfunktion zum Verarbeiten der Rückgabewerte
 */
exports.countUserComments = function (userId, callback) {
  var resObj = {
      comments: 0,
      commentUpvotes: 0
  };
  this.pool.getConnection(
    function (connectionError, conn) {
      if (connectionError) {
        callback(connectionError, null);
        return;
      }
      conn.query(
        'SELECT * FROM kommentar WHERE benutzer_id = ?',
        [userId],
        function (selectError, results, fields) {
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
            conn.query(
              'SELECT COUNT(*) AS count FROM kommentar_upvote WHERE kommentar_id IN ?',
              [conn.escape(values)],
              function (upvoteError, upvoteResults, upvoteFields) {
                conn.release();
                if (upvoteError) {
                  callback(upvoteError, null);
                  return;
                }
                resObj.commentUpvotes = upvoteResults[0].count;
                callback(null, resObj);
                return;
              }
            );
          } else {
            conn.release();
            callback(null, resObj);
            return;
          }
        }
      );
    }
  );
};

module.exports = exports;