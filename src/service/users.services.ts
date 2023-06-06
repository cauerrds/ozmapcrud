import { Context } from "koa"
import { userModel } from "../models/users"
import { errorUtils } from "./errors"
import { ICreateUserRequest, IUpdateUserRequest, IUser } from "../interfaces/user.interface"
import { helpers } from "../helpers/helpers"


const create = async (ctx: Context, user: ICreateUserRequest) => {
    if(!user.name || !user.email || !user.birthdate  ){
        return errorUtils.badRequest(ctx, "Name, email and Birthdate are required")
    }

    const age = helpers.calculateAge(helpers.convertStringToDate(user.birthdate))
    if (age < 18 ){
        return errorUtils.badRequest(ctx, "Minimum age 18")
    }

    let userData: ICreateUserRequest = {
        name: user.name,
        email: user.email,
        createdOn: new Date(),
        updatedOn: new Date(),
        birthdate: user.birthdate
    }

    try {
        const newUser = await userModel.create(userData)
        return helpers.formatUserResponse(newUser)
    } catch (err) {
      if (err instanceof Error){
        errorUtils.handleSQLiteError(ctx, err)
      }
    }
}

const findAll = async (ctx: Context) => {
    let {page, pageSize} = ctx.query
    const queryParams = helpers.formatFindAllQueryParams(page, pageSize)

    try {
        const users = await userModel.findAll(queryParams.page, queryParams.pageSize)
        const usersReponse = users.map(user => {
            return helpers.formatUserResponse(user)
        })

        return usersReponse
    } catch (err) {
        if (err instanceof Error){
            errorUtils.internalServerError(ctx, err)
        }
    }
}

const findOne = async (ctx: Context, nameOrId: string ): Promise<IUser> => {
    try {
        let user: IUser
        if (parseInt(nameOrId) > 0){
             user = await userModel.findOneById(parseInt(nameOrId))
        } else {
             user = await userModel.findOneByName(nameOrId)
        }   
        if (!user){
            errorUtils.notFound(ctx, "User not found")
        }
        
        return helpers.formatUserResponse(user)
    } catch (err) {
        throw(err)
    }
}

const update = async (ctx: Context, nameOrId: string, body: IUpdateUserRequest ) => {

    if(!body.name && !body.name){
        errorUtils.badRequest(ctx, "No data provided")
    }

    const user = await findOne(ctx, nameOrId)
    if(!user){
        errorUtils.notFound(ctx, "User not found")
    }

    let updatedUserData: IUser = {
        name: body.name || user.name,
        email: body.email || user.email,
        id: user.id,
        updatedOn: new Date(),
        birthdate: user.birthdate,
        createdOn: user.createdOn
    }

    try {
        const user = await userModel.update(updatedUserData)
        return helpers.formatUserResponse(user)
    } catch (err) {
        if (err instanceof Error){
            errorUtils.handleSQLiteError(ctx, err)
          }
    }
}

const remove = async (ctx: Context, id: number) => {
    try {
        await userModel.remove(id)
    } catch (err) {
        if (err instanceof Error){
            errorUtils.internalServerError(ctx, err)
        }
    }
}



export const userService = {
    create,
    findAll,
    findOne,
    update,
    remove
}