/* insert users */
INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, geburtsdatum, registrierung) VALUES ("dominic", "pwd", "Dominic", "Eschbach", "doeschba@htwg-konstanz.de", DATE("2012-07-04"), DATE("2012-10-03"));
INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, geburtsdatum, registrierung) VALUES ("timo", "pwd", "Timo", "Partl", "tipartl@htwg-konstanz.de", DATE("2012-07-02"), DATE("2012-10-03"));

/* insert boats */
INSERT INTO seapal.bootinfo (bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES ("Titanic", 101, "TI101", "New York", "New York Yacht Club", "George Boat", "Württembergische", "TI", "Schiff", "Peter Schiff", 200, 50, 7, 10, 1000, "T34", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);
INSERT INTO seapal.bootinfo (bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES ("Queen Mary 2", 80, "QM80", "Dover", "Dover Yacht Club", "Hans Ebert", "Wüstenrot", "QM", "Schiff", "Rainer Berger", 200, 50, 7, 10, 1000, "T20", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);
INSERT INTO seapal.bootinfo (bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung, rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart, baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse, genuagroesse, spigroesse) VALUES ("MS Deutschland", 150, "MSD15", "Hamburg", "Hamburg Yacht Club", "Peter Miller", "Allianz", "MSD", "Schiff", "Emil Klaus", 200, 50, 7, 10, 1000, "T27", 1993, "Duotec 100", 500, 50, 30, 10, 25, 13);

/* insert trips */
INSERT INTO seapal.tripinfo (titel, von, nach, skipper, crew, tstart, tende, tdauer, motor, tank) VALUES ("Langer Trip nach England", "Hamburg", "Dover", "Hr. Hein", "Martin Felix Manuel", DATE("2012-07-02"), DATE("2012-07-02"), 300, 1241, true);

INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 1", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 2");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 2", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 3");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 3", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 4");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 4", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 5");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 5", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 6");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 6", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 7");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 7", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 8");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 8", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 9");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 9", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Marker 10");
INSERT INTO seapal.wegpunkte (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (1, "Marker 10", "btm", "dtm", "lat", "lng", "sog", "cog", "manoever", "vorsegel", "Date", "Time", "Ziel");

/* insert weather */

INSERT INTO `wetter` (`id`, `datum`, `uhrzeit`, `windstaerke`, `windrichtung`, `luftdruck`, `temperatur`, `wolken`, `regen`, `wellenhoehe`, `wellenrichtung`) VALUES
(1, '2013-05-25', '16:43:00', 12, 'NO', 200, 23, 'nein', 'ja', 1, 'SW'),
(2, '2013-05-25', '16:43:00', 12, 'NO', 200, 23, 'nein', 'ja', 1, 'SW'),
(7, '2013-05-24', '17:30:00', 4, 'SW', 300, 12, 'ja', 'nein', 2, 'NO');