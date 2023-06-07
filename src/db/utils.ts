import sqlite3 from 'sqlite3'

const SQL_USERS_CREATE = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  email TEXT UNIQUE,
  createdOn TEXT,
  updatedOn TEXT,
  birthdate TEXT
);`

const createDatabase = (dbSource: string) => {
  const newdb = new sqlite3.Database(dbSource, err => {
    if (err != null) {
      throw err
    }
  })
  createUserTable(newdb)
  return newdb
}

const createUserTable = (db: sqlite3.Database) => {
  db.run(SQL_USERS_CREATE, err => {
    if (err != null) {
      throw err
    }
  })
}

const dbQuery = (db: sqlite3.Database, query: string, params?: any[]): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err != null) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

export const dbUtils = {
  createDatabase,
  createUserTable,
  dbQuery
}
