import { ICustomer } from "./ICustomer"

export interface IPagination {
  pageIndex: number
  pageSize: number,
  hasMore: true,
  totalPages: number,
  totalItens: number,
  data: ICustomer[]
}

export const defaultPagination: IPagination = {
  pageIndex: 1,
  pageSize: 10,
  hasMore: true,
  totalItens: 0,
  totalPages: 0,
  data: []
}