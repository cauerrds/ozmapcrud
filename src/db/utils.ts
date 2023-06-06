import sqlite3 from 'sqlite3';

const SQL_USERS_CREATE = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  email TEXT UNIQUE,
  createdOn TEXT,
  updatedOn TEXT,
  birthdate TEXT
);`

const createDatabase = async (db_source: string) => {
    const newdb = new sqlite3.Database(db_source, (err) => {
      if (err) {
          console.log("Getting error " + err);
          return
      }
    });
    await createUserTable(newdb)
    return newdb
}

const createUserTable = async (db: sqlite3.Database ) => {
    db.run(SQL_USERS_CREATE, (err)=> {
     if (err){
       console.log("err on create table", err.message);    
     } else {
       console.log('Table users created with success')
     }
   })
}

const dbQuery = async (db: sqlite3.Database ,query: string, params?: any[]) => {
    return new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (err, rows)=>{
            if (err){
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