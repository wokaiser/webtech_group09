/* insert users */
INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, geburtsdatum, registrierung) VALUES ("philfry", "leela", "Phillip J.", "Fry", "philfry@futurama.de", DATE("1986-07-04"), DATE("2012-10-03"));
INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, geburtsdatum, registrierung) VALUES ("bender", "money", "Bender", "Rodriguez", "bender@futurama.de", DATE("2001-07-02"), DATE("2012-10-03"));

/* insert boats */
INSERT INTO seapal.bootinfo (unr, bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES (1, "Titanic", 101, "TI101", "New York", "New York Yacht Club", "George Boat", "Württembergische", "TI", "Schiff", "Peter Schiff", 200, 50, 7, 10, 1000, "T34", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);
INSERT INTO seapal.bootinfo (unr, bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES (1, "Queen Mary 2", 80, "QM80", "Dover", "Dover Yacht Club", "Hans Ebert", "Wüstenrot", "QM", "Schiff", "Rainer Berger", 200, 50, 7, 10, 1000, "T20", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);
INSERT INTO seapal.bootinfo (unr, bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES (2, "MS Deutschland", 150, "MSD15", "Hamburg", "Hamburg Yacht Club", "Peter Miller", "Allianz", "MSD", "Schiff", "Emil Klaus", 200, 50, 7, 10, 1000, "T27", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);

/* insert trips */
INSERT INTO seapal.tripinfo (bnr, titel, von, nach, skipper, crew, tstart, tende, tdauer, motor, tank, lastZoom) VALUES (1, "Kurztrip nach Hagnau", "Konstanz", "Hagnau", "Hr. Hein", "Martin Felix Manuel", DATE("2012-07-02"), DATE("2012-07-02"), 300, 1241, true, 8);
INSERT INTO seapal.tripinfo (bnr, titel, von, nach, skipper, crew, tstart, tende, tdauer, motor, tank, lastZoom) VALUES (2, "Kurztrip nach Konstanz", "Hangnau", "Konstanz", "Hr. Hein", "Martin Felix Manuel", DATE("2012-07-02"), DATE("2012-07-02"), 300, 1241, true, 8);

INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 1", "btm", "dtm", 47.66, 9.17916667, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 2");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 2", "btm", "dtm", 47.66055556, 9.181388889, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 3");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 3", "btm", "dtm", 47.66166667, 9.206944444, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 4");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 4", "btm", "dtm", 47.66388889, 9.221944444, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 5");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 5", "btm", "dtm", 47.67222222, 9.313333333, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Ziel");

INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (2, "Marker 1", "btm", "dtm", 47.67222222, 9.313333333, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 2");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (2, "Marker 2", "btm", "dtm", 47.66388889, 9.221944444, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 3");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (2, "Marker 3", "btm", "dtm", 47.66166667, 9.206944444, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 4");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (2, "Marker 4", "btm", "dtm", 47.66055556, 9.181388889, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 5");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (2, "Marker 5", "btm", "dtm", 47.66, 9.17916667, "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Ziel");

/* insert weather */
INSERT INTO seapal.wetter (`bnr`, `id`, `datum`, `uhrzeit`, `windstaerke`, `windrichtung`, `luftdruck`, `temperatur`, `wolken`, `regen`, `wellenhoehe`, `wellenrichtung`) VALUES (1, 1, '2013-05-25', '16:43:00', 12, 'NO', 200, 23, 'nein', 'ja', 1, 'SW'),
																																												 (1, 2, '2013-05-25', '16:43:00', 12, 'NO', 200, 23, 'nein', 'ja', 1, 'SW'), 
																																												 (2, 7, '2013-05-24', '17:30:00', 4, 'SW', 300, 12, 'ja', 'nein', 2, 'NO');