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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Übergeordnete Tabelle für Benutzer des Systems';

-- Exportiere Daten aus Tabelle eis_ss2017.benutzer: ~18 rows (ungefähr)
DELETE FROM `benutzer`;
/*!40000 ALTER TABLE `benutzer` DISABLE KEYS */;
INSERT INTO `benutzer` (`id`, `email`, `passwort`, `nachname`, `vorname`, `geburtsdatum`) VALUES
	(1, 'max.mustermann@email.de', 'bde66d16995e8922fbd40b4e120de6ec89d320e0941d554ab15b3b0525899eef', 'Mustermann', 'Max', '1992-07-01'),
	(4, 'sponsor@sponsor.de', 'bde66d16995e8922fbd40b4e120de6ec89d320e0941d554ab15b3b0525899eef', NULL, NULL, '1990-06-29'),
	(5, 'sponsor2@sponsor.de', 'bde66d16995e8922fbd40b4e120de6ec89d320e0941d554ab15b3b0525899eef', NULL, NULL, '1990-07-04'),
	(6, 'name.vorname1@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name1', 'Vorname1', '1990-01-01'),
	(7, 'name.vorname2@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name2', 'Vorname2', '1990-01-01'),
	(8, 'name.vorname3@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name3', 'Vorname2', '1990-01-01'),
	(9, 'name.vorname4@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name4', 'Vorname4', '1990-01-01'),
	(10, 'name.vorname5@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name5', 'Vorname5', '1990-01-01'),
	(11, 'name.vorname6@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name6', 'Vorname6', '1990-01-01'),
	(12, 'name.vorname7@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name7', 'Vorname7', '1990-01-01'),
	(13, 'name.vorname8@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name8', 'Vorname8', '1990-01-01'),
	(14, 'name.vorname9@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name9', 'Vorname9', '1990-01-01'),
	(15, 'name.vorname10@email.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'Name10', 'Vorname10', '1990-01-01'),
	(16, 'sponsor1@firma.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'SponsorName1', 'SponsorVorname1', '1985-01-01'),
	(17, 'sponsor2@firma.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'SponsorName2', 'SponsorVorname2', '1985-01-01'),
	(18, 'sponsor3@firma.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'SponsorName3', 'SponsorVorname3', '1985-01-01'),
	(19, 'sponsor4@firma.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'SponsorName4', 'SponsorVorname4', '1985-01-01'),
	(20, 'sponsor5@firma.de', '33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2', 'SponsorName5', 'SponsorVorname5', '1985-01-01');
/*!40000 ALTER TABLE `benutzer` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.casemodder
DROP TABLE IF EXISTS `casemodder`;
CREATE TABLE IF NOT EXISTS `casemodder` (
  `user_id` int(11) NOT NULL COMMENT 'zugehörige User-ID',
  `suchstatus` tinyint(1) DEFAULT '0' COMMENT 'Sponsorsuchstatus, wenn gesetzt, dann für Sponsoren sichtbar',
  `wohnort` varchar(50) COLLATE utf8_unicode_ci DEFAULT 'Hier Wohnort einfügen' COMMENT 'Grobe Wohnangabe des Benutzers',
  `beschreibung` varchar(160) COLLATE utf8_unicode_ci DEFAULT 'Hier Beschreibung (max. 160 Zeichen) eingeben!' COMMENT 'Kurzbeschreibung des Benutzers',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `casemodder_user_id` FOREIGN KEY (`user_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Exportiere Daten aus Tabelle eis_ss2017.casemodder: ~11 rows (ungefähr)
DELETE FROM `casemodder`;
/*!40000 ALTER TABLE `casemodder` DISABLE KEYS */;
INSERT INTO `casemodder` (`user_id`, `suchstatus`, `wohnort`, `beschreibung`) VALUES
	(1, 0, NULL, 'Hier Beschreibung (max. 160 Zeichen) eingeben!'),
	(6, 1, 'Stadt1', 'Beschreibung1'),
	(7, 0, 'Stadt2', 'Beschreibung2'),
	(8, 0, 'Stadt3', 'Beschreibung3'),
	(9, 0, 'Stadt4', 'Beschreibung4'),
	(10, 0, 'Stadt5', 'Beschreibung5'),
	(11, 1, 'Stadt6', 'Beschreibung6'),
	(12, 1, 'Stadt7', 'Beschreibung7'),
	(13, 1, 'Stadt8', 'Beschreibung8'),
	(14, 1, 'Stadt9', 'Beschreibung9'),
	(15, 1, 'Stadt10', 'Beschreibung10');
/*!40000 ALTER TABLE `casemodder` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.datei
DROP TABLE IF EXISTS `datei`;
CREATE TABLE IF NOT EXISTS `datei` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Datei-ID',
  `pfad` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Absoluter Dateipfad',
  `dateityp` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Bild oder Dokument',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Tabelle über gespeicherte Dateien';

-- Exportiere Daten aus Tabelle eis_ss2017.datei: ~7 rows (ungefähr)
DELETE FROM `datei`;
/*!40000 ALTER TABLE `datei` DISABLE KEYS */;
INSERT INTO `datei` (`id`, `pfad`, `dateityp`) VALUES
	(1, '/doc/accredit_sponsorATsponsorDOTde.pdf', 'pdf'),
	(3, '/doc/accredit_sponsor2ATsponsorDOTde.pdf', 'pdf'),
	(4, '/doc/accredit_sponsor1ATfirmaDOTde.pdf', 'pdf'),
	(5, '/doc/accredit_sponsor2ATfirmaDOTde.pdf', 'pdf'),
	(6, '/doc/accredit_sponsor3ATfirmaDOTde.pdf', 'pdf'),
	(7, '/doc/accredit_sponsor4ATfirmaDOTde.pdf', 'pdf'),
	(8, '/doc/accredit_sponsor5ATfirmaDOTde.pdf', 'pdf');
/*!40000 ALTER TABLE `datei` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.datei_benutzer
DROP TABLE IF EXISTS `datei_benutzer`;
CREATE TABLE IF NOT EXISTS `datei_benutzer` (
  `benutzer_id` int(11) NOT NULL,
  `datei_id` int(11) NOT NULL,
  PRIMARY KEY (`benutzer_id`,`datei_id`),
  KEY `relation_uf_file_id` (`datei_id`),
  CONSTRAINT `relation_uf_file_id` FOREIGN KEY (`datei_id`) REFERENCES `datei` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_uf_user_id` FOREIGN KEY (`benutzer_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Modeliert die Zugehörigkeit von Dokumenten zu Benutzern.';

-- Exportiere Daten aus Tabelle eis_ss2017.datei_benutzer: ~7 rows (ungefähr)
DELETE FROM `datei_benutzer`;
/*!40000 ALTER TABLE `datei_benutzer` DISABLE KEYS */;
INSERT INTO `datei_benutzer` (`benutzer_id`, `datei_id`) VALUES
	(4, 1),
	(5, 3),
	(16, 4),
	(17, 5),
	(18, 6),
	(19, 7),
	(20, 8);
/*!40000 ALTER TABLE `datei_benutzer` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.datei_projekt
DROP TABLE IF EXISTS `datei_projekt`;
CREATE TABLE IF NOT EXISTS `datei_projekt` (
  `projekt_id` int(11) NOT NULL,
  `datei_id` int(11) NOT NULL,
  PRIMARY KEY (`projekt_id`,`datei_id`),
  KEY `relation_pf_file_id` (`datei_id`),
  CONSTRAINT `relation_pf_file_id` FOREIGN KEY (`datei_id`) REFERENCES `datei` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_pf_project_id` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Modelliert die Relation zwischen Dateien und Projekten';

-- Exportiere Daten aus Tabelle eis_ss2017.datei_projekt: ~0 rows (ungefähr)
DELETE FROM `datei_projekt`;
/*!40000 ALTER TABLE `datei_projekt` DISABLE KEYS */;
/*!40000 ALTER TABLE `datei_projekt` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.datei_projektupdate
DROP TABLE IF EXISTS `datei_projektupdate`;
CREATE TABLE IF NOT EXISTS `datei_projektupdate` (
  `projektupdate_id` int(11) NOT NULL,
  `datei_id` int(11) NOT NULL,
  PRIMARY KEY (`projektupdate_id`,`datei_id`),
  KEY `relation_puf_file_id` (`datei_id`),
  CONSTRAINT `relation_puf_file_id` FOREIGN KEY (`datei_id`) REFERENCES `datei` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_puf_projectupdate_id` FOREIGN KEY (`projektupdate_id`) REFERENCES `projektupdate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Modelliert die Relation zwischen Dateien und Projektupdates';

-- Exportiere Daten aus Tabelle eis_ss2017.datei_projektupdate: ~0 rows (ungefähr)
DELETE FROM `datei_projektupdate`;
/*!40000 ALTER TABLE `datei_projektupdate` DISABLE KEYS */;
/*!40000 ALTER TABLE `datei_projektupdate` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.kommentar
DROP TABLE IF EXISTS `kommentar`;
CREATE TABLE IF NOT EXISTS `kommentar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `benutzer_id` int(11) DEFAULT NULL COMMENT 'Verbleibt, wenn der Benutzer gelöscht wird',
  `zeitstempel` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inhalt` blob NOT NULL,
  `ungelesen` tinyint(11) NOT NULL DEFAULT '1' COMMENT 'Flag für Dashboard',
  PRIMARY KEY (`id`),
  KEY `comment_user_id` (`benutzer_id`),
  CONSTRAINT `comment_user_id` FOREIGN KEY (`benutzer_id`) REFERENCES `benutzer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Kommentare zu Projekten und Projektupdates';

-- Exportiere Daten aus Tabelle eis_ss2017.kommentar: ~0 rows (ungefähr)
DELETE FROM `kommentar`;
/*!40000 ALTER TABLE `kommentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `kommentar` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle eis_ss2017.kommentar_upvote: ~0 rows (ungefähr)
DELETE FROM `kommentar_upvote`;
/*!40000 ALTER TABLE `kommentar_upvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `kommentar_upvote` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.nachricht
DROP TABLE IF EXISTS `nachricht`;
CREATE TABLE IF NOT EXISTS `nachricht` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `absender_id` int(11) DEFAULT NULL COMMENT 'Absender kann gelöscht werden',
  `empfanger_id` int(11) DEFAULT NULL COMMENT 'Löschung des Empfängers löscht automatisch Nachricht',
  `zeitstempel` datetime DEFAULT CURRENT_TIMESTAMP,
  `inhalt` text COLLATE utf8_unicode_ci,
  `ungelesen` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Wurde die Nachricht gelesen?',
  PRIMARY KEY (`id`),
  KEY `sender_user_id` (`absender_id`),
  KEY `receiver_user_id` (`empfanger_id`),
  CONSTRAINT `receiver_user_id` FOREIGN KEY (`empfanger_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender_user_id` FOREIGN KEY (`absender_id`) REFERENCES `benutzer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Systeminterne Nachrichten zwischen Benutzern';

-- Exportiere Daten aus Tabelle eis_ss2017.nachricht: ~1 rows (ungefähr)
DELETE FROM `nachricht`;
/*!40000 ALTER TABLE `nachricht` DISABLE KEYS */;
INSERT INTO `nachricht` (`id`, `absender_id`, `empfanger_id`, `zeitstempel`, `inhalt`, `ungelesen`) VALUES
	(7, 16, 14, '2017-07-07 15:50:17', 'S3Jhc3NlciBUeXAh', 0);
/*!40000 ALTER TABLE `nachricht` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.projekt
DROP TABLE IF EXISTS `projekt`;
CREATE TABLE IF NOT EXISTS `projekt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `casemodder_id` int(11) NOT NULL COMMENT 'ID des Casemodders, der das Projekt anlegt',
  `erstellt_am` date DEFAULT NULL COMMENT 'Erstellungsdatum',
  `titel` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Titel des Projektes',
  `inhalt` blob COMMENT 'Textueller Inhalt, Beschreibung des Projektes',
  `status` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '"Laufend"' COMMENT 'Status des Projektes',
  PRIMARY KEY (`id`),
  KEY `CASEMODDER_ID` (`casemodder_id`),
  CONSTRAINT `CASEMODDER_ID` FOREIGN KEY (`casemodder_id`) REFERENCES `casemodder` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Tabelle von Case Modding-Projekten im System';

-- Exportiere Daten aus Tabelle eis_ss2017.projekt: ~30 rows (ungefähr)
DELETE FROM `projekt`;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` (`id`, `casemodder_id`, `erstellt_am`, `titel`, `inhalt`, `status`) VALUES
	(1, 6, '2017-07-05', 'N1_Projekt1', NULL, 'Beendet'),
	(2, 6, '2017-07-05', 'N1_Projekt2', NULL, 'Laufend'),
	(3, 6, '2017-07-05', 'N1_Projekt3', NULL, 'Abgebrochen'),
	(4, 7, '2017-07-05', 'N2_Projekt1', NULL, 'Laufend'),
	(5, 7, '2017-07-05', 'N2_Projekt2', NULL, 'Laufend'),
	(6, 8, '2017-07-05', 'N3_Projekt1', NULL, 'Beendet'),
	(7, 8, '2017-07-05', 'N3_Projekt2', NULL, 'Laufend'),
	(8, 8, '2017-07-05', 'N3_Projekt3', NULL, 'Abgebrochen'),
	(9, 8, '2017-07-05', 'N3_Projekt4', NULL, 'Laufend'),
	(10, 9, '2017-07-05', 'N4_Projekt1', NULL, 'Laufend'),
	(11, 9, '2017-07-05', 'N4_Projekt2', NULL, 'Laufend'),
	(12, 9, '2017-07-05', 'N4_Projekt3', NULL, 'Beendet'),
	(13, 10, '2017-07-05', 'N5_Projekt1', NULL, 'Laufend'),
	(14, 10, '2017-07-05', 'N5_Projekt2', NULL, 'Abgebrochen'),
	(15, 11, '2017-07-05', 'N6_Projekt1', NULL, 'Beendet'),
	(16, 11, '2017-07-05', 'N6_Projekt2', NULL, 'Laufend'),
	(17, 11, '2017-07-05', 'N6_Projekt3', NULL, 'Abgebrochen'),
	(18, 12, '2017-07-05', 'N7_Projekt1', NULL, 'Laufend'),
	(19, 12, '2017-07-05', 'N7_Projekt2', NULL, 'Laufend'),
	(20, 12, '2017-07-05', 'N7_Projekt3', NULL, 'Laufend'),
	(21, 13, '2017-07-05', 'N8_Projekt1', NULL, 'Beendet'),
	(22, 14, '2017-07-05', 'N9_Projekt1', NULL, 'Laufend'),
	(23, 14, '2017-07-05', 'N9_Projekt2', NULL, 'Abgebrochen'),
	(24, 14, '2017-07-05', 'N9_Projekt3', NULL, 'Beendet'),
	(25, 14, '2017-07-05', 'N9_Projekt4', NULL, 'Laufend'),
	(26, 14, '2017-07-05', 'N9_Projekt5', NULL, 'Abgebrochen'),
	(27, 14, '2017-07-05', 'N9_Projekt6', NULL, 'Laufend'),
	(28, 15, '2017-07-05', 'N10_Projekt1', NULL, 'Laufend'),
	(29, 15, '2017-07-05', 'N10_Projekt2', NULL, 'Laufend'),
	(30, 15, '2017-07-05', 'N10_Projekt3', NULL, 'Beendet');
/*!40000 ALTER TABLE `projekt` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.projektupdate
DROP TABLE IF EXISTS `projektupdate`;
CREATE TABLE IF NOT EXISTS `projektupdate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projekt_id` int(11) NOT NULL COMMENT 'ID des zugehörigen Projekts',
  `datum` date DEFAULT NULL,
  `inhalt` blob,
  PRIMARY KEY (`id`),
  KEY `PROJECT_ID` (`projekt_id`),
  CONSTRAINT `PROJECT_ID` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Updates zu Projekten';

-- Exportiere Daten aus Tabelle eis_ss2017.projektupdate: ~0 rows (ungefähr)
DELETE FROM `projektupdate`;
/*!40000 ALTER TABLE `projektupdate` DISABLE KEYS */;
/*!40000 ALTER TABLE `projektupdate` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle eis_ss2017.projektupdate_kommentar: ~0 rows (ungefähr)
DELETE FROM `projektupdate_kommentar`;
/*!40000 ALTER TABLE `projektupdate_kommentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `projektupdate_kommentar` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle eis_ss2017.projektupdate_upvote: ~0 rows (ungefähr)
DELETE FROM `projektupdate_upvote`;
/*!40000 ALTER TABLE `projektupdate_upvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `projektupdate_upvote` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.projekt_kommentar
DROP TABLE IF EXISTS `projekt_kommentar`;
CREATE TABLE IF NOT EXISTS `projekt_kommentar` (
  `projekt_id` int(11) NOT NULL,
  `kommentar_id` int(11) NOT NULL,
  `ungelesen` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Flag für Dashboard',
  PRIMARY KEY (`projekt_id`,`kommentar_id`),
  KEY `relation_pc_comment_id` (`kommentar_id`),
  CONSTRAINT `relation_pc_comment_id` FOREIGN KEY (`kommentar_id`) REFERENCES `kommentar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_pc_project_id` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Relationstabelle für Kommentare und Projekte';

-- Exportiere Daten aus Tabelle eis_ss2017.projekt_kommentar: ~0 rows (ungefähr)
DELETE FROM `projekt_kommentar`;
/*!40000 ALTER TABLE `projekt_kommentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `projekt_kommentar` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle eis_ss2017.projekt_upvote: ~3 rows (ungefähr)
DELETE FROM `projekt_upvote`;
/*!40000 ALTER TABLE `projekt_upvote` DISABLE KEYS */;
INSERT INTO `projekt_upvote` (`projekt_id`, `benutzer_id`) VALUES
	(1, 1),
	(1, 7),
	(1, 16);
/*!40000 ALTER TABLE `projekt_upvote` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle eis_ss2017.sponsor
DROP TABLE IF EXISTS `sponsor`;
CREATE TABLE IF NOT EXISTS `sponsor` (
  `user_id` int(11) NOT NULL COMMENT 'ID des Benutzers',
  `firma` varchar(50) COLLATE utf8_unicode_ci DEFAULT 'Wo arbeiten Sie?',
  `beschreibung` varchar(160) COLLATE utf8_unicode_ci DEFAULT 'Beschreiben Sie sich (max 160 Zeichen)',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `sponsor_user_id` FOREIGN KEY (`user_id`) REFERENCES `benutzer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sponsorenbenutzer';

-- Exportiere Daten aus Tabelle eis_ss2017.sponsor: ~7 rows (ungefähr)
DELETE FROM `sponsor`;
/*!40000 ALTER TABLE `sponsor` DISABLE KEYS */;
INSERT INTO `sponsor` (`user_id`, `firma`, `beschreibung`) VALUES
	(4, 'Wo arbeiten Sie?', 'Beschreiben Sie sich (max 160 Zeichen)'),
	(5, 'Wo arbeiten Sie?', 'Beschreiben Sie sich (max 160 Zeichen)'),
	(16, 'Firma1', 'Beschreibung1'),
	(17, 'Firma2', 'Beschreibung2'),
	(18, 'Firma3', 'Beschreibung3'),
	(19, 'Firma4', 'Beschreibung4'),
	(20, 'Firma5', 'Beschreibung5');
/*!40000 ALTER TABLE `sponsor` ENABLE KEYS */;

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

-- Exportiere Daten aus Tabelle eis_ss2017.team: ~0 rows (ungefähr)
DELETE FROM `team`;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
