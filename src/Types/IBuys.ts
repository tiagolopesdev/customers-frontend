
export interface IBuys {
  id?: string,
  name: string,
  price: number,
  quantity: number,
  total?: number,
  dateCreated?: string,
  isEnable?: boolean,
  productId: string,
  updatedBy: string
}