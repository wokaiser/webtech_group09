/* insert users */
INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, mySession, registrierung) VALUES ("philfry", "leela", "Phillip J.", "Fry", "philfry@futurama.de", "", DATE("2012-10-03"));
INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, mySession, registrierung) VALUES ("bender", "money", "Bender", "Rodriguez", "bender@futurama.de", "", DATE("2012-10-03"));

/* insert boats */
INSERT INTO seapal.bootinfo (unr, bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES (1, "Titanic", 101, "TI101", "New York", "New York Yacht Club", "George Boat", "Württembergische", "TI", "Schiff", "Peter Schiff", 200, 50, 7, 10, 1000, "T34", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);
INSERT INTO seapal.bootinfo (unr, bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES (1, "Queen Mary 2", 80, "QM80", "Dover", "Dover Yacht Club", "Hans Ebert", "Wüstenrot", "QM", "Schiff", "Rainer Berger", 200, 50, 7, 10, 1000, "T20", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);
INSERT INTO seapal.bootinfo (unr, bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES (2, "MS Deutschland", 150, "MSD15", "Hamburg", "Hamburg Yacht Club", "Peter Miller", "Allianz", "MSD", "Schiff", "Emil Klaus", 200, 50, 7, 10, 1000, "T27", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);

/* insert trips */
INSERT INTO seapal.tripinfo (bnr, titel, von, nach, lastZoom, lastLat, lastLng) VALUES (1, "Kurztrip nach Hagnau", "Konstanz", "Hagnau", 10, 47.66, 9.17916667);
INSERT INTO seapal.tripinfo (bnr, titel, von, nach, lastZoom, lastLat, lastLng) VALUES (2, "Kurztrip nach Konstanz", "Hangnau", "Konstanz", 10, 47.67222222, 9.313333333);

INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (1, "Marker 1", 47.66, 9.17916667);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (1, "Marker 2", 47.66055556, 9.181388889);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (1, "Marker 3", 47.66166667, 9.206944444);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (1, "Marker 4", 47.66388889, 9.221944444);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (1, "Marker 5", 47.67222222, 9.313333333);

INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (2, "Marker 1", 47.67222222, 9.313333333);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (2, "Marker 2", 47.66388889, 9.221944444);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (2, "Marker 3", 47.66166667, 9.206944444);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (2, "Marker 4", 47.66055556, 9.181388889);
INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (2, "Marker 5", 47.66, 9.17916667);

/* insert tracking */
INSERT INTO seapal.tracking (tnr, trackTitel, skipper, crew, tstart, tende, tdauer, lastZoom, lastLat, lastLng) VALUES (1, "Nemos Fahrt", "Cpt. Nemo", "Tick Trick Track", "2012-07-02", "2012-07-02", "1:12:30", 12, 47.66, 9.17916667);

/* insert into tracking points */
INSERT INTO seapal.trackingPoint (tracknr, marker, lat, lng, btm, dtm, sog, cog, manoever, vorsegel, wdate, wtime, motor, tank, windstaerke, windrichtung, luftdruck, temperatur, wolken, regen, wellenhoehe, wellenrichtung) VALUES
(1, "Marker 1", 47.66, 9.17916667, 15, 200, 5, 13, "Wende", "Spinnacker", "2013-07-02", "16:43:00", TRUE, "VOLL", "2", "ONO", 900, 23, "WOLKENLOS", "KEIN", 30, "NW"),
(1, "Marker 2", 47.66055556, 9.181388889, 16, 201, 6, 14, "Wende", "Spinnacker", "2013-07-02", "16:53:00", TRUE, "VOLL", "3", "ONO", 900, 23, "WOLKENLOS", "KEIN", 30, "NW"),
(1, "Marker 3", 47.66166667, 9.206944444, 17, 202, 7, 15, "Wende", "Spinnacker", "2013-07-02", "17:03:00", TRUE, "VOLL", "4", "ONO", 900, 23, "WOLKENLOS", "KEIN", 30, "NW"),
(1, "Marker 4", 47.66388889, 9.221944444, 18, 203, 8, 16, "Wende", "Spinnacker", "2013-07-02", "17:13:00", TRUE, "VOLL", "5", "ONO", 900, 23, "WOLKENLOS", "KEIN", 30, "NW"),
(1, "Marker 5", 47.67222222, 9.313333333, 19, 204, 9, 17, "Wende", "Spinnacker", "2013-07-02", "17:23:00", TRUE, "VOLL", "6", "ONO", 900, 23, "WOLKENLOS", "KEIN", 30, "NW");