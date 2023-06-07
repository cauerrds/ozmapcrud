import { database } from "../db"
import { dbUtils } from "../db/utils"
import { helpers } from "../helpers/helpers"
import { ICreateUserRequest, IUser } from "../interfaces/user.interface"



const create =async (user:ICreateUserRequest): Promise<IUser> => {
    const db = await database.openConnection()
    

    user.birthdate = helpers.convertStringToDate(user.birthdate).toISOString()
    await dbUtils.dbQuery(db,`INSERT INTO users (name, email, createdOn, updatedOn, birthdate) VALUES(?, ?, ?, ?, ?)`, [user.name, user.email, user.createdOn.toISOString(), user.updatedOn.toISOString(), user.birthdate])
    const lastInsert = await dbUtils.dbQuery( db,`SELECT * FROM users WHERE id=(SELECT MAX(id) FROM users)`)
    const newUser = lastInsert[0]

    db.close()
  
    return newUser
}

const findAll = async (page: number, pageSize: number): Promise<IUser[]> => {
    const db = await database.openConnection()
    const offset = (page - 1) * pageSize
    const users = await dbUtils.dbQuery(db ,`SELECT * FROM users LIMIT ? OFFSET ?`, [pageSize, offset])

    db.close()
    return users
}

const findOneById = async (id: number): Promise<IUser> => {
    const db = await database.openConnection()

    const user = await dbUtils.dbQuery(db ,`SELECT * FROM users WHERE id=?`, [id])
    
    db.close()
    return user[0]
}

const findOneByName = async (name: string): Promise<IUser> => {
    const db = await database.openConnection()

    const user = await dbUtils.dbQuery(db ,`SELECT * FROM users WHERE name=?`, [name])
    
    db.close()
    return user[0]
}

const update = async (user:IUser): Promise<IUser> => {
    const db = await database.openConnection()

    await dbUtils.dbQuery(db ,`UPDATE users SET name = ?, email = ?, updatedOn = ? WHERE id = ?`, [user.name, user.email, user.updatedOn.toISOString() , user.id])
    const updatedUser = findOneById(user.id)
    
    db.close()
    return updatedUser
}

const remove = async (id: number) => {
    const db = await database.openConnection()

    await dbUtils.dbQuery(db ,`DELETE FROM users WHERE id=?`, [id])

    db.close()
}





export const userModel = {
    create,
    findAll,
    findOneById,
    findOneByName,
    update,
    remove
}