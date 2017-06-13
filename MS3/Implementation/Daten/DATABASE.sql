-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.1.19-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportiere Datenbank Struktur für eis_ss2017
DROP DATABASE IF EXISTS `eis_ss2017`;
CREATE DATABASE IF NOT EXISTS `eis_ss2017` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `eis_ss2017`;

-- Exportiere Struktur von Tabelle eis_ss2017.benutzer
DROP TABLE IF EXISTS `benutzer`;
CREATE TABLE IF NOT EXISTS `benutzer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Künstlicher Primärschlüssel',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'E-mail-Adresse, pro E-Mail nur ein Benutzer-Account',
  `passwort` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Passwort, wird als MD5-Hash gespeichert',
  `nachname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Nachname des Benutzers',
  `vorname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Vorname des Benutzers',
  `geburtsdatum` date DEFAULT NULL COMMENT 'Geburtstdatum des Benutzers',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Übergeordnete Tabelle für Benutzer des Systems';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.casemodder
DROP TABLE IF EXISTS `casemodder`;
CREATE TABLE IF NOT EXISTS `casemodder` (
  `user_id` int(11) NOT NULL COMMENT 'zugehörige User-ID',
  `suchstatus` tinyint(1) DEFAULT '0' COMMENT 'Sponsorsuchstatus, wenn gesetzt, dann für Sponsoren sichtbar',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `casemodder_user_id` FOREIGN KEY (`user_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.kommentar
DROP TABLE IF EXISTS `kommentar`;
CREATE TABLE IF NOT EXISTS `kommentar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `benutzer_id` int(11) DEFAULT NULL COMMENT 'Verbleibt, wenn der Benutzer gelöscht wird',
  `zeitstempel` datetime DEFAULT NULL,
  `inhalt` blob,
  PRIMARY KEY (`id`),
  KEY `comment_user_id` (`benutzer_id`),
  CONSTRAINT `comment_user_id` FOREIGN KEY (`benutzer_id`) REFERENCES `benutzer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Kommentare zu Projekten und Projektupdates';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.kommentar_upvote
DROP TABLE IF EXISTS `kommentar_upvote`;
CREATE TABLE IF NOT EXISTS `kommentar_upvote` (
  `kommentar_id` int(11) NOT NULL,
  `benutzer_id` int(11) NOT NULL,
  PRIMARY KEY (`kommentar_id`,`benutzer_id`),
  KEY `relation_cu_user_id` (`benutzer_id`),
  CONSTRAINT `relation_cu_comment_id` FOREIGN KEY (`kommentar_id`) REFERENCES `kommentar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_cu_user_id` FOREIGN KEY (`benutzer_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Upvote-Relation von Kommentaren';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.nachricht
DROP TABLE IF EXISTS `nachricht`;
CREATE TABLE IF NOT EXISTS `nachricht` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `absender_id` int(11) DEFAULT NULL COMMENT 'Absender kann gelöscht werden',
  `empfanger_id` int(11) DEFAULT NULL COMMENT 'Löschung des Empfängers löscht automatisch Nachricht',
  `zeitstempel` datetime DEFAULT NULL,
  `inhalt` blob,
  PRIMARY KEY (`id`),
  KEY `sender_user_id` (`absender_id`),
  KEY `receiver_user_id` (`empfanger_id`),
  CONSTRAINT `receiver_user_id` FOREIGN KEY (`empfanger_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender_user_id` FOREIGN KEY (`absender_id`) REFERENCES `benutzer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Systeminterne Nachrichten zwischen Benutzern';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.projekt
DROP TABLE IF EXISTS `projekt`;
CREATE TABLE IF NOT EXISTS `projekt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `casemodder_id` int(11) NOT NULL COMMENT 'ID des Casemodders, der das Projekt anlegt',
  `titel` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Titel des Projektes',
  `inhalt` blob COMMENT 'Textueller Inhalt, Beschreibung des Projektes',
  `status` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '"Laufend"' COMMENT 'Status des Projektes',
  PRIMARY KEY (`id`),
  KEY `CASEMODDER_ID` (`casemodder_id`),
  CONSTRAINT `CASEMODDER_ID` FOREIGN KEY (`casemodder_id`) REFERENCES `casemodder` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Tabelle von Case Modding-Projekten im System';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.projektupdate
DROP TABLE IF EXISTS `projektupdate`;
CREATE TABLE IF NOT EXISTS `projektupdate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datum` date DEFAULT NULL,
  `inhalt` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Updates zu Projekten';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.projektupdate_kommentar
DROP TABLE IF EXISTS `projektupdate_kommentar`;
CREATE TABLE IF NOT EXISTS `projektupdate_kommentar` (
  `projektupdate_id` int(11) NOT NULL,
  `kommentar_id` int(11) NOT NULL,
  PRIMARY KEY (`projektupdate_id`,`kommentar_id`),
  KEY `relation_puc_comment_id` (`kommentar_id`),
  CONSTRAINT `relation_puc_comment_id` FOREIGN KEY (`kommentar_id`) REFERENCES `kommentar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_puc_projectupdate_id` FOREIGN KEY (`projektupdate_id`) REFERENCES `projektupdate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Relationstabelle für Kommentare unter Projektupdates';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.projektupdate_upvote
DROP TABLE IF EXISTS `projektupdate_upvote`;
CREATE TABLE IF NOT EXISTS `projektupdate_upvote` (
  `projektupdate_id` int(11) NOT NULL,
  `benutzer_id` int(11) NOT NULL,
  PRIMARY KEY (`projektupdate_id`,`benutzer_id`),
  KEY `relation_puu_user_id` (`benutzer_id`),
  CONSTRAINT `relation_puu_projectupdate_id` FOREIGN KEY (`projektupdate_id`) REFERENCES `projektupdate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_puu_user_id` FOREIGN KEY (`benutzer_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Relationstabelle für Upvotes von Projektupdates';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.projekt_kommentar
DROP TABLE IF EXISTS `projekt_kommentar`;
CREATE TABLE IF NOT EXISTS `projekt_kommentar` (
  `projekt_id` int(11) NOT NULL,
  `kommentar_id` int(11) NOT NULL,
  PRIMARY KEY (`projekt_id`,`kommentar_id`),
  KEY `relation_pc_comment_id` (`kommentar_id`),
  CONSTRAINT `relation_pc_comment_id` FOREIGN KEY (`kommentar_id`) REFERENCES `kommentar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_pc_project_id` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Relationstabelle für Kommentare und Projekte';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.projekt_upvote
DROP TABLE IF EXISTS `projekt_upvote`;
CREATE TABLE IF NOT EXISTS `projekt_upvote` (
  `projekt_id` int(11) NOT NULL,
  `benutzer_id` int(11) NOT NULL,
  PRIMARY KEY (`projekt_id`,`benutzer_id`),
  KEY `relation_pu_user_id` (`benutzer_id`),
  CONSTRAINT `relation_pu_project_id` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_pu_user_id` FOREIGN KEY (`benutzer_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Relationstabelle für Projektupvotes';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.sponsor
DROP TABLE IF EXISTS `sponsor`;
CREATE TABLE IF NOT EXISTS `sponsor` (
  `user_id` int(11) NOT NULL COMMENT 'ID des Benutzers',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `sponsor_user_id` FOREIGN KEY (`user_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sponsorenbenutzer';

-- Daten Export vom Benutzer nicht ausgewählt
-- Exportiere Struktur von Tabelle eis_ss2017.team
DROP TABLE IF EXISTS `team`;
CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sponsor_id` int(11) NOT NULL,
  `casemodder1_id` int(11) DEFAULT NULL,
  `casemodder2_id` int(11) DEFAULT NULL,
  `casemodder3_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_sponsor_id` (`sponsor_id`),
  KEY `team_casemodder1_id` (`casemodder1_id`),
  KEY `team_casemodder2_id` (`casemodder2_id`),
  KEY `team_casemodder3_id` (`casemodder3_id`),
  CONSTRAINT `team_casemodder1_id` FOREIGN KEY (`casemodder1_id`) REFERENCES `casemodder` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `team_casemodder2_id` FOREIGN KEY (`casemodder2_id`) REFERENCES `casemodder` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `team_casemodder3_id` FOREIGN KEY (`casemodder3_id`) REFERENCES `casemodder` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `team_sponsor_id` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsor` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Casemodder-Teams, von Sponsoren erstellt';

-- Daten Export vom Benutzer nicht ausgewählt
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
