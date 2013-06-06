CREATE DATABASE seapal;

/* table for users */
CREATE TABLE seapal.benutzer (
	bnr INT NOT NULL AUTO_INCREMENT,
	benutzername VARCHAR(20) NOT NULL,
	passwort VARCHAR(10) NOT NULL,
	vorname VARCHAR(20) NOT NULL,
	nachname VARCHAR(20) NOT NULL,
	mail VARCHAR(30) NOT NULL,
	geburtsdatum DATE NOT NULL,
	registrierung DATE NOT NULL,
	PRIMARY KEY (bnr)
);


/* table for bootinformations */
CREATE TABLE seapal.bootinfo (
	unr INT NOT NULL,
	bnr INT NOT NULL AUTO_INCREMENT,
	bootname VARCHAR(30) NOT NULL,
	registernummer INT NOT NULL,
	segelzeichen VARCHAR(5) NOT NULL,
	heimathafen VARCHAR(30) DEFAULT NULL,
	yachtclub VARCHAR(30) DEFAULT NULL,
	eigner VARCHAR(30) NOT NULL,
	versicherung VARCHAR(30) NOT NULL,
	rufzeichen VARCHAR(5) DEFAULT NULL,
	typ VARCHAR(10) NOT NULL,
	konstrukteur VARCHAR(30) DEFAULT NULL,
	laenge FLOAT NOT NULL,
	breite FLOAT NOT NULL,
	tiefgang FLOAT NOT NULL,
	masthoehe FLOAT NOT NULL,
	verdraengung FLOAT NOT NULL,
	rigart VARCHAR(10) DEFAULT NULL,
	baujahr INT NOT NULL,
	motor VARCHAR(30) DEFAULT NULL,
	tankgroesse FLOAT DEFAULT NULL,
	wassertankgroesse FLOAT DEFAULT NULL,
	abwassertankgroesse FLOAT DEFAULT NULL,
	grosssegelgroesse FLOAT DEFAULT NULL,
	genuagroesse FLOAT DEFAULT NULL,
	spigroesse FLOAT DEFAULT NULL,
	PRIMARY KEY (bnr),
	FOREIGN KEY (unr) REFERENCES benutzer (bnr) ON DELETE CASCADE
);

/* table for tripinformations */
CREATE TABLE seapal.tripinfo (
	tnr INT NOT NULL AUTO_INCREMENT,
	bnr INT NOT NULL,
	titel VARCHAR(30) NOT NULL,
	von VARCHAR(30) NOT NULL,
	nach VARCHAR(30) NOT NULL,
	lastZoom INT NOT NULL,
	PRIMARY KEY (tnr),
	FOREIGN KEY (bnr) REFERENCES benutzer (bnr) ON DELETE CASCADE
);

/* table for waypoints */
CREATE TABLE seapal.wegpunkte (
	wnr INT NOT NULL AUTO_INCREMENT,
	tnr INT NOT NULL,
	name VARCHAR(30) NOT NULL,	
	lat REAL NOT NULL,
	lng REAL NOT NULL,	
	PRIMARY KEY (wnr),
	FOREIGN KEY (tnr) REFERENCES tripinfo (tnr) ON DELETE CASCADE
);

/* table for tracking */
CREATE TABLE seapal.tracking (
	tracknr INT NOT NULL AUTO_INCREMENT,
	tnr INT NOT NULL,
	skipper VARCHAR(30) DEFAULT NULL,
	crew VARCHAR(100) DEFAULT NULL,
	tstart VARCHAR(30) DEFAULT NULL,
	tende VARCHAR(30) DEFAULT NULL,
	tdauer FLOAT DEFAULT NULL,
	PRIMARY KEY (tracknr),
	FOREIGN KEY (tnr) REFERENCES tripinfo (tnr) ON DELETE CASCADE
);

/* tables for trackingpoints and weather */
CREATE TABLE seapal.trackingPoint (
	trackpointnr INT NOT NULL AUTO_INCREMENT,
	tracknr INT NOT NULL,
	marker VARCHAR(30) DEFAULT NULL,
	btm INT DEFAULT NULL, /* bearing to marker: degree */
	dtm INT DEFAULT NULL, /* destination to marker: meters */
	sog INT DEFAULT NULL, /* speed over ground: knots */
	cog INT DEFAULT NULL,
	manoever VARCHAR(30) DEFAULT NULL,
	vorsegel VARCHAR(30) DEFAULT NULL,
	wdate VARCHAR(30) DEFAULT NULL,
	wtime VARCHAR(30) DEFAULT NULL,
	motor BOOLEAN DEFAULT FALSE,
	tank VARCHAR(30) DEFAULT FALSE,
	windstaerke INT DEFAULT NULL,
	windrichtung VARCHAR(30) DEFAULT NULL,
	luftdruck INT DEFAULT NULL,
	temperatur INT DEFAULT NULL,
	wolken VARCHAR(30) DEFAULT NULL,
	regen VARCHAR(30) DEFAULT NULL,
	wellenhoehe INT DEFAULT NULL,
	wellenrichtung VARCHAR(30) DEFAULT NULL,
	PRIMARY KEY (trackpointnr),
	FOREIGN KEY (tracknr) REFERENCES tracking (tracknr) ON DELETE CASCADE
);
