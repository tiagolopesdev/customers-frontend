
export interface IProduct {
  id: string,
  name: string,
  description: string,
  value: number,
  basePrice: number,
  quantity: number,
  quantitySold: number,
  dateCreated: string,
  updatedBy?: string
}
