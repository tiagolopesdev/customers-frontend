import { Box } from "@mui/material"
import { CustomerCard } from "."
import { ICustomer } from "../../../Types/ICustomer"
import { renderList } from "../../../Utils/cardsList"

interface ICustomerCardList {
  customers: ICustomer[]
}

export const CustomerCardList = ({ customers }: ICustomerCardList) => {

  const CustomerComponent = ({ item }: { item: ICustomer }) => {
    return <CustomerCard customer={item} />
  }

  return <Box
    sx={{
      padding: "10px",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    }}
  >
    {renderList(customers, CustomerComponent)}
  </Box>
}
