import { ICustomer, ICustomerCreate } from "../../Types/ICustomer"
import { customerChannel } from "../Bases/api"


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

export const getByIdCustomers = async (id: string) => {
  try {

    const response = await customerChannel.get(`api/Customer/GetByIdCustomer/${id}`)

    return response.data as ICustomer

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const getByNameCustomers = async (name: string) => {
  try {

    const response = await customerChannel.get(
      `api/Customer/GetByNameCustomer`,
      {
        params: {
          name
        }
      }
    )

    return response.data as ICustomer[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const getAllCustomers = async () => {
  try {

    const response = await customerChannel.get(`api/Customer/GetAllCustomer`)

    return response.data as ICustomer[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}
