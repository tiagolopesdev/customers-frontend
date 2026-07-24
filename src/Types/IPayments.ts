

export type PaymentMethodType = "CARD" | "PIX" | "CASH" | ''

export interface IPayments {
  id?: string,
  value: number,
  paymentMethod: PaymentMethodType,
  dateCreated?: string,
  isEnable?: boolean,
  updatedBy: string,
}