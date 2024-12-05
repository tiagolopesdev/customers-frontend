import { getAllCustomers } from "../../Services/Customer"

export const findCustomersHandler = async (usersSales?: string, owing?: boolean) => {

  try {
    return await getAllCustomers(usersSales, owing)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}