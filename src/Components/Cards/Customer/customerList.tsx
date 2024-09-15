import { useEffect, useState } from "react"
import { CustomerCard } from "."
import { getAllCustomers } from "../../../Services/Customer"
import { ICustomer } from "../../../Types/ICustomer"
import { CardListGroup } from "./style"


export const CustomerCardList = () => {

  const [customers, setCustomers] = useState<ICustomer[]>([])

  const findCustomers = async () => {

    try {
      const result = await getAllCustomers()

      setCustomers(result)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {

    }
  }

  useEffect(() => { findCustomers() }, [customers])

  const renderList = () => {
    return customers.map((item: ICustomer) => {
      return <CustomerCard customer={item} />
    })
  }

  return <CardListGroup>
    {renderList()}
  </CardListGroup>
}
