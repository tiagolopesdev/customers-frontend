import { getByIdCustomers } from "../../Services/Customer"

export const findByIdCustomersHandler = async (id: string) => {

  try {
    return await getByIdCustomers(id)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}