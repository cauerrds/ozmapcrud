import { type Context } from 'koa'
import { userService } from '../service/users.services'
import { type ICreateUserRequest, type IUpdateUserRequest } from '../interfaces/user.interface'

const create = async (ctx: Context) => {
  const user = ctx.request.body as ICreateUserRequest
  try {
    const newUser = await userService.create(ctx, user)
    ctx.status = 201
    ctx.body = newUser
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }
}

const findAll = async (ctx: Context): Promise<void> => {
  try {
    const users = await userService.findAll(ctx)
    ctx.status = 200
    ctx.body = users
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }
}

const findOne = async (ctx: Context): Promise<void> => {
  const id = ctx.params.nameOrId
  try {
    const user = await userService.findOne(ctx, id)
    ctx.status = 200
    ctx.body = user
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }
}

const update = async (ctx: Context): Promise<void> => {
  const id = ctx.params.nameOrId
  const body = ctx.request.body as IUpdateUserRequest
  try {
    const user = await userService.update(ctx, id, body)
    ctx.status = 200
    ctx.body = user
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }
}

const remove = async (ctx: Context): Promise<void> => {
  const { id } = ctx.params
  try {
    await userService.remove(ctx, id)
    ctx.status = 200
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }
}

export const userController = {
  create,
  findAll,
  findOne,
  update,
  remove
}
