import { CustomerCard } from "."
import { CustomerCardData } from "../../../Mockups/CustomerCard"
import { CardListGroup } from "./style"


export const CustomerCardList = () => {

  const renderList = () => {
    return CustomerCardData.map((item: any) => {
      return <CustomerCard />
    })
  }

  return <CardListGroup>
    {renderList()}
  </CardListGroup>
}
