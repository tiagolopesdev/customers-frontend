import { ICustomer, ICustomerCreate } from "../../Types/ICustomer"
import { IPagination } from "../../Types/IPagination"
import { customerChannel } from "../Bases/api"


export const updateCustomer = async (customer: ICustomer) => {
  try {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { amountPaid, amountToPay, ...objectToSend } = customer

    const response = await customerChannel.put(
      `api/Customer/UpdateCustomer`,
      objectToSend
    )

    return response.data as string

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const createCustomer = async (customer: ICustomerCreate) => {
  try {

    const response = await customerChannel.post(
      `api/Customer/CreateCustomer`,
      customer
    )

    return response.data as string

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const validationPayment = async (customerId: string, value: number) => {
  try {

    const response = await customerChannel.post(
      `api/Customer/ValidatePayment`,
      {
        customerId,
        value
      }
    )

    return response.data as boolean

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const getByIdCustomers = async (id: string) => {
  try {

    const response = await customerChannel.get(`api/Customer/GetByIdCustomer/${id}`)

    return response.data as ICustomer

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error })
    throw error.response.data
  }
}

export const getByNameCustomers = async (
  pageIndex: number,
  pageSize: number,
  name: string,
  usersSales?: string,
  owing?: boolean
) => {
  try {

    const response = await customerChannel.get(
      `api/Customer/GetByNameCustomer`,
      {
        params: {
          name,
          UsersSales: usersSales,
          Owing: owing,
          PageSize: pageSize,
          PageIndex: pageIndex
        }
      }
    )

    return response.data as IPagination

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const getAllCustomers = async (
  pageIndex: number,
  pageSize: number,
  usersSales?: string,
  dateUsersSales?: string | null,
  owing?: boolean,
) => {
  try {

    const response = await customerChannel.get(`api/Customer/GetAllCustomer`,
      {
        params: {
          UsersSales: usersSales,
          Owing: owing,
          DateUsersSales: dateUsersSales,
          PageSize: pageSize,
          PageIndex: pageIndex
        }
      }
    )

    return response.data as IPagination

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}
