DROP SEQUENCE IF EXISTS smer_seq;
DROP SEQUENCE IF EXISTS grupa_seq; 
DROP SEQUENCE IF EXISTS student_seq;
DROP SEQUENCE IF EXISTS projekat_seq;


CREATE TABLE SMER(
	ID INTEGER NOT NULL,
	NAZIV CHARACTER VARYING(100),
	OZNAKA CHARACTER VARYING(50)
);

CREATE SEQUENCE smer_seq 
	INCREMENT 1;

CREATE TABLE GRUPA(
	ID INTEGER NOT NULL,
	OZNAKA CHARACTER VARYING(10),
	SMER INTEGER NOT NULL
);

CREATE SEQUENCE grupa_seq 
	INCREMENT 1;

CREATE TABLE STUDENT(
	ID INTEGER NOT NULL,
	IME CHARACTER VARYING(50),
	PREZIME CHARACTER VARYING(50),
	BROJ_INDEKSA CHARACTER VARYING(20),
	GRUPA INTEGER NOT NULL,
	PROJEKAT INTEGER NOT NULL
);

CREATE SEQUENCE student_seq 
	INCREMENT 1;

CREATE TABLE PROJEKAT(
	ID INTEGER NOT NULL,
	NAZIV CHARACTER VARYING(100),
	OZNAKA CHARACTER VARYING(10),
	OPIS CHARACTER VARYING(500)
);

CREATE SEQUENCE projekat_seq 
	INCREMENT 1;

ALTER TABLE SMER ADD CONSTRAINT PK_SMER PRIMARY KEY(ID);
ALTER TABLE GRUPA ADD CONSTRAINT PK_GRUPA PRIMARY KEY(ID);
ALTER TABLE STUDENT ADD CONSTRAINT PK_STUDENT PRIMARY KEY(ID);
ALTER TABLE PROJEKAT ADD CONSTRAINT PK_PROJEKAT PRIMARY KEY(ID);

ALTER TABLE GRUPA ADD CONSTRAINT FK_GRUPA_SMER FOREIGN KEY(SMER) REFERENCES SMER(ID);
ALTER TABLE STUDENT ADD CONSTRAINT FK_STUDENT_GRUPA FOREIGN KEY(GRUPA) REFERENCES GRUPA(ID);
ALTER TABLE STUDENT ADD CONSTRAINT FK_STUDENT_PROJEKAT FOREIGN KEY(PROJEKAT) REFERENCES PROJEKAT(ID);

CREATE INDEX IDXPK_SMER ON SMER(ID);
CREATE INDEX IDXPK_GRUPA ON GRUPA(ID);
CREATE INDEX IDXPK_STUDENT ON STUDENT(ID);
CREATE INDEX IDXPK_PROJEKAT ON PROJEKAT(ID);

CREATE INDEX IDXFK_GRUPA_SMER ON GRUPA(SMER);
CREATE INDEX IDXFK_STUDENT_GRUPA ON STUDENT(GRUPA);
CREATE INDEX IDXFK_STUDENT_PROJEKAT ON STUDENT(PROJEKAT);







