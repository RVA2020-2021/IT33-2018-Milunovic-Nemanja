--smer podaci
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (nextval('smer_seq'), 'Inzenjerstvo informacionih sistema', 'IIS');

INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (nextval('smer_seq'), 'Softversko inzenjerstvo i informacione tehnologije', 'SW');

INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (nextval('smer_seq'), 'Racunarstvo i automatika', 'E2');

INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (-100, 'Inzernjerski menadzment', 'IIM');

--projekat podaci
INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (nextval('projekat_seq'), 'Web aplikacija', 'WA', 'Napraviti web aplikaciju');

INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (nextval('projekat_seq'), 'Viseslojna aplikacija', 'VA', 'Napraviti viseslojnu aplikaciju');

INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (nextval('projekat_seq'), 'BAZA PODATAKA', 'BP', 'Napraviti bazu podataka');

INSERT INTO "projekat"("id", "naziv", "oznaka", "opis")
VALUES (-100, 'Seminarski', 'SE', 'Napisati seminarski');

--grupa podaci
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (nextval('grupa_seq'), 'G1', '1');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (nextval('grupa_seq'), 'G2', '1');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (nextval('grupa_seq'), 'G1', '2');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (nextval('grupa_seq'), 'G2', '2');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (nextval('grupa_seq'), 'G1', '3');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (nextval('grupa_seq'), 'G2', '3');

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (-100, 'G1', '-100');

--student podaci
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (nextval('student_seq'), 'Nemanja', 'Milunovic', 'IT-33/2018', 2, 1);

INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "grupa", "projekat")
VALUES (-100, 'Milan', 'Milankovic', 'IIM-23/2018', '-100', '-100');


SELECT * FROM smer;
SELECT * FROM projekat;
SELECT * FROM grupa;

SELECT smer.id, smer.naziv, smer.oznaka, grupa.oznaka FROM smer JOIN grupa ON grupa.smer = smer.id where smer.id = 1;

SELECT student.id, student.ime, student.prezime, student.broj_indeksa, grupa.oznaka, projekat.naziv, projekat.oznaka
FROM student JOIN grupa ON student.grupa = grupa.id JOIN projekat ON student.projekat = projekat.id


