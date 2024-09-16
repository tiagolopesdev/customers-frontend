import { CustomerCard } from "."
import { ICustomer } from "../../../Types/ICustomer"
import { CardListGroup } from "./style"

interface ICustomerCardList {
  customers: ICustomer[]
}

export const CustomerCardList = ({ customers }: ICustomerCardList) => {

  const renderList = () => {
    return ([] as ICustomer[]).concat(customers ?? [])?.map((item: ICustomer) => {
      return <CustomerCard customer={item} key={`card-customer-${item.id}`}/>
    })
  }

  return <CardListGroup>
    {renderList()}
  </CardListGroup>
}
