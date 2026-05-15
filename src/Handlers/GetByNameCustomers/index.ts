import { getByNameCustomers } from "../../Services/Customer"
import { ICustomer } from "../../Types/ICustomer"
import { IPagination } from "../../Types/IPagination"

interface IFindByNameCustomerHandler {
  pagination: IPagination<ICustomer>,
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