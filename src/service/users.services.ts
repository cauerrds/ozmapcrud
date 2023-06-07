import { Context } from 'koa';
import { errorUtils } from './errors';
import { userModel } from '../models/users';
import {
  ICreateUserRequest,
  IUpdateUserRequest,
  IUser,
  IUserResponse
} from '../interfaces/user.interface';
import { helpers } from '../helpers/helpers';

const create = async (ctx: Context, user: ICreateUserRequest) => {
  if (!user.name) {
    return errorUtils.badRequest(ctx, 'Name required');
  }

  if (!user.email) {
    return errorUtils.badRequest(ctx, 'Email required');
  }

  if (!user.birthdate) {
    return errorUtils.badRequest(ctx, 'Birthdate required');
  }

  const age = helpers.calculateAge(helpers.convertStringToDate(user.birthdate));
  const minimumAge = 18
  if (age < minimumAge) {
    return errorUtils.badRequest(ctx, 'Minimum age 18');
  }

  const userData: ICreateUserRequest = {
    name: user.name,
    email: user.email,
    createdOn: new Date(),
    updatedOn: new Date(),
    birthdate: user.birthdate
  };

  try {
    const newUser = await userModel.create(userData);
    return helpers.formatUserResponse(newUser);
  } catch (err) {
    if (err instanceof Error) {
      errorUtils.handleSQLiteError(ctx, err);
    }
  }
};

const findAll = async (ctx: Context) => {
  const { page, pageSize } = ctx.query;
  const queryParams = helpers.formatFindAllQueryParams(page, pageSize);

  try {
    const users = await userModel.findAll(
      queryParams.page,
      queryParams.pageSize
    );
    return users.map(user => {
      return helpers.formatUserResponse(user);
    });
  } catch (err) {
    if (err instanceof Error) {
      errorUtils.internalServerError(ctx, err);
    }
  }
};

const findOne = async (ctx: Context, nameOrId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (parseInt(nameOrId, 10) > 0) {
      const user = await userModel.findOneById(parseInt(nameOrId, 10));
      if (!user) {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        errorUtils.notFound(ctx, 'User not found')
      }
      return helpers.formatUserResponse(user);
    }
    const user = await userModel.findOneByName(nameOrId);
    if (!user) {
      errorUtils.notFound(ctx, 'User not found')
    }

    return helpers.formatUserResponse(user);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

const update = async (
  ctx: Context,
  nameOrId: string,
  body: IUpdateUserRequest
) => {
  if (!body.name && !body.email) {
    errorUtils.badRequest(ctx, 'No data provided');
  }

  const user = await findOne(ctx, nameOrId) as IUserResponse
  if (!user) {
    errorUtils.notFound(ctx, 'User not found');
  }

  const updatedUserData: IUser = {
    name: body.name || user.name,
    email: body.email || user.email,
    id: user.id,
    updatedOn: new Date(),
    birthdate: user.birthdate,
    createdOn: user.createdOn
  };

  try {
    const user = await userModel.update(updatedUserData);
    return helpers.formatUserResponse(user);
  } catch (err) {
    if (err instanceof Error) {
      errorUtils.handleSQLiteError(ctx, err);
    }
  }
};

const remove = async (ctx: Context, id: number) => {
  try {
    await userModel.remove(id);
  } catch (err) {
    if (err instanceof Error) {
      errorUtils.internalServerError(ctx, err);
    }
  }
};

export const userService = {
  create,
  findAll,
  findOne,
  update,
  remove
};
