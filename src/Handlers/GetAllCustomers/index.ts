import { getAllCustomers } from "../../Services/Customer"

export const findCustomersHandler = async () => {

  try {
    return await getAllCustomers()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}