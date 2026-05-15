import { getProductsService } from "../../Services/Products"

export const getProductsHandler = async (productName: string, pageIndex: number, pageSize: number) => {
  try {
    return await getProductsService(productName, pageIndex, pageSize)  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {
  }
}