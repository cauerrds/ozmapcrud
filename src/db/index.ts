import sqlite3 from 'sqlite3'
import { dbUtils } from './utils'
import { config } from '../config'

const openConnection = () => {
  let dbSource = config.DB_SOURCE
  if (process.env.npm_lifecycle_event === 'test') {
    dbSource = 'test.db'
  }

  return new sqlite3.Database(dbSource, sqlite3.OPEN_READWRITE, err => {
    if (err != null) {
      return dbUtils.createDatabase(dbSource)
    }
  })
}

export const database = {
  openConnection
}
