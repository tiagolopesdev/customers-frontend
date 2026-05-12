import { getByNameCustomers } from "../../Services/Customer"
import { IPagination } from "../../Types/IPagination"

interface IFindByNameCustomerHandler {
  pagination: IPagination,
  name: string,
  usersSales?: string,
  owing?: boolean
}

export const findByNameCustomersHandler = async ({
  pagination,
  name,
  usersSales,
  owing
}: IFindByNameCustomerHandler) => {
  return await getByNameCustomers(pagination.pageIndex, pagination.pageSize, name, usersSales, owing)
}