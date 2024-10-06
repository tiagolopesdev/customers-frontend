import { IBuys } from "./IBuys"
import { IPayments } from "./IPayments"

export interface ICustomer {
  id?: string,
  name: string,
  payments?: IPayments[],
  buys?: IBuys[],
  amountPaid?: number,
  amountToPay?: number,
  isEnable?: boolean
  dateCreated?: string
}

export interface ICustomerCreate {
  name: string,
  payments?: IPayments[],
  buys?: IBuys[]
}

export interface ICustomerMock {
  id: string
  name: string
}