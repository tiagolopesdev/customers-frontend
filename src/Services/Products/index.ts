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

export const createProductService = async (product: IProduct) => {
  try {

    const response = await customerChannel.post(`api/Products/CreateProduct`, product)

    return response.data as string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}
export const updateProductService = async (product: IProduct) => {
  try {

    const response = await customerChannel.put(`api/Products/UpdateProduct`, product)

    return response.data as string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data
  }
}
