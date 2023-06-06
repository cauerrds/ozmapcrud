import { IUser, IUserResponse } from "../interfaces/user.interface";


const convertStringToDate = (inputString: string): Date => {
    const dateParts = inputString.split('/');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript Date object
    const day = parseInt(dateParts[2]);
  
    const date = new Date(year, month, day);
    return date;
  }


const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  birthdate = new Date(birthdate)
  let age = today.getFullYear() - birthdate.getFullYear();
  
  if(today.getMonth() < birthdate.getMonth()){
    age = age - 1 
    return age;
  }

  if (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()) {
    age = age - 1 
   return age;
  }

  return age;  
}

const formatUserResponse = (user: IUser) => {

  const age = helpers.calculateAge(user.birthdate)


  const userResponse: IUserResponse = {
    ...user,
    age: age
  }
  return userResponse  
} 

const formatFindAllQueryParams =  (page: any, pageSize: any) =>{
      page = page as string 
      pageSize = pageSize as string 

      let formatedPage:number
      let formatedPageSize :number
      
      if(parseInt(page) > 0){        
        formatedPage = parseInt(page)
      } else {
        formatedPage = 1
      }

      if(parseInt(pageSize) > 5 ){
        formatedPageSize = parseInt(pageSize)
      } else {
        formatedPageSize = 5
      }    
      return {page: formatedPage, pageSize: formatedPageSize}
}

export const helpers = {
    convertStringToDate,
    calculateAge,
    formatUserResponse,
    formatFindAllQueryParams
}