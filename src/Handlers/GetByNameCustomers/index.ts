import { getByNameCustomers } from "../../Services/Customer"

export const findByNameCustomersHandler = async (name: string, usersSales?: string, owing?: boolean) => {
  return await getByNameCustomers(name, usersSales, owing)
}