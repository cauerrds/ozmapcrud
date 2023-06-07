import { type IUser, type IUserResponse } from '../interfaces/user.interface'

const convertStringToDate = (inputString: string): Date => {
  const dateParts = inputString.split('/')
  const year = parseInt(dateParts[0], 10)
  const month = parseInt(dateParts[1], 10) - 1 // Months are zero-based in JavaScript Date object
  const day = parseInt(dateParts[2], 10)

  return new Date(year, month, day)
}

const calculateAge = (birthdate: Date): number => {
  const today = new Date()
  birthdate = new Date(birthdate)
  let age = today.getFullYear() - birthdate.getFullYear()

  if (today.getMonth() < birthdate.getMonth()) {
    age -= 1
    return age
  }

  if (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()) {
    age -= 1
    return age
  }

  return age
}

const formatUserResponse = (user: IUser): IUserResponse => {

  const age = helpers.calculateAge(user.birthdate)

  const userResponse: IUserResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdOn: user.createdOn,
    updatedOn: user.updatedOn,
    birthdate: user.birthdate,
    age
  }
  return userResponse
}

interface IformatFindAllQueryParamsReponse {
  page: number
  pageSize: number
}

const formatFindAllQueryParams = (page: any, pageSize: any): IformatFindAllQueryParamsReponse => {
  page = page as string
  pageSize = pageSize as string

  const result: IformatFindAllQueryParamsReponse = {
    page: 1,
    pageSize: 5
  }

  if (parseInt(page, 10) > 0) {
    result.page = parseInt(page, 10)
  }

  if (parseInt(pageSize, 10) > result.pageSize) {
    result.pageSize = parseInt(pageSize, 10)
  }
  return result
}

export const helpers = {
  convertStringToDate,
  calculateAge,
  formatUserResponse,
  formatFindAllQueryParams
}
