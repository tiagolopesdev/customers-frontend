import { IProduct } from "../../Types/IProduct"
import { customerChannel } from "../Bases/api"


export const getProductsService = async (name: string) => {
  try {

    //http://localhost:5048/api/Products/GetByNameProduct
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
