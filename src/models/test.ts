import { ERROR } from "sqlite3"
import { database } from "../db"
import { dbUtils } from "../db/utils"
import { errorUtils } from "../service/errors"

const resetDb = async () => {
    const db = await database.openConnection()
    if (process.env.npm_lifecycle_event != 'test'){
        return
    }
    await dbUtils.dbQuery(db ,`DELETE FROM users `)
    db.close()
}

export const testModel = {
    resetDb
}