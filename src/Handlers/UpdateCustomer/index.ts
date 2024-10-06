import { updateCustomer } from "../../Services/Customer"
import { IBuys } from "../../Types/IBuys"
import { ICustomer } from "../../Types/ICustomer"
import { IPayments } from "../../Types/IPayments"

export const updateCustomerHandler = async (customer: ICustomer) => {

  try {

    delete customer.dateCreated
    delete customer.amountPaid
    delete customer.amountToPay

    if (customer.buys && customer.buys.length > 0) {
      customer.buys.map((item: IBuys) => {
        delete item.total
        delete item.dateCreated
        if (item.id === "") item.id = undefined
      })
    }
    if (customer.payments && customer.payments.length > 0) {
      customer.payments.map((item: IPayments) => {
        delete item.dateCreated
      })
    }

    return await updateCustomer(customer)  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}