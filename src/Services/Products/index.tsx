import { IProduct } from "../../Types/IProduct"
import { customerChannel } from "../Bases/api"


export const hasStockService = async (id: string) => {
  try {

    const response = await customerChannel.get(`api/Products/HasStockProduct/${id}`)

    return response.data.quantityAvailable

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}

export const getProductsService = async (name: string) => {
  try {

    const response = await customerChannel.get(`api/Products/GetByNameProduct`, {
      params: {
        name: name
      }
    })

    return response.data as IProduct[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}
