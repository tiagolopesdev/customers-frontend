
export interface IPayments {
  id?: string,
  value: number,
  paymentMethod: "CARD" | "PIX" | "CASH",
  dateCreated?: string,
  isEnable?: boolean,
  updatedBy: string,
}