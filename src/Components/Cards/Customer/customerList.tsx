import { CustomerCard } from "."
import { ICustomer } from "../../../Types/ICustomer"
import { renderList } from "../../../Utils/cardsList"
import { CardListGroup } from "./style"

interface ICustomerCardList {
  customers: ICustomer[]
}

export const CustomerCardList = ({ customers }: ICustomerCardList) => {

  const CustomerComponent = ({ item }: { item: ICustomer }) => {
    return <CustomerCard customer={item} />
  }

  return <CardListGroup>
    {renderList(customers, CustomerComponent)}
  </CardListGroup>
}
