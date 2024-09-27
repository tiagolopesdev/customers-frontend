import { createCustomer } from "../../Services/Customer"
import { ICustomer } from "../../Types/ICustomer"

export const createCustomerHandler = async (customer: ICustomer) => {

  try {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { amountPaid, amountToPay, id, ...objectToSend } = customer

    return await createCustomer(objectToSend)
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}