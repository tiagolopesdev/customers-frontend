import { updateCustomer } from "../../Services/Customer"
import { IBuys } from "../../Types/IBuys"
import { ICustomer } from "../../Types/ICustomer"
import { IPayments } from "../../Types/IPayments"

export const updateCustomerHandler = async (customer: ICustomer) => {

  try {

    delete customer.dateCreated
    delete customer.amountPaid
    delete customer.amountToPay

    const customerToSend: ICustomer = structuredClone(customer)

    if (customer.buys && customer.buys.length > 0) {

      customerToSend.buys = []

      customer.buys.map((item: IBuys) => {

        delete item.total
        delete item.dateCreated

        if (item.id === "") item.id = undefined

        if (!item.id && item.isEnable) return

        customerToSend.buys?.push(item)
      })
    }
    if (customer.payments && customer.payments.length > 0) {

      customerToSend.payments = []

      customer.payments.map((item: IPayments) => {
        
        delete item.dateCreated
        
        if (item.id === "") item.id = undefined

        if (!item.id && item.isEnable) return 

        customerToSend.payments?.push(item)
      })
    }

    return await updateCustomer(customerToSend)  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (error) {

  }
}