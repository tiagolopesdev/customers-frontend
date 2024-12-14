
export interface IPayments {
  id?: string,
  value: number,
  paymentMethod: string,
  dateCreated?: string,
  isEnable?: boolean,
  updatedBy: string,
}