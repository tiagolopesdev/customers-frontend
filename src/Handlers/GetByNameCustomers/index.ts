import { getByNameCustomers } from "../../Services/Customer"

export const findByNameCustomersHandler = async (name: string) => {

  try {
    return await getByNameCustomers(name)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}