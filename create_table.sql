CREATE TABLE IF NOT EXISTS usuarios (
	id INTEGER PRIMARY KEY ,
	nome TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	isAdm INTEGER NOT NULL,
	password TEXT NOT NULL
);