import { ICustomer } from "../../Types/ICustomer"
import { customerChannel } from "../Bases/api"


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
