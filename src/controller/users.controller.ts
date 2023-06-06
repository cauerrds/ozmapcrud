import { Context } from "koa";
import { errorUtils } from "../service/errors";
import { userService } from "../service/users.services";
import { ICreateUserRequest, IUpdateUserRequest, IUser } from "../interfaces/user.interface";


const create = async (ctx: Context) => {
  const user = <ICreateUserRequest>ctx.request.body 
  try {
    const newUser = await userService.create(ctx, user)
    ctx.status = 201
    ctx.body = newUser
  } catch (err) {
    throw err;
  }
}

const findAll = async (ctx: Context) => {
  try {
    const users = await userService.findAll(ctx)
    ctx.status = 200    
    ctx.body = users
  } catch (err) {
    throw err;
  }
}

const findOne = async (ctx: Context) => {
  const id = ctx.params.nameOrId
  try {
    const user = await userService.findOne(ctx, id)
    ctx.status = 200    
    ctx.body = user
  } catch (err) {
    throw err;
  }
}


const update = async (ctx: Context) => {
  const id = ctx.params.nameOrId
  const body = ctx.request.body as IUpdateUserRequest 
  try {
    const user = await userService.update(ctx, id, body)
    ctx.status = 200    
    ctx.body = user
  } catch (err) {
    throw err;
  }
}

const remove = async (ctx: Context) => {
  const id = ctx.params.id
  try {
    await userService.remove(ctx, id)
    ctx.status = 200    
  } catch (err) {
    throw err;
  }
}


export const userController = {
  create,
  findAll,
  findOne,
  update,
  remove
}