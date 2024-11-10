import { getProductsService } from "../../Services/Products"

export const getProductsHandler = async (productName: string) => {
  try {
    return await getProductsService(productName)  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {
  }
}