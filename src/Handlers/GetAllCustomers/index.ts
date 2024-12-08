import { Dayjs } from "dayjs"
import { getAllCustomers } from "../../Services/Customer"

export const findCustomersHandler = async (usersSales?: string, dateUsersSales?: Dayjs | null, owing?: boolean) => {

  try {

    let dateFormated = ''

    if (dateUsersSales !== null) {
      dateFormated = dateUsersSales?.toISOString().substring(0, 10) ?? ''
    }

    return await getAllCustomers(usersSales, dateFormated, owing)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}