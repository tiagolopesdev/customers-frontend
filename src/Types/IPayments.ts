

export type PaymentMethodType = "CARD" | "PIX" | "CASH"

export interface IPayments {
  id?: string,
  value: number,
  paymentMethod: PaymentMethodType | undefined,
  dateCreated?: string,
  isEnable?: boolean,
  updatedBy: string,
}