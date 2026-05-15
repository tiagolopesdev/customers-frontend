import { getAllCustomers } from "../../Services/Customer"
import { ICustomer } from "../../Types/ICustomer"
import { IPagination } from "../../Types/IPagination"

interface IFindCustomerHandler {
  usersSales?: string,
  dateUsersSales?: string | null,
  owing?: boolean
  pagination: IPagination<ICustomer>
}

export const findCustomersHandler = async ({
  pagination,
  usersSales,
  dateUsersSales,
  owing 
}: IFindCustomerHandler) => {
  let dateFormated = ''

  if (dateUsersSales !== null) {
    dateFormated = dateUsersSales?.substring(0, 10) ?? ''
  }

  return await getAllCustomers(
    pagination.pageIndex,
    pagination.pageSize,
    usersSales,
    dateFormated,
    owing
  )
}