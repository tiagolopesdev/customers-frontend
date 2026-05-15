
export interface IPagination<T> {
  pageIndex: number
  pageSize: number,
  hasMore: true,
  totalPages: number,
  totalItens: number,
  data: T[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultPagination: IPagination<any> = {
  pageIndex: 1,
  pageSize: 10,
  hasMore: true,
  totalItens: 0,
  totalPages: 0,
  data: []
}