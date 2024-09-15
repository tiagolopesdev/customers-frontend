import { IBuys } from "./IBuys"
import { IPayments } from "./IPayments"

export interface ICustomer {
  id: string,
  name: string,
  payments?: IPayments[],
  buys?: IBuys[],
  amountPaid: number
  amountToPay: number
}

export interface ICustomerMock {
  id: string
  name: string
}