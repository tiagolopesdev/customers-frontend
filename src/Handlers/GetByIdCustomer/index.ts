import { getByIdCustomers } from "../../Services/Customer"

export const findByIdCustomersHandler = async (id: string) => {
  const result = await getByIdCustomers(id)

  result.isEnable = false

  if (result.buys && result.buys?.length > 0) {
    result.buys.map((item) => {
      item.isEnable = false
      return item
    })
  }
  if (result.payments && result.payments?.length > 0) {
    result.payments.map((item) => {
      item.isEnable = false
    })
  }
  return result
}