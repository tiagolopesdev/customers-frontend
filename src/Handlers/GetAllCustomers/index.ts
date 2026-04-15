// import { Dayjs } from "dayjs"
import { getAllCustomers } from "../../Services/Customer"

export const findCustomersHandler = async (usersSales?: string, dateUsersSales?: string | null, owing?: boolean) => {
  let dateFormated = ''

  if (dateUsersSales !== null) {
    dateFormated = dateUsersSales?.substring(0, 10) ?? ''
  }

  return await getAllCustomers(usersSales, dateFormated, owing)
}