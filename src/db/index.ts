import sqlite3 from 'sqlite3';
import { config } from '../config';
import { dbUtils } from './utils';



const openConnection = async () => {
  let db_source = config.DB_SOURCE
  if (process.env.npm_lifecycle_event === 'test'){
    db_source = "test.db"
  }

  const db = new sqlite3.Database(db_source, sqlite3.OPEN_READWRITE, async (err)=>{ 
    if (err){
      const db = await dbUtils.createDatabase(db_source)
      return db
    }
    })
   return db
}

export const database = {
  openConnection
}

